export interface RequestRideResponse {
  // Request Details
  requestId: number;
  status: "PENDING" | "ACCEPTED" | "REJECTED" | "CANCELLED";
  requestedAt: string;

  // Ride Details
  rideId: number;
  rideStatus: "AVAILABLE" | "BOOKED" | "STARTED" | "COMPLETED" | "CANCELLED";

  source: Location;
  destination: Location;

  riderEncodedPolyline: string;
  passengerEncodedPolyline: string;

  departureTime: string;
  ridePrice: number;
  matchPercentage: number;

  // Driver Details
  driverAuthUserId: string;
  driverName: string;
  driverProfilePicture: string;

  // Vehicle Details
  vehicleNumber?: string;
  vehicleType?: string;
  vehicleBrand?: string;
  vehicleModel?: string;
  vehicleColor?: string;
}

export interface Location {
  latitude: number;
  longitude: number;
  address: string;
}