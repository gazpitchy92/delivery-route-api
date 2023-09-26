import axios from 'axios';
import calculator from './calculator';
import { Coordinates, PostcodeInfo } from '../interfaces';

class Postcodes {
    private readonly apiKey: string;

    constructor(apiKey: string) {
        this.apiKey = apiKey;
    }

    /**
     * Obtains the longitude and latitude from a postcode using the OpenCage Data API.
     * @param postcode The postcode to geocode.
     * @returns A promise that resolves to an object containing lat and lon coordinates.
     */
    async locate(postcode: string): Promise<Coordinates> {
        try {
            // Make a GET request to the OpenCage Data API to obtain geolocation data.
            const response = await axios.get(`https://api.opencagedata.com/geocode/v1/json?q=${postcode}&key=${this.apiKey}`);
            if (response.status === 200) {
                const data = response.data;
                if (data.results.length > 0) {
                    const result = data.results[0];
                    return {
                        lat: result.geometry.lat,
                        lon: result.geometry.lng,
                    };
                } else {
                    throw new Error('No results found for the given postcode');
                }
            } else {
                throw new Error('Failed to geocode postcode');
            }
        } catch (error) {
            throw error;
        }
    }

    /**
     * Sorts an array of postcodes by distance to a specified starting location.
     * @param startLat The latitude of the starting location.
     * @param startLon The longitude of the starting location.
     * @param postcodes An array of postcodes to be sorted.
     * @returns A promise that resolves to an array of sorted PostcodeInfo objects.
     */
    async sort(startLat: number, startLon: number, postcodes: string[]): Promise<PostcodeInfo[]> {
        const postcodeCoordinatesPromises = postcodes.map(async (postcode) => {
            try {
                // Geocode each postcode to obtain its coordinates.
                const { lat, lon } = await this.locate(postcode);
                // Calculate the distance between the starting location and the postcode location.
                const distance = calculator.distance(startLat, startLon, lat, lon);
                return { postcode, distance, lat, lon };
            } catch (error:any) {
                console.error(`Error geocoding postcode ${postcode}: ${error.message}`);
                return null;
            }
        });

        // Wait for all promises to resolve and filter out any null results.
        const postcodeCoordinates: (PostcodeInfo | null)[] = await Promise.all(postcodeCoordinatesPromises);
        const validPostcodeCoordinates = postcodeCoordinates
            .filter((coord): coord is PostcodeInfo => coord !== null)
            .sort((a, b) => a.distance - b.distance);

        return validPostcodeCoordinates;
    }
}

export default Postcodes;