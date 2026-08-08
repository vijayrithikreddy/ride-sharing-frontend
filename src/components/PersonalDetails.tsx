import React from "react";
import type { UserProfileDto } from "../interfaces/UserProfileDto";
import { FaArrowRight, FaUser, FaPhone, FaCalendarAlt, FaVenusMars } from "react-icons/fa";

interface PersonalDetailsProps {
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  formData: UserProfileDto;
  setFormData: React.Dispatch<React.SetStateAction<UserProfileDto>>;
}

function PersonalDetails({ step, setStep, formData, setFormData }: PersonalDetailsProps) {
  const increaseStep = () => {
    setStep(step + 1);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.firstName || !formData.lastName) {
      alert("Please enter your first and last name.");
      return;
    }

    increaseStep();
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg shadow-gray-200/50 p-6 sm:p-8 border border-gray-100 animate-fadeIn">
      {/* Step Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-extrabold text-gray-900">Personal Details</h2>
        <p className="text-sm text-gray-500 mt-1">Tell us a little about yourself to continue.</p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        {/* First & Last Name */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="firstName" className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1.5">
              First Name
            </label>
            <div className="relative flex items-center">
              <FaUser className="absolute left-3.5 text-gray-400 text-sm" />
              <input
                id="firstName"
                type="text"
                name="firstName"
                placeholder="First Name"
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl bg-gray-50 text-gray-900 text-sm placeholder-gray-400 hover:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white transition-all duration-200"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="lastName" className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1.5">
              Last Name
            </label>
            <div className="relative flex items-center">
              <FaUser className="absolute left-3.5 text-gray-400 text-sm" />
              <input
                id="lastName"
                type="text"
                name="lastName"
                placeholder="Last Name"
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl bg-gray-50 text-gray-900 text-sm placeholder-gray-400 hover:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white transition-all duration-200"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>
          </div>
        </div>

        {/* Phone */}
        <div>
          <label htmlFor="phoneNumber" className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1.5">
            Phone Number
          </label>
          <div className="relative flex items-center">
            <FaPhone className="absolute left-3.5 text-gray-400 text-sm" />
            <input
              id="phoneNumber"
              type="tel"
              name="phoneNumber"
              placeholder="+91 9876543210"
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl bg-gray-50 text-gray-900 text-sm placeholder-gray-400 hover:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white transition-all duration-200"
              value={formData.phoneNumber}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Date of Birth & Gender in 2 cols */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="dateOfBirth" className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1.5">
              Date of Birth
            </label>
            <div className="relative flex items-center">
              <FaCalendarAlt className="absolute left-3.5 text-gray-400 text-sm" />
              <input
                id="dateOfBirth"
                type="date"
                name="dateOfBirth"
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl bg-gray-50 text-gray-900 text-sm hover:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white transition-all duration-200 cursor-pointer"
                value={formData.dateOfBirth}
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <label htmlFor="gender" className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1.5">
              Gender
            </label>
            <div className="relative flex items-center">
              <FaVenusMars className="absolute left-3.5 text-gray-400 text-sm" />
              <select
                id="gender"
                name="gender"
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl bg-gray-50 text-gray-900 text-sm hover:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white transition-all duration-200 cursor-pointer"
                value={formData.gender}
                onChange={handleChange}
              >
                <option value="MALE">Male</option>
                <option value="FEMALE">Female</option>
                <option value="OTHER">Other</option>
              </select>
            </div>
          </div>
        </div>

        {/* Continue Button */}
        <button
          type="submit"
          className="bg-blue-600 text-white py-3.5 px-6 rounded-xl flex items-center justify-center gap-2 font-semibold hover:bg-blue-700 active:scale-[0.98] transition-all duration-200 shadow-md shadow-blue-600/25 hover:shadow-lg hover:shadow-blue-600/30 mt-2"
        >
          Continue <FaArrowRight className="text-sm" />
        </button>
      </form>
    </div>
  );
}

export default PersonalDetails;