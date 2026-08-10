import React, { useState } from "react";
import { FaArrowRight, FaMotorcycle, FaShieldAlt, FaRoute } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import * as AuthService from "../service/AuthService";
import doodleBg from "../images/rideshare-doodle-bg.png";

import toast from "react-hot-toast";

function SignUp() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      toast.error("Please enter email and password.");
      return;
    }

    try {
      setLoading(true);
      const signupData = {
        email: formData.email,
        password: formData.password,
        role: "ROLE_USER",
      };

      await AuthService.signup(signupData as any);
      toast.success("Account created! Check your email for OTP.");

      navigate(`/verifyOtp/${formData.email}`);
    } catch (error: any) {
      console.error(error);

      toast.error(
        error.response?.data?.message ??
          "Signup failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left Section — Doodle Hero */}
      <div className="hidden lg:flex w-full lg:w-[58%] bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 justify-center items-center relative overflow-hidden">
        {/* Doodle background */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url(${doodleBg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        />

        {/* Decorative blur circles */}
        <div className="absolute top-[-80px] left-[-80px] w-64 h-64 bg-blue-500/20 rounded-full blur-xl" />
        <div className="absolute bottom-[-60px] right-[-60px] w-80 h-80 bg-blue-400/15 rounded-full blur-2xl" />

        <div className="relative z-10 text-center px-10 max-w-lg">
          {/* Icon */}
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 backdrop-blur-sm rounded-2xl mb-8 border border-white/20">
            <FaMotorcycle className="text-white text-2xl" />
          </div>

          <h1 className="text-5xl font-extrabold text-white leading-tight tracking-tight">
            Ride Share
          </h1>

          <p className="text-blue-100 mt-4 text-lg leading-relaxed">
            Share motorcycle rides with daily commuters. Split costs, skip traffic, and travel smarter.
          </p>

          {/* Feature pills */}
          <div className="flex flex-wrap justify-center gap-3 mt-8">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/15 text-white text-sm">
              <FaShieldAlt className="text-blue-200 text-xs" />
              Verified Riders
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/15 text-white text-sm">
              <FaRoute className="text-blue-200 text-xs" />
              Smart Routes
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/15 text-white text-sm">
              <FaMotorcycle className="text-blue-200 text-xs" />
              Moto Pooling
            </div>
          </div>

          
          
        </div>
      </div>

      {/* Right Section */}
      <div className="w-full lg:w-[42%] bg-gray-50 flex justify-center items-center min-h-screen lg:min-h-0 px-6 py-12">
        <div className="w-full max-w-md">

          {/* Mobile-only branding */}
          <div className="flex lg:hidden flex-col items-center mb-8">
            <div className="inline-flex items-center justify-center w-14 h-14 bg-blue-600 rounded-2xl mb-4">
              <FaMotorcycle className="text-white text-xl" />
            </div>
            <h2 className="text-2xl font-bold text-blue-600">Ride Share</h2>
          </div>

          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900">
            Create Your Account
          </h1>

          <p className="text-gray-500 mt-2 mb-8">
            Start sharing motorcycle rides and save travel costs.
          </p>

          <form onSubmit={handleSubmit}>
            <div className="bg-white p-8 rounded-2xl shadow-lg shadow-gray-200/60 flex flex-col gap-5 border border-gray-100">

              {/* Email */}
              <div>
                <label htmlFor="signup-email" className="block text-sm font-medium text-gray-700 mb-1.5">
                  Email Address
                </label>
                <input
                  id="signup-email"
                  type="email"
                  placeholder="you@example.com"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 text-gray-900 placeholder-gray-400 hover:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white transition-all duration-200"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      email: e.target.value,
                    })
                  }
                />
              </div>

              {/* Password */}
              <div>
                <label htmlFor="signup-password" className="block text-sm font-medium text-gray-700 mb-1.5">
                  Password
                </label>
                <input
                  id="signup-password"
                  type="password"
                  placeholder="Create a strong password"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 text-gray-900 placeholder-gray-400 hover:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white transition-all duration-200"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      password: e.target.value,
                    })
                  }
                />
              </div>


              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="bg-blue-600 text-white py-3 rounded-xl flex items-center justify-center gap-2 font-semibold hover:bg-blue-700 active:scale-[0.98] transition-all duration-200 disabled:bg-blue-400 disabled:cursor-not-allowed shadow-md shadow-blue-600/25 hover:shadow-lg hover:shadow-blue-600/30 mt-1"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Signing Up...
                  </span>
                ) : (
                  <>
                    Sign Up <FaArrowRight className="text-sm" />
                  </>
                )}
              </button>

            </div>
          </form>

          <p className="mt-8 text-center text-gray-500">
            Already have an Account?{" "}
            <span
              onClick={() => navigate("/login")}
              className="text-blue-600 font-semibold cursor-pointer hover:text-blue-700 hover:underline transition-colors duration-200"
            >
              Login
            </span>
          </p>

        </div>
      </div>
    </div>
  );
}

export default SignUp;