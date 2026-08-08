import { useEffect, useState } from "react";
import * as UserService from "../service/UserService";
import * as VehicleService from "../service/VehicleService";
import type { Profile } from "../interfaces/Profile";
import ProfileHeader from "./ProfileHeader";
import PersonalInfoCard from "./ProfileInfo";
import VehicleInfoCard from "./VehicleInfo";
import NavBar from "./NavBar";
import { FaEdit, FaSave, FaTimes } from "react-icons/fa";

function ProfilePage() {
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [formData, setFormData] = useState<Profile | null>(null);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const response = await UserService.getProfile();
      setProfile(response);
      setFormData(response);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!formData) return;

    try {
      setSaving(true);
      await UserService.updateProfileData(
        {
          firstName: formData.firstName,
          lastName: formData.lastName,
          phoneNumber: formData.phoneNumber,
          dateOfBirth: formData.dateOfBirth,
          gender: formData.gender,
          occupation: formData.occupation,
          organization: formData.organization,
          bio: formData.bio,
          profilePictureUrl: formData.profilePictureUrl,
        },
        selectedImage
      );

      if (formData.vehicle) {
        await VehicleService.updateVehicle({
          vehicleNumber: formData.vehicle.vehicleNumber,
          vehicleType: formData.vehicle.vehicleType,
          brand: formData.vehicle.brand,
          model: formData.vehicle.model,
          color: formData.vehicle.color,
        });
      }

      const updatedProfile = await UserService.getProfile();
      setProfile(updatedProfile);
      setFormData(updatedProfile);
      setSelectedImage(null);
      setEditing(false);

      alert("Profile updated successfully!");
    } catch (error) {
      console.error(error);
      alert("Failed to update profile.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col justify-center items-center">
        <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-3" />
        <p className="text-gray-500 font-bold text-sm">Loading Profile...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <NavBar />

      <div className="flex-1 py-10 px-4 sm:px-8">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Header Card */}
          <ProfileHeader
            profile={formData!}
            editing={editing}
            selectedImage={selectedImage}
            setSelectedImage={setSelectedImage}
          />

          {/* Personal Information */}
          <PersonalInfoCard
            profile={formData!}
            editing={editing}
            setProfile={setFormData}
          />

          {/* Vehicle Information (if present) */}
          {formData?.vehicle && (
            <VehicleInfoCard
              vehicle={formData.vehicle}
              editing={editing}
              setVehicle={(vehicle) =>
                setFormData((prev) => ({
                  ...prev!,
                  vehicle:
                    typeof vehicle === "function"
                      ? vehicle(prev!.vehicle!)
                      : vehicle,
                }))
              }
            />
          )}

          {/* Action Buttons Toolbar */}
          <div className="flex justify-end gap-3 pt-2 pb-12">
            {editing ? (
              <>
                <button
                  type="button"
                  onClick={() => {
                    setEditing(false);
                    setFormData(profile);
                    setSelectedImage(null);
                  }}
                  className="px-6 py-3 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 font-semibold flex items-center gap-2 transition-all"
                >
                  <FaTimes className="text-xs" /> Cancel
                </button>

                <button
                  type="button"
                  disabled={saving}
                  onClick={handleSave}
                  className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold flex items-center gap-2 shadow-md shadow-blue-600/25 active:scale-95 transition-all"
                >
                  <FaSave className="text-xs" />
                  {saving ? "Saving..." : "Save Changes"}
                </button>
              </>
            ) : (
              <button
                type="button"
                onClick={() => setEditing(true)}
                className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold flex items-center gap-2 shadow-md shadow-blue-600/25 active:scale-95 transition-all"
              >
                <FaEdit className="text-xs" /> Edit Profile
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;