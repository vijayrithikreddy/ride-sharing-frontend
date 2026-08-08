import React from "react";
import type { UserProfileDto } from "../interfaces/UserProfileDto";
import DefaultAvatar from "../images/defaultavatar.png";
import { FaCamera, FaGraduationCap, FaBriefcase, FaMotorcycle, FaBuilding, FaArrowLeft, FaArrowRight } from "react-icons/fa";

interface ProfileDetailsProps {
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  formData: UserProfileDto;
  setFormData: React.Dispatch<React.SetStateAction<UserProfileDto>>;

  selectedImage: File | null;
  setSelectedImage: React.Dispatch<React.SetStateAction<File | null>>;

  preview: string;
  setPreview: React.Dispatch<React.SetStateAction<string>>;
}

function ProfileDetails({
  step,
  setStep,
  formData,
  setFormData,
  selectedImage,
  setSelectedImage,
  preview,
  setPreview,
}: ProfileDetailsProps) {
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleOccupation = (occupation: UserProfileDto["occupation"]) => {
    setFormData((prev) => ({
      ...prev,
      occupation,
    }));
  };

  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setSelectedImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log(formData);
    console.log(selectedImage);

    setStep((prev) => prev + 1);
  };

  const decreaseStep = () => {
    setStep((prev) => prev - 1);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg shadow-gray-200/50 p-6 sm:p-8 border border-gray-100 animate-fadeIn">
      {/* Step Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-extrabold text-gray-900">Profile Details</h2>
        <p className="text-sm text-gray-500 mt-1">
          Upload a profile picture and tell us a bit more about yourself.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        {/* Profile Picture Upload */}
        <div className="flex flex-col items-center justify-center p-4 bg-gray-50 border border-dashed border-gray-200 rounded-2xl">
          <div className="relative group cursor-pointer">
            <img
              src={preview || DefaultAvatar}
              alt="Profile Preview"
              className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-md group-hover:opacity-90 transition-all duration-200"
            />
            <label
              htmlFor="profilePic"
              className="absolute bottom-0 right-0 bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full shadow-md cursor-pointer transition-transform duration-200 group-hover:scale-110"
              title="Upload Photo"
            >
              <FaCamera className="text-xs" />
            </label>
          </div>

          <label
            htmlFor="profilePic"
            className="text-xs font-semibold text-blue-600 hover:text-blue-700 cursor-pointer mt-3"
          >
            {preview ? "Change Profile Picture" : "Upload Profile Picture"}
          </label>

          <input
            id="profilePic"
            type="file"
            accept="image/*"
            hidden
            onChange={handleImageChange}
          />
        </div>

        {/* Occupation */}
        <div>
          <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">
            Occupation
          </label>

          <div className="grid grid-cols-3 gap-2.5">
            <button
              type="button"
              onClick={() => handleOccupation("STUDENT")}
              className={`flex flex-col sm:flex-row items-center justify-center gap-1.5 py-3 px-2 rounded-xl border text-xs sm:text-sm font-semibold transition-all duration-200 ${
                formData.occupation === "STUDENT"
                  ? "bg-blue-600 text-white border-blue-600 shadow-sm shadow-blue-600/30"
                  : "bg-gray-50 text-gray-700 border-gray-200 hover:border-blue-400 hover:bg-white"
              }`}
            >
              <FaGraduationCap className="text-sm" />
              Student
            </button>

            <button
              type="button"
              onClick={() => handleOccupation("EMPLOYEE")}
              className={`flex flex-col sm:flex-row items-center justify-center gap-1.5 py-3 px-2 rounded-xl border text-xs sm:text-sm font-semibold transition-all duration-200 ${
                formData.occupation === "EMPLOYEE"
                  ? "bg-blue-600 text-white border-blue-600 shadow-sm shadow-blue-600/30"
                  : "bg-gray-50 text-gray-700 border-gray-200 hover:border-blue-400 hover:bg-white"
              }`}
            >
              <FaBriefcase className="text-sm" />
              Employee
            </button>

            <button
              type="button"
              onClick={() => handleOccupation("DAILY_COMMUTER")}
              className={`flex flex-col sm:flex-row items-center justify-center gap-1.5 py-3 px-2 rounded-xl border text-xs sm:text-sm font-semibold transition-all duration-200 ${
                formData.occupation === "DAILY_COMMUTER"
                  ? "bg-blue-600 text-white border-blue-600 shadow-sm shadow-blue-600/30"
                  : "bg-gray-50 text-gray-700 border-gray-200 hover:border-blue-400 hover:bg-white"
              }`}
            >
              <FaMotorcycle className="text-sm" />
              Commuter
            </button>
          </div>
        </div>

        {/* Organization */}
        <div>
          <label htmlFor="organization" className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1.5">
            Organization / Institute
          </label>
          <div className="relative flex items-center">
            <FaBuilding className="absolute left-3.5 text-gray-400 text-sm" />
            <input
              id="organization"
              type="text"
              name="organization"
              placeholder="College, University, or Company Name"
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl bg-gray-50 text-gray-900 text-sm placeholder-gray-400 hover:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white transition-all duration-200"
              value={formData.organization}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Bio */}
        <div>
          <label htmlFor="bio" className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1.5">
            Short Bio
          </label>
          <textarea
            id="bio"
            name="bio"
            rows={3}
            placeholder="Share a short bio (e.g. Daily commuter from Whitefield to Tech Park)..."
            className="w-full p-3.5 border border-gray-200 rounded-xl bg-gray-50 text-gray-900 text-sm placeholder-gray-400 hover:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white transition-all duration-200 resize-none"
            value={formData.bio}
            onChange={handleChange}
          />
        </div>

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between pt-2">
          <button
            type="button"
            onClick={decreaseStep}
            className="px-5 py-3 border border-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 hover:border-gray-300 flex items-center gap-2 transition-all duration-200"
          >
            <FaArrowLeft className="text-xs" /> Back
          </button>

          <button
            type="submit"
            className="bg-blue-600 text-white py-3 px-6 rounded-xl flex items-center justify-center gap-2 font-semibold hover:bg-blue-700 active:scale-[0.98] transition-all duration-200 shadow-md shadow-blue-600/25 hover:shadow-lg hover:shadow-blue-600/30"
          >
            Continue <FaArrowRight className="text-sm" />
          </button>
        </div>
      </form>
    </div>
  );
}

export default ProfileDetails;