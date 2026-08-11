import React from "react";
import { FaCamera, FaMotorcycle, FaUser } from "react-icons/fa";
import type { Profile } from "../interfaces/Profile";

import DefaultAvatar from "../images/defaultavatar.png";

interface ProfileHeaderProps {
  profile: Profile;
  editing: boolean;
  selectedImage: File | null;
  setSelectedImage: React.Dispatch<React.SetStateAction<File | null>>;
}

function ProfileHeader({
  profile,
  editing,
  selectedImage,
  setSelectedImage,
}: ProfileHeaderProps) {
  const avatarSrc = selectedImage
    ? URL.createObjectURL(selectedImage)
    : profile.profilePictureUrl
    ? `https://ride-sharing-platform-user.onrender.com${profile.profilePictureUrl}`
    : DefaultAvatar;

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 text-center relative overflow-hidden">
      {/* Subtle background glow accent */}
      <div className="absolute -top-12 -right-12 w-40 h-40 bg-blue-50 rounded-full blur-2xl pointer-events-none" />

      {/* Avatar Container */}
      <div className="relative inline-block">
        <img
          src={avatarSrc}
          alt="Profile"
          className="w-28 h-28 rounded-full object-cover border-4 border-white shadow-md ring-4 ring-gray-100"
        />

        {editing && (
          <>
            <label
              htmlFor="profileImage"
              className="absolute bottom-0 right-0 bg-blue-600 hover:bg-blue-700 text-white rounded-full p-2.5 cursor-pointer shadow-lg transition-transform duration-200 hover:scale-110"
              title="Upload New Photo"
            >
              <FaCamera className="text-xs" />
            </label>

            <input
              id="profileImage"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                if (e.target.files?.length) {
                  setSelectedImage(e.target.files[0]);
                }
              }}
            />
          </>
        )}
      </div>

      {/* User Name */}
      <h1 className="mt-4 text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
        {profile.firstName} {profile.lastName}
      </h1>

      <p className="text-xs text-gray-500 mt-1 font-medium">{profile.email}</p>

      {/* User Mode Pill */}
      <div className="mt-4 flex justify-center">
        <span
          className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-extrabold border ${
            profile.userMode === "RIDER"
              ? "bg-emerald-50 text-emerald-700 border-emerald-200"
              : "bg-blue-50 text-blue-700 border-blue-200"
          }`}
        >
          {profile.userMode === "RIDER" ? (
            <>
              <FaMotorcycle className="text-emerald-600" />
              Active Rider Mode
            </>
          ) : (
            <>
              <FaUser className="text-blue-600" />
              Active Passenger Mode
            </>
          )}
        </span>
      </div>
    </div>
  );
}

export default ProfileHeader;