import axios from 'axios';
import calculator from './calculator';
import { Coordinates, PostcodeInfo } from '../interfaces';

class Postcodes {
    private readonly apiKey: string;

    constructor(apiKey: string) {
        this.apiKey = apiKey;
    }

    // Obtain the longitude and latitude from a postcode
    async locate(postcode: string): Promise<Coordinates> {
        try {
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

    // Sort the postcodes by distance to starting location
    async sort(startLat: number, startLon: number, postcodes: string[]): Promise<PostcodeInfo[]> {
        const postcodeCoordinatesPromises = postcodes.map(async (postcode) => {
            try {
                const { lat, lon } = await this.locate(postcode);
                const distance = calculator.distance(startLat, startLon, lat, lon);
                return { postcode, distance, lat, lon };
            } catch (error:any) {
                console.error(`Error geocoding postcode ${postcode}: ${error.message}`);
                return null;
            }
        });
        const postcodeCoordinates: (PostcodeInfo | null)[] = await Promise.all(postcodeCoordinatesPromises);
        const validPostcodeCoordinates = postcodeCoordinates
            .filter((coord): coord is PostcodeInfo => coord !== null)
            .sort((a, b) => a.distance - b.distance);

        return validPostcodeCoordinates;
    }

}

export default Postcodes;