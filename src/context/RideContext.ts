import { createContext } from "react";
import type { RideResponse } from "../interfaces/RideResponse";
interface RideContextType {
  activeRide: RideResponse | null;

  setActiveRide: React.Dispatch<
    React.SetStateAction<RideResponse | null>
  >;

  refreshRide: () => Promise<void>;
}
export const RideContext = createContext<RideContextType>(null as any);