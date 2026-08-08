import React, { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import WebSocketService from "../service/WebSocketService";

interface Props {
  children: React.ReactNode;
}

function AuthContextProvider({ children }: Props) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  const [userType, setUserType] = useState<
    "RIDER" | "PASSENGER" | null
  >(null);

  useEffect(() => {
    const token = localStorage.getItem("authToken");

    const storedUserType = localStorage.getItem(
      "userType"
    ) as "RIDER" | "PASSENGER" | null;

    setIsAuthenticated(!!token);
    setUserType(storedUserType);
    setLoading(false);
  }, []);

  const restoreLogin = () => {
    const token = localStorage.getItem("authToken");

    setIsAuthenticated(!!token);
  };

  const login = () => {
    setIsAuthenticated(true);
  };

  const logout = () => {
    WebSocketService.disconnect();

    localStorage.clear();

    setIsAuthenticated(false);

    setUserType(null);

};

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        loading,
        userType,
        setUserType,
        login,
        logout,
        restoreLogin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContextProvider;