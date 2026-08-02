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

function Home() {
  const [step, setStep] = useState<Step>("welcome");

  const [pickup, setPickup] = useState<Location | null>(null);

  const [destination, setDestination] = useState<Location | null>(null);
  const [encodedPolyline, setEncodedPolyline] = useState("");

  const [selecting, setSelecting] = useState<"pickup" | "destination" | null>(null);

  return (
    <div className="h-screen flex flex-col bg-gray-100">

      <NavBar />

      <div className="relative flex-1">
        {selecting && (
    <div className="absolute top-5 left-1/2 -translate-x-1/2 z-50">

        <div className="bg-blue-600 text-white px-6 py-3 rounded-full shadow-xl">

            {selecting === "pickup"
                ? "📍 Click on the map to select Pickup"
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

        {step === "welcome" && (
          <WelcomeCard setStep={setStep} />
        )}

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

export default Home;