import * as AuthApi from "../apis/AuthApis";
import { saveAccessToken, saveRefreshToken } from "./TokenService";
import type { LoginRequest } from "../interfaces/LoginRequest";
import type { RegisterRequest } from "../interfaces/RegisterRequest";

export const login = async (request: LoginRequest) => {
  const response = await AuthApi.login(request);

  saveAccessToken(response.data.accessToken);
  saveRefreshToken(response.data.refreshToken);

  return response.data;
};

export const signup = async (request: RegisterRequest) => {
  const response = await AuthApi.signup(request);

  return response.data;
};

export const verifyOtp = async (email: string,otp: string) => {
  const response = await AuthApi.verifyOtp(email, otp);

  return response.data;
};



export const refresh = async () => {

    const refreshToken =
        localStorage.getItem("refreshToken");

    if (!refreshToken) {

        throw new Error("Refresh token missing");

    }

    const response =
        await AuthApi.refreshAccessToken(refreshToken);

    localStorage.setItem(
        "authToken",
        response.data.accessToken
    );

    return response.data.accessToken;

};