class Maps {
    
    // Returns the google map URL based on postcode locations
    static get(startLatitude:number, startLongitude:number, sortedPostcodes:any):string {
        const mapUrl = `https://www.google.com/maps/dir/?api=1&origin=${startLatitude},${startLongitude}&destination=${startLatitude},${startLongitude}&waypoints=${sortedPostcodes
            .map((postcode: any) => `${postcode.lat},${postcode.lon}`)
            .join('|')}&travelmode=driving`;
        return mapUrl;
    }

}

export default Maps;