import { useContext, useEffect, useState } from "react";
import NavBar from "./NavBar";
import YourRideCard from "./YourRideCard";
import RideInsightsCard from "./RideInsightsCard";
import PassengerRequests from "./PassengerRequests";
import { RideContext } from "../context/RideContext";
import type { RideRequestResponse } from "../interfaces/RideRequestResponse";
import * as RideRequestService from "../service/RideRequestService";
import * as RideService from "../service/RideService";
import { FaRoute } from "react-icons/fa";
import RidePreviewMap from "./RidePreviewMap";
import { useNavigate } from "react-router-dom";
import WebSocketService from "../service/WebSocketService.ts";

function Dashboard() {
  const navigate = useNavigate();

  const { activeRide } = useContext(RideContext);
  const [requests,setRequests] = useState<RideRequestResponse[]>([]);
  const [selectedRequest, setSelectedRequest] = useState<RideRequestResponse | null>(null);
  useEffect(() => {

    if (!activeRide) return;

    loadRequests();

    WebSocketService.connect();
    const driverId = localStorage.getItem("AUTH_USER_ID");

if (driverId) {

    WebSocketService.subscribe(

        `/topic/driver/${driverId}`,

        (event) => {

            console.log("Driver Event:", event);

            switch (event.type) {

                case "RIDE_STARTED":

                    navigate(`/live/${event.payload}`);

                    break;

                default:

                    console.log("Unknown Driver Event:", event.type);

            }

        }

    );

}

    WebSocketService.subscribe(
    `/topic/rides/${activeRide.rideId}/requests`,
    (message) => {

        console.log(
            "WEBSOCKET JSON:",
            JSON.stringify(message, null, 2)
        );

        setRequests(prev => [...prev, message.payload]);

    }
);

    return () => {

        WebSocketService.disconnect();

    };

}, [activeRide]);
console.log("Active Ride:", activeRide);

const loadRequests = async () => {

  try {

    const response =
      await RideRequestService.getMyRideRequestsForDriver();

    setRequests(response);

  } catch (error) {

    console.error("Failed to load ride requests", error);

  }

};

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
  const handleAccept = async (requestId: number) =>{
    await RideRequestService.acceptRideRequest(requestId);
    console.log("Ride Accepted");
  }
  const handleReject = async (requestId: number) =>{
    await RideRequestService.rejectRideRequest(requestId);
    console.log("Ride Rejected");
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

              onStartRide={async() => {
                 await RideService.startRide();
                console.log("Start Ride");

              }}
              
              onCancelRide={async() =>{
                await RideService.cancelRide();
                console.log("Cancel Ride");
              }}

            />

          </div>

          <RideInsightsCard

            temperature={30}

            weather="Sunny"

            distance="12 km"

            trafficDelay="+5 mins"

            requests={requests.length}

          />

        </div>

        {/* Passenger Request */}
<div className="grid lg:grid-cols-5 gap-6 mt-10">

  <div className="lg:col-span-2">

    <PassengerRequests
      requests={requests}
      selectedRequest={selectedRequest}
      setSelectedRequest={setSelectedRequest}
      onAccept={handleAccept}
      onReject={handleReject}
    />

  </div>

  <div className="lg:col-span-3">
    

    {selectedRequest ? (

      <RidePreviewMap
    riderPolyline={activeRide.encodedPolyline}
    passengerPolyline={selectedRequest.passengerEncodedPolyline}
    pickup={selectedRequest.source}
    destination={selectedRequest.destination}
/>

    ) : (

      <div className="bg-white rounded-3xl shadow-xl h-[720px] flex flex-col justify-center items-center">

    <div className="w-24 h-24 rounded-full bg-blue-100 flex justify-center items-center">

        <FaRoute
            className="text-blue-600"
            size={40}
        />

    </div>

    <h2 className="text-3xl font-bold mt-6">

        Preview Route

    </h2>

    <p className="text-gray-500 mt-3">

        Select a passenger request to compare
        the passenger route with your ride.

    </p>

</div>

    )}

  </div>

</div>

      </div>

    </div>

  );
}

export default Dashboard;