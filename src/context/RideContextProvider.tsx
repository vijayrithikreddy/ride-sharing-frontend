import { useEffect, useState, type ReactNode } from "react";
import { RideContext } from "./RideContext";
import * as RideService from "../service/RideService";
import type { RideResponse } from "../interfaces/RideResponse";

interface RideContextProviderProps {
  children: ReactNode;
}

function RideContextProvider({
  children,
}: RideContextProviderProps) {

  const [activeRide, setActiveRide] =
    useState<RideResponse | null>(null);

  const refreshRide = async () => {
    try {
      const response =
        await RideService.getMyActiveRide();

      setActiveRide(response);
    } catch (error) {
      setActiveRide(null);
    }
  };

  useEffect(() => {
    refreshRide();
  }, []);

  return (
    <RideContext.Provider
      value={{
        activeRide,
        setActiveRide,
        refreshRide,
      }}
    >
      {children}
    </RideContext.Provider>
  );
}

export default RideContextProvider;