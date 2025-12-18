import React from 'react'

const User = ({ user }) => {
  return (
    <div className="flex items-center gap-4 p-3 rounded-lg cursor-pointer hover:bg-gray-800 transition duration-200">

      {/* Avatar */}
      <div className="avatar online">
        <div className="w-12 rounded-full ring ring-primary ring-offset-2 ring-offset-gray-900">
          <img
            src="https://img.daisyui.com/images/profile/demo/gordon@192.webp"
            alt="user avatar"
          />
        </div>
      </div>

      {/* User Info */}
      <div className="flex flex-col">
        <h1 className="text-sm font-semibold text-white">
          {user?.fullName}
        </h1>
        <p className="text-xs text-gray-400">
          @{user?.username}
        </p>
      </div>
    </div>
  )
}

export default User
