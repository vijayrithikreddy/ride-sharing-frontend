import type { Vehicle } from "./Vehicle";

export interface Profile {

    firstName: string;

    lastName: string;

    email: string;

    phoneNumber: string;

    dateOfBirth: string;

    gender: string;

    occupation: string;

    organization: string;

    bio: string;

    profilePictureUrl: string;

    userMode: "RIDER" | "PASSENGER";

    vehicle: Vehicle | null;

}