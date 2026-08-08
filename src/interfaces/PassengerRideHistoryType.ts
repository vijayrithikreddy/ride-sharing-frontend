export interface PassengerRideHistoryType {

    requestId: number;

    rideId: number;

    driverName: string;

    driverPhoneNumber: string;

    driverProfilePicture: string;

    vehicleModel: string;

    vehicleNumber: string;

    vehicleColor: string;

    source: Location;

    destination: Location;

    ridePrice: number;

    startedAt: string;

    completedAt: string;

    rideStatus: string;

}