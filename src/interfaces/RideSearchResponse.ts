import type { DriverProfile } from "./DriverProfile";
import type { Location } from "./Location";

export interface RideSearchResponse {

    rideId: number;

    matchPercentage: number;

    source: Location;

    destination: Location;

    departureTime: string;

    price: number;

    encodedPolyline: string;

    driverProfile: DriverProfile;
}