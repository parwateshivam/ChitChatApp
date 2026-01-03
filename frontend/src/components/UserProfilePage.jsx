import React from "react";
import { useSelector } from "react-redux";

const UserProfilePage = () => {
  const { userProfile } = useSelector((state) => state.user);

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4 border-l border-gray-800">

      {/* Profile Card */}
      <div className="bg-gray-900 w-full max-w-md rounded-xl shadow-xl p-6 grid gap-6">

        {/* Profile Image Section */}
        <div className="flex flex-col items-center gap-3">
          <img
            src={userProfile?.avatar}
            alt="profile"
            className="w-28 h-28 rounded-full object-cover border-4 border-blue-500"
          />

          <button
            className="text-sm text-blue-600 hover:underline"
          >
            Change Profile Image
          </button>
        </div>

        {/* User Info */}
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-800">
            {userProfile?.username || "Username"}
          </h2>
          <p className="text-sm text-gray-500">
            {userProfile?.fullName || "fullName"}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-4">
          <button
            className="py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
          >
            Edit Profile
          </button>

          <button
            className="py-2 rounded-lg bg-red-500 text-white font-medium hover:bg-red-600 transition"
          >
            Delete Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;
