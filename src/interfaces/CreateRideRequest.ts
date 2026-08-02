import type { Location } from "./Location";

export interface CreateRideRequest {
  source: Location;
  destination: Location;
  encodedPolyline: string;
  departureTime: string;
  price: number;
}