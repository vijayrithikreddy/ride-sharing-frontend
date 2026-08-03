import { useContext } from "react";
import NavBar from "./NavBar";
import YourRideCard from "./YourRideCard";
import RideInsightsCard from "./RideInsightsCard";
import PassengerRequests from "./PassengerRequests";
import { RideContext } from "../context/RideContext";

function Dashboard() {

  const { activeRide } = useContext(RideContext);

  if (!activeRide) {
    return (
      <div className="min-h-screen bg-gray-100">

        <NavBar />

        <div className="flex h-[85vh] items-center justify-center">

          <div className="bg-white rounded-3xl shadow-xl p-10 text-center w-[450px]">

            <h2 className="text-3xl font-bold text-gray-800">
              No Active Ride
            </h2>

            <p className="mt-3 text-gray-500">
              Publish a ride to start receiving passenger requests.
            </p>

          </div>

        </div>

      </div>
    );
  }

  return (

    <div className="min-h-screen bg-gray-100">

      <NavBar />

      <div className="max-w-7xl mx-auto px-8 py-8">

        {/* Greeting */}

        <div>

          <h1 className="text-3xl font-bold text-gray-800">
            Namaste, Vijay 👋
          </h1>

          <p className="text-gray-500 mt-2">
            Your ride has been published successfully.
          </p>

        </div>

        {/* Top Cards */}

        <div className="grid lg:grid-cols-3 gap-6 mt-8">

          <div className="lg:col-span-2">

            <YourRideCard

              ride={activeRide}

              onStartRide={() => {

                console.log("Start Ride");

              }}

            />

          </div>

          <RideInsightsCard

            temperature={30}

            weather="Sunny"

            distance="12 km"

            trafficDelay="+5 mins"

            requests={0}

          />

        </div>

        {/* Passenger Request */}

        <div className="mt-10">

          <PassengerRequests

            requests={[]}

            onAccept={(id) => {

              console.log("Accepted", id);

            }}

            onReject={(id) => {

              console.log("Rejected", id);

            }}

          />

        </div>

      </div>

    </div>

  );
}

export default Dashboard;