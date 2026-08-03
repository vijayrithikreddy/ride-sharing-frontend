import type { Location } from "./Location";

export interface RideResponse {
  rideId: number;

  driverAuthUserId: string;

  source: Location;

  destination: Location;

  encodedPolyline: string;

  departureTime: string;

  price: number;

  status:
    | "AVAILABLE"
    | "BOOKED"
    | "STARTED"
    | "COMPLETED"
    | "CANCELLED";

  startedAt: string | null;

  completedAt: string | null;

  cancelledAt: string | null;

  createdAt: string;

  updatedAt: string;
}