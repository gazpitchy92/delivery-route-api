// Define an interface for geographic coordinates (latitude and longitude)
export interface Coordinates {
    lat: number; // Latitude (numeric value)
    lon: number; // Longitude (numeric value)
}

// Define an interface for information about a postcode
export interface PostcodeInfo {
    postcode: string; // Postcode string (e.g., "SW1A 1AA")
    distance: number; // Distance from a reference point (in kilometers)
    lat: number; // Latitude of the postcode location (numeric value)
    lon: number; // Longitude of the postcode location (numeric value)
}