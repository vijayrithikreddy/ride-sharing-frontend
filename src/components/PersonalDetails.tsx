import React, { useState } from "react";
import type { UserProfileDto } from "./CreateProfile";

interface PersonalDetailsProps {
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  formData: UserProfileDto;
  setFormData: React.Dispatch<React.SetStateAction<UserProfileDto>>;
}

function PersonalDetails({step,setStep,formData,setFormData} : PersonalDetailsProps) {
  

  const increaseStep = () => {
    setStep(step + 1);
  } 

  const inputStyle =
    "w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500";

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(formData);

    // TODO:
    // Call your backend API
  };

  return (
      <div className="bg-white w-full max-w-xl rounded-xl shadow-md p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <span className="text-sm font-medium text-gray-500">
            Step {step} of 3
          </span>

          <span className="text-sm font-medium text-blue-600">
            Personal Details
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-1 mb-5">
             <div className="bg-blue-600 h-1 rounded-full w-1/3"></div>
        </div>

        {/* Title */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold">
            Complete Your Profile
          </h1>

          <p className="text-gray-500 mt-2">
            Tell us a little about yourself to continue.
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-5"
        >
          {/* First & Last Name */}
          <div className="flex gap-4">
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              className={inputStyle}
              value={formData.firstName}
              onChange={handleChange}
            />

            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              className={inputStyle}
              value={formData.lastName}
              onChange={handleChange}
            />
          </div>

          {/* Phone */}
          <input
            type="tel"
            name="phoneNumber"
            placeholder="+91 9876543210"
            className={inputStyle}
            value={formData.phoneNumber}
            onChange={handleChange}
          />

          {/* Date of Birth */}
          <input
            type="date"
            name="dateOfBirth"
            className={inputStyle}
            value={formData.dateOfBirth}
            onChange={handleChange}
          />

          {/* Gender */}
          <select
            name="gender"
            className={inputStyle}
            value={formData.gender}
            onChange={handleChange}
          >
            <option value="">Select Gender</option>
            <option value="MALE">Male</option>
            <option value="FEMALE">Female</option>
            <option value="OTHER">Other</option>
          </select>

          {/* Continue Button */}
          <button
            type="submit"
            className="bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition duration-300 font-medium"
            onClick={increaseStep}
          >
            Continue 
          </button>
        </form>
      </div>
  );
}

export default PersonalDetails;