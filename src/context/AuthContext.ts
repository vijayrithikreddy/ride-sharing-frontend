import { createContext } from "react";

export interface AuthContextType {
  isAuthenticated: boolean;
  loading: boolean;

  userType: "RIDER" | "PASSENGER" | null;

  setUserType: React.Dispatch<
    React.SetStateAction<"RIDER" | "PASSENGER" | null>
  >;

  login: () => void;

  logout: () => void;

  restoreLogin: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  loading: true,

  userType: null,

  setUserType: () => {},

  login: () => {},

  logout: () => {},

  restoreLogin: () => {},
});