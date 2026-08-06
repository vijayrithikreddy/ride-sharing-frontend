import { useState } from "react";
import { useLocation } from "react-router-dom";
import RidePreviewMap from "./RidePreviewMap";
import RideCard from "./RideCard";
import type { RideSearchResponse } from "../interfaces/RideSearchResponse";
import * as RideRequestService from "../service/RideRequestService";
import type { CreatePassengerRideRequest } from "../interfaces/CreatePassengerRideRequest";

function SearchResults() {

  const location = useLocation();

  const {
  rides,
  searchRequest,
} = location.state as {
  rides: RideSearchResponse[];
  searchRequest: CreatePassengerRideRequest;
};

  const [selectedRide, setSelectedRide] =
    useState<RideSearchResponse | null>(null);

  const [requestedRideIds, setRequestedRideIds] =
    useState<number[]>([]);

  const handleRequestRide = async (
  ride: RideSearchResponse
) => {

  try {

    await RideRequestService.requestRide({

  rideId: ride.rideId,

  source: searchRequest.source,

  destination: searchRequest.destination,

  passengerEncodedPolyline:
    searchRequest.passengerEncodedPolyline,

  departureTime:
    searchRequest.departureTime,

  matchPercentage:
    ride.matchPercentage,
  ridePrice : ride.price,

});

    setRequestedRideIds((prev) => [
      ...prev,
      ride.rideId,
    ]);

  } catch (error) {

    console.error(error);

  }

};

  return (

    <div className="h-screen bg-gray-100 flex">

      {/* Left */}

      <div className="w-[430px] bg-white shadow-xl overflow-y-auto rounded-3xl">

        <div className="sticky top-0 bg-white z-20 p-6 border-b">

          <h1 className="text-2xl font-bold">
            Matched Rides
          </h1>

          <p className="text-gray-500 mt-1">
            Select a ride to preview the route.
          </p>

        </div>

        <div className="p-4 space-y-4">

          {rides.map((ride) => (

            <RideCard
              key={ride.rideId}
              ride={ride}
              expanded={
                selectedRide?.rideId === ride.rideId
              }
              requested={requestedRideIds.includes(ride.rideId)}
              onRequestRide={handleRequestRide}
              onClick={() => {

                if (selectedRide?.rideId === ride.rideId) {

                  setSelectedRide(null);

                } else {

                  setSelectedRide(ride);

                }

              }}
            />

          ))}

        </div>

      </div>

      {/* Right */}

      <div className="flex-1 p-6">

  {selectedRide ? (

    <div className="bg-white rounded-3xl shadow-xl overflow-hidden h-full">

      <RidePreviewMap
        riderPolyline={selectedRide.encodedPolyline}
        passengerPolyline={searchRequest.passengerEncodedPolyline}
        pickup={searchRequest.source}
        destination={searchRequest.destination}
      />

    </div>

  ) : (

    <div className="bg-white rounded-3xl shadow-xl h-full flex flex-col justify-center items-center">

      <div className="w-24 h-24 rounded-full bg-blue-100 flex justify-center items-center">

        <span className="text-5xl">🗺️</span>

      </div>

      <h2 className="text-3xl font-bold text-gray-800 mt-6">

        Preview Ride

      </h2>

      <p className="text-gray-500 mt-3">

        Select any ride to compare your route with the rider's route.

      </p>

    </div>

  )}

</div>

    </div>

  );

}

export default SearchResults;