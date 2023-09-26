/**
 * A utility class for calculating distances between geographic coordinates using the Haversine formula.
 */
class Calculator {

    /**
     * Calculates the great-circle distance between two sets of geographic coordinates using the Haversine formula.
     *
     * @param {number} lat1 - The latitude of the first location in degrees.
     * @param {number} lon1 - The longitude of the first location in degrees.
     * @param {number} lat2 - The latitude of the second location in degrees.
     * @param {number} lon2 - The longitude of the second location in degrees.
     * @returns {number} - The distance in kilometers between the two locations.
     */
    static distance(
        lat1: number,
        lon1: number,
        lat2: number,
        lon2: number
    ): number {
        const toRadians = (degrees: number) => (degrees * Math.PI) / 180;
        const dLat = toRadians(lat2 - lat1);
        const dLon = toRadians(lon2 - lon1);
        const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRadians(lat1)) *
            (
                Math.cos(toRadians(lat2)) *
                Math.sin(dLon / 2) *
                Math.sin(dLon / 2)
            );
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const distance = 6371 * c;
        return distance;
    }

}

export default Calculator;