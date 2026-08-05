import type { VehicleSummary } from "./VehicleSummary";

export interface DriverProfile {

    authUserId: string;

    firstName: string;

    lastName: string;

    profilePictureUrl: string;

    vehicle: VehicleSummary | null;
}