import type { CreateRideRequest } from "../interfaces/CreateRideRequest";
import api from "./AxioConfig";

export const publishRide = (request: CreateRideRequest) => {
  return api.post("/rides", request);
};

export const updateRide = (request: any) => {
  return api.put("/rides", request);
};

export const cancelRide = () => {
  return api.delete("/rides");
};

export const getMyActiveRide = () => {
  return api.get("/rides/active");
};

export const getRideHistory = () => {
  return api.get("/rides/history");
};

export const startRide = () => {
  return api.patch("/rides/start");
};

export const completeRide = () => {
  return api.patch("/rides/complete");
};

export const searchRides = (request: any) => {
  return api.post("/rides/search", request);
};
export const hasActiveRide = () => {
  return api.get("/rides/isactive");
};
export const getLiveRide = (rideId: number) =>{
    return api.get(`/rides/live/${rideId}`);
};
