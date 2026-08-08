import { useEffect, useState } from "react";
import * as UserService from "../service/UserService";
import * as VehicleService from "../service/VehicleService";

import type { Profile } from "../interfaces/Profile";

import ProfileHeader from "./ProfileHeader";
import PersonalInfoCard from "./ProfileInfo";
import VehicleInfoCard from "./VehicleInfo";
import NavBar from "./NavBar";

function ProfilePage() {

    const [loading, setLoading] = useState(true);

    const [editing, setEditing] = useState(false);

    const [profile, setProfile] =
        useState<Profile | null>(null);

    const [formData, setFormData] =
        useState<Profile | null>(null);

    const [selectedImage, setSelectedImage] =
        useState<File | null>(null);

    useEffect(() => {

        loadProfile();

    }, []);

    const loadProfile = async () => {

        try {

            const response =
                await UserService.getProfile();

            setProfile(response);

            setFormData(response);

        } finally {

            setLoading(false);

        }

    };

    const handleSave = async () => {

        if (!formData) return;

        try {

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
                    profilePictureUrl:
                        formData.profilePictureUrl,
                },

                selectedImage

            );

            if (formData.vehicle) {

                await VehicleService.updateVehicle({

                    vehicleNumber:
                        formData.vehicle.vehicleNumber,

                    vehicleType:
                        formData.vehicle.vehicleType,

                    brand:
                        formData.vehicle.brand,

                    model:
                        formData.vehicle.model,

                    color:
                        formData.vehicle.color,

                });

            }

            const updatedProfile =
                await UserService.getProfile();

            setProfile(updatedProfile);

            setFormData(updatedProfile);

            setSelectedImage(null);

            setEditing(false);

            alert("Profile updated successfully!");

        } catch (error) {

            console.error(error);

            alert("Failed to update profile.");

        }

    };

    if (loading) {

        return (
            <div className="h-screen flex justify-center items-center">
                Loading...
            </div>
        );

    }

    return (
    <>
        <NavBar></NavBar>

        <div className="min-h-screen bg-gray-100 p-8">

            <div className="max-w-5xl mx-auto space-y-6">

                <ProfileHeader

                    profile={formData!}

                    editing={editing}

                    selectedImage={selectedImage}

                    setSelectedImage={setSelectedImage}

                />

                <PersonalInfoCard

                    profile={formData!}

                    editing={editing}

                    setProfile={setFormData}

                />

                {formData?.vehicle && (

                    <VehicleInfoCard

                        vehicle={formData.vehicle}

                        editing={editing}

                        setVehicle={(vehicle) =>

                            setFormData(prev => ({

                                ...prev!,

                                vehicle:
                                    typeof vehicle === "function"
                                        ? vehicle(prev!.vehicle!)
                                        : vehicle,

                            }))

                        }

                    />

                )}

                <div className="flex justify-end gap-4">

                    {editing ? (

                        <>

                            <button

                                onClick={() => {

                                    setEditing(false);

                                    setFormData(profile);

                                    setSelectedImage(null);

                                }}

                                className="px-6 py-3 rounded-xl bg-gray-200 hover:bg-gray-300"

                            >

                                Cancel

                            </button>

                            <button

                                onClick={handleSave}

                                className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white"

                            >

                                Save Changes

                            </button>

                        </>

                    ) : (

                        <button

                            onClick={() => setEditing(true)}

                            className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white"

                        >

                            Edit Profile

                        </button>

                    )}

                </div>

            </div>

        </div>
        </>
    );
    

}

export default ProfilePage;