/**
 * A utility class for generating Google Maps URLs based on postcode locations.
 */
class Maps {
    
    /**
     * Generates a Google Maps URL for the given starting location and sorted postcodes.
     *
     * @param {number} startLatitude - The latitude of the starting location.
     * @param {number} startLongitude - The longitude of the starting location.
     * @param {Array<any>} sortedPostcodes - An array of postcode objects with lat and lon properties.
     * @returns {string} - The Google Maps URL for the route.
     */
    static get(startLatitude: number, startLongitude: number, sortedPostcodes: any[]): string {
        const mapUrl = `https://www.google.com/maps/dir/?api=1&origin=${startLatitude},${startLongitude}&destination=${startLatitude},${startLongitude}&waypoints=${sortedPostcodes
            .map((postcode: any) => `${postcode.lat},${postcode.lon}`)
            .join('|')}&travelmode=driving`;
        return mapUrl;
    }

}

export default Maps;