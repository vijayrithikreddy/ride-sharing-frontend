import React from "react";
import { FaArrowRight, FaSearch } from "react-icons/fa";

interface PassengerWelcomeCardProps {
  setStep: React.Dispatch<
    React.SetStateAction<"welcome" | "search">
  >;
}

function PassengerWelcomeCard({
  setStep,
}: PassengerWelcomeCardProps) {
  return (
    <div className="absolute top-10 left-10 w-[400px]">

      <div className="bg-white rounded-3xl shadow-2xl p-8">

        {/* Icon */}

        <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center">

          <FaSearch
            size={28}
            className="text-blue-600"
          />

        </div>

        {/* Heading */}

        <h1 className="text-3xl font-bold mt-6">
          Hello Vijay 👋
        </h1>

        {/* Description */}

        <p className="text-gray-500 mt-4 leading-7">

          Looking for a ride today?

          <br />

          Search for rides shared by students
          travelling on your route and reach
          your destination safely and affordably.

        </p>

        {/* Button */}

        <button
          onClick={() => setStep("search")}
          className="mt-8 w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl flex justify-center items-center gap-3 font-semibold transition"
        >

          Search Ride

          <FaArrowRight />

        </button>

      </div>

    </div>
  );
}

export default PassengerWelcomeCard;