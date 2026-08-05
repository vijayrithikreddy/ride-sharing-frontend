import * as RideRequestApis from "../apis/RideRequestApis";
import type { CreatePassengerRideRequest } from "../interfaces/CreatePassengerRideRequest";

export const requestRide = async (
  request: CreatePassengerRideRequest
) => {

  const response =
    await RideRequestApis.requestRide(request);

  return response.data;
};

export const acceptRideRequest = async (requestId: number) => {
  const response = await RideRequestApis.acceptRideRequest(requestId);
  return response.data;
};

export const rejectRideRequest = async (requestId: number) => {
  const response = await RideRequestApis.rejectRideRequest(requestId);
  return response.data;
};

export const cancelRideRequest = async (requestId: number) => {
  const response = await RideRequestApis.cancelRideRequest(requestId);
  return response.data;
};

export const getMyRideRequests = async () => {
  const response = await RideRequestApis.getMyRideRequests();
  return response.data;
};

export const getMyRideRequestsForDriver = async () => {
  const response = await RideRequestApis.getMyRideRequestsForDriver();
  return response.data;
};