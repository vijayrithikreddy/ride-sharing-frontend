import type { Location } from "./Location";

export interface CreatePassengerRideRequest {
  rideId: number;

  source: Location;

  destination: Location;

  passengerEncodedPolyline: string;

  departureTime: string;

  matchPercentage: number;
  ridePrice : number,
}