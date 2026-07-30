import React, { useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";


function SignUp() {
    const [formData, setFormData] = useState({
  email: "",
  password: "",
  role: "ROLE_USER",
});
  const inputStyle =
    "px-6 py-2 border border-gray-300 rounded-md hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-600";
const navigate = useNavigate();
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
          {/* Heading */}
          <div className="mb-6">
            <h1 className="text-3xl font-bold">Create Your Account</h1>
            <p className="text-gray-500 mt-2">
              Start sharing rides and save travel costs.
            </p>
          </div>

          {/* Form */}
          <form className="bg-white p-8 rounded-xl shadow-md flex flex-col gap-5">
            <div>
              <label className="block mb-2 font-medium">
                Email Address
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData,email: e.target.value,})}
                placeholder="Email Address"
                className={`${inputStyle} w-full`}
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">
                Password
              </label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({...formData,password: e.target.value,})}
                placeholder="Password"
                className={`${inputStyle} w-full`}
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">
                Select Role
              </label>
              <select className={`${inputStyle} w-full`}
                    value={formData.role}
                    onChange={(e) => setFormData({...formData,role: e.target.value,})}>
                <option value="ROLE_USER">User</option>
                <option value="ROLE_ADMIN">ADMIN</option>
              </select>
            </div>

            <button
              type="submit"
              className="bg-blue-600 text-white py-3 rounded-md flex items-center justify-center gap-2 hover:bg-blue-700 transition duration-300"
              onClick={() => navigate(`/verify-otp/${formData.email}`)}
            >
              Sign Up
              <FaArrowRight />
            </button>
          </form>
          <p className="mt-6 text-center">
            Already have an Account?{" "}
            <span
              onClick={() => navigate("/")}
              className="text-blue-600 font-semibold cursor-pointer hover:underline"
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