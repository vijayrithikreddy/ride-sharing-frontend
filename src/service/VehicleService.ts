import * as VehicleApis from "../apis/VehicleApis";

import type { UpdateVehicleRequest } from "../interfaces/UpdateVehicleRequest";
import type { Vehicle } from "../interfaces/Vehicle";

export const addVehicle = async (request: any): Promise<Vehicle> => {

    const response =
        await VehicleApis.addVehicle(request);

    return response.data;

};

export const getVehicle = async (): Promise<Vehicle> => {

    const response =
        await VehicleApis.getVehicle();

    return response.data;

};

export const updateVehicle = async (
    request: UpdateVehicleRequest
): Promise<Vehicle> => {

    const response =
        await VehicleApis.updateVehicle(request);

    return response.data;

};

export const deleteVehicle = async (): Promise<void> => {

    await VehicleApis.deleteVehicle();

};