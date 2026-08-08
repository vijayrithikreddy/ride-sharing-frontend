export interface RideHistory {

    rideId: number;

    // Passenger

    passengerName: string;

    passengerPhoneNumber: string;

    passengerProfilePicture: string;

    // Route

    source: string;

    destination: string;

    // Ride

    ridePrice: number;

    startedAt: string;

    completedAt: string;

    status: string;

}