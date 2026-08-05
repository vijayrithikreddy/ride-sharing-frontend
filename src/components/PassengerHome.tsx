import { useState } from "react";
import NavBar from "./NavBar";
import GoogleMapView from "./GoogleMapView";
import PassengerWelcomeCard from "./PassengerWelcomeCard";
import SearchRideCard from "./SearchRideCard";
import type { Location } from "../interfaces/Location";

type Step = "welcome" | "search";

function PassengerHome() {

  const [step, setStep] = useState<Step>("welcome");

  const [pickup, setPickup] = useState<Location | null>(null);

  const [destination, setDestination] = useState<Location | null>(null);

  const [selecting, setSelecting] = useState<
    "pickup" | "destination" | null
  >(null);

  const [passengerEncodedPolyline, setPassengerEncodedPolyline] =
    useState("" | null);

  return (
    <div className="h-screen flex flex-col bg-gray-100">

      <NavBar />

      <div className="relative flex-1">

        <GoogleMapView
          pickup={pickup}
          destination={destination}
          selecting={selecting}
          setPickup={setPickup}
          setDestination={setDestination}
          setSelecting={setSelecting}
          setEncodedPolyline={setPassengerEncodedPolyline}
        />

        {step === "welcome" && (
          <PassengerWelcomeCard
            setStep={setStep}
          />
        )}

        {step === "search" && (
          <SearchRideCard
            setStep={setStep}
            pickup={pickup}
            destination={destination}
            setPickup={setPickup}
            setDestination={setDestination}
            selecting={selecting}
            setSelecting={setSelecting}
            passengerEncodedPolyline={passengerEncodedPolyline}
          />
        )}

      </div>

    </div>
  );
}

export default PassengerHome;