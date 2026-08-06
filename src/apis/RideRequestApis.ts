import type { CreatePassengerRideRequest } from "../interfaces/CreatePassengerRideRequest";
import api from "./AxioConfig";

export const requestRide = (
  request: CreatePassengerRideRequest
) => {
  return api.post("/ride-requests/request", request);
};

export const acceptRideRequest = (requestId: number) => {
  return api.put(`/ride-requests/accept?requestId=${requestId}`);
};

export const rejectRideRequest = (requestId: number) => {
  return api.put(`/ride-requests/reject?requestId=${requestId}`);
};

export const cancelRideRequest = (requestId: number) => {
  return api.put(`/ride-requests/cancel?requestId=${requestId}`);
};

export const getMyRideRequests = () => {
  return api.get("/ride-requests/myrequests");
};
export const getMyActiveRideRequests = () => {
  return api.get("/ride-requests/myactiverequests");
};

export const getMyRideRequestsForDriver = () => {
  return api.get("/ride-requests/myriderequests");
};