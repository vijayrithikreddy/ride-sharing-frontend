import React, { useContext, useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import * as AuthService from "../service/AuthService";
import { getProfileCompletedStatus } from "../service/UserService";
import { AuthContext } from "../context/AuthContext";
import * as RideService from "../service/RideService";



function Login() {
  const navigate = useNavigate();
  const {login} = useContext(AuthContext)

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const inputStyle =
    "w-full px-6 py-2 border border-gray-300 rounded-md hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-600";

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please enter email and password.");
      return;
    }

    try {
      setLoading(true);

      const response = await AuthService.login({
        email,
        password,
      });
      

      console.log(response);
      login();

      const profileCompleted = await getProfileCompletedStatus();

if (!profileCompleted) {
    navigate("/createprofile");
    return;
}
const hasActiveRide = await RideService.hasActiveRide();

if (hasActiveRide) {
  navigate("/dashboard");
} else {
  navigate("/roleselection");
}
    } catch (error: any) {
      console.error(error);

      alert(
        error.response?.data?.message ??
          "Invalid email or password."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Section */}
      <div className="w-[60%] bg-blue-600 flex justify-center items-center">
        <div>
          <h1 className="text-4xl font-bold text-white">
            Ride Share
          </h1>

          <p className="text-white mt-2">
            Join daily commuters and share rides safely.
          </p>
        </div>
      </div>

      {/* Right Section */}
      <div className="w-[40%] bg-gray-50 flex justify-center items-center">
        <div className="w-full max-w-md">

          <h1 className="text-4xl font-bold">
            Welcome Back
          </h1>

          <p className="text-gray-500 mt-2 mb-6">
            Login to continue your journey.
          </p>

          <form onSubmit={handleSubmit}>
            <div className="bg-white p-8 rounded-xl shadow-md flex flex-col gap-6">

              <input
                type="email"
                placeholder="Email Address"
                className={inputStyle}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <input
                type="password"
                placeholder="Password"
                className={inputStyle}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <button
                type="submit"
                disabled={loading}
                className="bg-blue-600 text-white py-3 rounded-md flex items-center justify-center gap-2 hover:bg-blue-700 transition duration-300 disabled:bg-blue-400"
              >
                {loading ? "Logging In..." : "Login"}

                {!loading && <FaArrowRight />}
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