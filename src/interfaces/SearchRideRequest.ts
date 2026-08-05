import type { Location } from "./Location";

export interface SearchRideRequest {
  source: Location;

  destination: Location;

  passengerEncodedPolyline: string;

  departureTime: string;
}