import React from "react";
import type { UserProfileDto } from "./Profile";
import DefaultAvatar from "../images/defaultavatar.png";

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
  const inputStyle =
    "w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500";

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
    <div className="bg-white w-full max-w-lg rounded-xl shadow-lg p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <span className="text-xs font-medium text-gray-500">
          Step {step} of 3
        </span>

        <span className="text-xs font-medium text-blue-600">
          Profile Details
        </span>
      </div>

      {/* Progress */}
      <div className="w-full bg-gray-200 rounded-full h-1 mb-6">
        <div className="bg-blue-600 h-1 rounded-full w-2/3"></div>
      </div>

      {/* Title */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold">
          Complete Your Profile
        </h1>

        <p className="text-sm text-gray-500 mt-1">
          Add a profile picture and tell us a little more about yourself.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">

        {/* Profile Picture */}

        <div className="flex flex-col items-center gap-2">
          <label
            htmlFor="profilePic"
            className="cursor-pointer"
          >
            <img
              src={preview || DefaultAvatar}
              alt="Profile Preview"
              className="w-24 h-24 rounded-full object-cover border-2 border-gray-300 hover:border-blue-500 transition"
            />
          </label>

          <label
            htmlFor="profilePic"
            className="text-sm text-blue-600 hover:text-blue-700 cursor-pointer font-medium"
          >
            Upload Picture
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
          <label className="text-sm font-medium">
            Occupation
          </label>

          <div className="flex flex-wrap gap-2 mt-2">
            <button
              type="button"
              onClick={() => handleOccupation("STUDENT")}
              className={`px-3 py-2 rounded-lg border text-sm transition ${
                formData.occupation === "STUDENT"
                  ? "bg-blue-600 text-white border-blue-600"
                  : "hover:border-blue-500"
              }`}
            >
              Student
            </button>

            <button
              type="button"
              onClick={() => handleOccupation("EMPLOYEE")}
              className={`px-3 py-2 rounded-lg border text-sm transition ${
                formData.occupation === "EMPLOYEE"
                  ? "bg-blue-600 text-white border-blue-600"
                  : "hover:border-blue-500"
              }`}
            >
              Employee
            </button>

            <button
              type="button"
              onClick={() => handleOccupation("DAILY_COMMUTER")}
              className={`px-3 py-2 rounded-lg border text-sm transition ${
                formData.occupation === "DAILY_COMMUTER"
                  ? "bg-blue-600 text-white border-blue-600"
                  : "hover:border-blue-500"
              }`}
            >
              Daily Commuter
            </button>
          </div>
        </div>

        {/* Organization */}

        <div>
          <label className="text-sm font-medium">
            Organization
          </label>

          <input
            type="text"
            name="organization"
            placeholder="College / Company"
            className={`${inputStyle} mt-1`}
            value={formData.organization}
            onChange={handleChange}
          />
        </div>

        {/* Bio */}

        <div>
          <label className="text-sm font-medium">
            Bio
          </label>

          <textarea
            name="bio"
            rows={3}
            placeholder="Tell us about yourself..."
            className={`${inputStyle} mt-1 resize-none`}
            value={formData.bio}
            onChange={handleChange}
          />
        </div>

        {/* Buttons */}

        <div className="flex justify-between pt-2">
          <button
            type="button"
            onClick={decreaseStep}
            className="px-4 py-2 border rounded-lg hover:border-blue-600 transition"
          >
            Back
          </button>

          <button
            type="submit"
            className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Continue
          </button>
        </div>
      </form>
    </div>
  );
}

export default ProfileDetails;