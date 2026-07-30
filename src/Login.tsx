import React from "react";
import { FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const inputStyle =
    "w-full px-6 py-2 border border-gray-300 rounded-md hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-600";

  return (
    <div className="min-h-screen flex">
      {/* Left Section */}
      <div className="w-[60%] bg-blue-600 flex justify-center items-center">
        <div>
          <h1 className="text-4xl font-bold text-white">Ride Share</h1>
          <p className="text-white mt-2">
            Join daily commuters and share rides safely.
          </p>
        </div>
      </div>

      {/* Right Section */}
      <div className="w-[40%] bg-gray-50 flex justify-center items-center">
        <div className="w-full max-w-md">
          <h1 className="text-4xl font-bold">Welcome Back</h1>
          <p className="text-gray-500 mt-2 mb-6">
            Login to continue your journey.
          </p>

          <form>
            <div className="bg-white p-8 rounded-xl shadow-md flex flex-col gap-6">
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                className={inputStyle}
              />

              <input
                type="password"
                name="password"
                placeholder="Password"
                className={inputStyle}
              />

              <button
                type="submit"
                className="bg-blue-600 text-white py-3 rounded-md flex items-center justify-center gap-2 hover:bg-blue-700 transition duration-300 cursor-pointer"
              >
                Login
                <FaArrowRight />
              </button>
            </div>
          </form>

          <p className="mt-6 text-center">
            Don't have an account?{" "}
            <span
              onClick={() => navigate("/signup")}
              className="text-blue-600 font-semibold cursor-pointer hover:underline"
            >
              Sign Up
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;