import * as RideApi from "../apis/RideApis";

import type { CreateRideRequest } from "../interfaces/CreateRideRequest";
import type { SearchRideRequest } from "../interfaces/SearchRideRequest";


export const publishRide = async (request: CreateRideRequest) => {
  const response = await RideApi.publishRide(request);

  return response.data;
};

export const updateRide = async (request: any) => {
  const response = await RideApi.updateRide(request);

  return response.data;
};

export const cancelRide = async () => {
  const response = await RideApi.cancelRide();

  return response.data;
};

export const getMyActiveRide = async () => {
  const response = await RideApi.getMyActiveRide();

  return response.data;
};

export const getRideHistory = async () => {
  const response = await RideApi.getRideHistory();

  return response.data;
};

export const startRide = async () => {
  const response = await RideApi.startRide();

  return response.data;
};

export const completeRide = async () => {
  const response = await RideApi.completeRide();

  return response.data;
};

export const searchRides = async (request: SearchRideRequest) => {
  const response = await RideApi.searchRides(request);

  return response.data;
};
export const hasActiveRide = async () => {
  const response = await RideApi.hasActiveRide();

  return response.data;
};
export const getLiveRide = async (rideId: number) => {
    const response = await RideApi.getLiveRide(rideId);
    return response.data;
};
export const updateDriverLocation = async (latitude: number,longitude: number
) => {
   RideApi.updateDriverLocation(latitude,longitude,);
};
export const updatePassengerLocation = async (latitude: number,longitude: number
) => {
   RideApi.updatePassengerLocation(latitude,longitude,);
};
