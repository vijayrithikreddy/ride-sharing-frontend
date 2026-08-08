import type { UpdateVehicleRequest } from "../interfaces/UpdateVehicleRequest";
import api from "./AxioConfig";


export const addVehicle = (request) => {
    return api.post("/vehicles/me",request);
};

export const getVehicle = () => {

    return api.get(
        "/vehicles/me"
    );

};

export const updateVehicle = (
    request: UpdateVehicleRequest
) => {

    return api.put(
        "/vehicles/me",
        request
    );

};

export const deleteVehicle = () => {

    return api.delete(
        "/vehicles/me"
    );

};