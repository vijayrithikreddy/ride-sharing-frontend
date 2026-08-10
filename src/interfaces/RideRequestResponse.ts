import type { Location } from "./Location";
import type { PassengerProfile } from "./PassengerProfile";

export interface RideRequestResponse {

    requestId:number;

    rideId:number;

    status:string;

    requestedAt:string;

    matchPercentage:number;

    source:Location;

    destination:Location;

    passengerEncodedPolyline:string;

    departureTime:string;

    passengerProfile:PassengerProfile;
}