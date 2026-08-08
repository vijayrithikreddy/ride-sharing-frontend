import { useEffect, useState } from "react";
import * as RideRequestService from "../service/RideRequestService";
import type { PassengerRideHistoryType } from "../interfaces/PassengerRideHistoryType";
import PassengerRideHistoryCard from "../components/PassengerRideHistoryCard";

function PassengerRideHistory() {

    const [rides, setRides] =
        useState<PassengerRideHistoryType[]>([]);

    const [loading, setLoading] =
        useState(true);

    useEffect(() => {

        loadHistory();

    }, []);

    const loadHistory = async () => {

        try {

            const response = await RideRequestService.getPassengerRideHistory();

            setRides(response);

        } finally {

            setLoading(false);

        }

    };

    if (loading) {

        return (
            <div className="h-screen flex justify-center items-center">
                Loading...
            </div>
        );

    }

    return (

        <div className="min-h-screen bg-gray-100 p-8">

            <h1 className="text-4xl font-bold mb-8">

                My Rides

            </h1>

            <div className="space-y-6">

                {rides.length === 0 ? (

                    <div className="bg-white rounded-xl shadow p-12 text-center">

                        No completed rides yet.

                    </div>

                ) : (

                    rides.map(ride => (

                        <PassengerRideHistoryCard

                            key={ride.requestId}

                            ride={ride}

                        />

                    ))

                )}

            </div>

        </div>

    );

}

export default PassengerRideHistory;