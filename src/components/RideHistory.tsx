import { useEffect, useState } from "react";
import * as RideService from "../service/RideService";
import type { RideHistory as RideHistoryType } from "../interfaces/RideHistory";
import RideHistoryCard from "../components/RideHistoryCard";

function RideHistory() {

    const [loading, setLoading] = useState(true);

    const [rides, setRides] =
        useState<RideHistoryType[]>([]);

    useEffect(() => {

        loadHistory();

    }, []);

    const loadHistory = async () => {

        try {

            const response =
                await RideService.getRideHistory();

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

            <div>

                <h1 className="text-4xl font-bold">
                    My Rides
                </h1>

                <p className="text-gray-500 mt-2">
                    View all your completed rides.
                </p>

            </div>

            <div className="space-y-6 mt-8">

                {rides.length === 0 ? (

                    <div className="bg-white rounded-2xl shadow p-12 text-center">

                        <img
                            src="/images/no-rides.svg"
                            className="w-56 mx-auto mb-6"
                            alt="No rides"
                        />

                        <h2 className="text-2xl font-bold">
                            No rides yet
                        </h2>

                        <p className="text-gray-500 mt-2">
                            Your completed rides will appear here.
                        </p>

                    </div>

                ) : (

                    rides.map(ride => (

                        <RideHistoryCard
                            key={ride.rideId}
                            ride={ride}
                        />

                    ))

                )}

            </div>

        </div>

    );

}

export default RideHistory;