export interface GeoLocationControllerInterface {
    city: string;
    country: string;
    state: string;
}

class GeoLocationController {

    async getGeolocation(latitude: string | number, longitude: string | number): Promise<GeoLocationControllerInterface> {
        const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`;
        const response = await fetch(url);
        const {address} = await response.json();

        return {
            city: address.city,
            country: address.country,
            state: address.state
        };
    }
}

export default GeoLocationController;