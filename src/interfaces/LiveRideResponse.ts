export interface Location {
  latitude: number;
  longitude: number;
  address: string;
}

export interface LiveRideResponse {
  rideId: number;
  rideStatus: string;

  riderEncodedPolyline: string;
  passengerEncodedPolyline: string;

  source: Location;
  destination: Location;

  driverAuthUserId: string;
  driverName: string;
  driverPhoneNumber: string;
  driverProfilePicture: string;

  passengerAuthUserId: string;
  passengerName: string;
  passengerPhoneNumber: string;
  passengerProfilePicture: string;
}