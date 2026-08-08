import type { Vehicle } from "./Vehicle";

export interface DriverProfile {
  authUserId: string;
  firstName: string;
  lastName: string;
  profilePictureUrl: string;
  vehicle: Vehicle | any | null;
}