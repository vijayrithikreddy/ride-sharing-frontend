import React from "react";
import type { Profile } from "../interfaces/Profile";
import { FaUser, FaEnvelope, FaPhone, FaCalendarAlt, FaVenusMars, FaBriefcase, FaBuilding, FaQuoteLeft } from "react-icons/fa";

interface PersonalInfoCardProps {
  profile: Profile;
  editing: boolean;
  setProfile: React.Dispatch<React.SetStateAction<Profile | null>>;
}

function PersonalInfoCard({
  profile,
  editing,
  setProfile,
}: PersonalInfoCardProps) {
  const EditableItem = ({
    label,
    field,
    value,
    icon,
    readOnly = false,
  }: {
    label: string;
    field: keyof Profile;
    value: string | null | undefined;
    icon?: React.ReactNode;
    readOnly?: boolean;
  }) => (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between py-3.5 border-b border-gray-100 last:border-b-0 gap-2">
      <span className="font-semibold text-xs text-gray-500 uppercase tracking-wider flex items-center gap-2 w-48">
        {icon}
        {label}
      </span>

      {editing && !readOnly ? (
        <input
          value={value ?? ""}
          onChange={(e) =>
            setProfile((prev) => ({
              ...prev!,
              [field]: e.target.value,
            }))
          }
          className="border border-gray-200 rounded-xl px-3.5 py-2 text-sm text-gray-900 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full sm:w-80 transition-all"
        />
      ) : (
        <span className="font-bold text-sm text-gray-900">
          {value || "-"}
        </span>
      )}
    </div>
  );

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 sm:p-8">
      <h2 className="text-xl font-extrabold text-gray-900 mb-4 flex items-center gap-2">
        <FaUser className="text-blue-600 text-base" /> Personal Information
      </h2>

      <div className="divide-y divide-gray-100">
        <EditableItem
          label="First Name"
          field="firstName"
          value={profile.firstName}
          icon={<FaUser className="text-gray-400 text-xs" />}
        />

        <EditableItem
          label="Last Name"
          field="lastName"
          value={profile.lastName}
          icon={<FaUser className="text-gray-400 text-xs" />}
        />

        <EditableItem
          label="Email Address"
          field="email"
          value={profile.email}
          icon={<FaEnvelope className="text-gray-400 text-xs" />}
          readOnly
        />

        <EditableItem
          label="Phone Number"
          field="phoneNumber"
          value={profile.phoneNumber}
          icon={<FaPhone className="text-gray-400 text-xs" />}
        />

        <EditableItem
          label="Gender"
          field="gender"
          value={profile.gender}
          icon={<FaVenusMars className="text-gray-400 text-xs" />}
          readOnly
        />

        <EditableItem
          label="Date of Birth"
          field="dateOfBirth"
          value={profile.dateOfBirth}
          icon={<FaCalendarAlt className="text-gray-400 text-xs" />}
          readOnly
        />

        <EditableItem
          label="Occupation"
          field="occupation"
          value={profile.occupation}
          icon={<FaBriefcase className="text-gray-400 text-xs" />}
          readOnly
        />

        <EditableItem
          label="Organization"
          field="organization"
          value={profile.organization}
          icon={<FaBuilding className="text-gray-400 text-xs" />}
        />

        <EditableItem
          label="Bio"
          field="bio"
          value={profile.bio}
          icon={<FaQuoteLeft className="text-gray-400 text-xs" />}
        />
      </div>
    </div>
  );
}

export default PersonalInfoCard;