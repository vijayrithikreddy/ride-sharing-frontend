import * as RideApi from "../apis/RideApis";

import type { CreateRideRequest } from "../interfaces/CreateRideRequest";


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