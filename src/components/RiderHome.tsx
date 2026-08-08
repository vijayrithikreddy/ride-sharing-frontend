import { useState } from "react";
import GoogleMapView from "./GoogleMapView";
import NavBar from "./NavBar";
import WelcomeCard from "./WelcomeCard";
import PublishRideCard from "./PublishRideCard";

type Step = "welcome" | "publish";

export interface Location {
  address: string;
  lat: number;
  lng: number;
}

function RiderHome() {
  const [step, setStep] = useState<Step>("welcome");

  const [pickup, setPickup] = useState<Location | null>(null);

  const [destination, setDestination] = useState<Location | null>(null);
  const [encodedPolyline, setEncodedPolyline] = useState("");

  const [selecting, setSelecting] = useState<"pickup" | "destination" | null>(null);

  return (
    <div className="h-screen flex flex-col bg-slate-50 overflow-hidden">
      <NavBar />

      <div className="relative flex-1">
        {/* Map Selection Instruction Pill */}
        {selecting && (
          <div className="absolute top-5 left-1/2 -translate-x-1/2 z-50 pointer-events-none">
            <div className="bg-blue-600/95 text-white px-6 py-3 rounded-full shadow-xl shadow-blue-600/30 border border-blue-400/30 text-xs sm:text-sm font-bold flex items-center gap-2 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              {selecting === "pickup"
                ? "📍 Click on the map to select Pickup location"
                : "📍 Click on the map to select Destination"}
            </div>
          </div>
        )}

        <GoogleMapView
          pickup={pickup}
          destination={destination}
          setPickup={setPickup}
          setDestination={setDestination}
          selecting={selecting}
          setSelecting={setSelecting}
          setEncodedPolyline={setEncodedPolyline}
        />

        {step === "welcome" && <WelcomeCard setStep={setStep} />}

        {step === "publish" && (
          <PublishRideCard
            setStep={setStep}
            pickup={pickup}
            destination={destination}
            setPickup={setPickup}
            setDestination={setDestination}
            selecting={selecting}
            setSelecting={setSelecting}
            encodedPolyline={encodedPolyline}
          />
        )}
      </div>
    </div>
  );
}

export default RiderHome;