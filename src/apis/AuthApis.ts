import api from "./AxioConfig";
import type { LoginRequest } from "../interfaces/LoginRequest";
import type { RegisterRequest } from "../interfaces/RegisterRequest";

export const login = (data: LoginRequest) =>
  api.post("/auth/login", data);

export const signup = (data: RegisterRequest) =>
  api.post("/auth/signup", data);

export const verifyOtp = (email: string, otp: string) =>
  api.post(
    "/auth/verifyOtp",
    null,
    {
      params: {
        email,
        otp,
      },
    }
  );

  
  export const refreshAccessToken = (
    refreshToken: string
) => {

    return api.post("http://localhost:8080/api/auth/refresh",
        {
            refreshToken,
        }
    );

};