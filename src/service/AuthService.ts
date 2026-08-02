import * as AuthApi from "../apis/AuthApis";
import { saveToken, removeToken } from "./TokenService";
import type { LoginRequest } from "../interfaces/LoginRequest";
import type { RegisterRequest } from "../interfaces/RegisterRequest";

export const login = async (request: LoginRequest) => {
  const response = await AuthApi.login(request);

  saveToken(response.data.accessToken);

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

export const logout = () => {
  removeToken();
};