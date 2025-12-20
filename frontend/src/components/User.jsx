import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setSelectedUser } from '../reduxStore/userSlice/user.slice'

const User = ({ user, profilePic }) => {

  const dispatch = useDispatch()

  function handleClick() {
    dispatch(setSelectedUser(user))
  }

  const selectedUser = useSelector((state) => state.user.selectedUser)

  return (
    <div
      onClick={handleClick}
      className={`flex items-center gap-4 p-3 rounded-lg cursor-pointer 
    hover:bg-gray-800 transition duration-200
    ${selectedUser?._id === user?._id ? 'bg-gray-800' : ''}`}
    >

      {/* Avatar */}
      < div className="avatar online" >
        <div className="w-12 rounded-full ring ring-primary ring-offset-2 ring-offset-gray-900">
          <img
            src={user?.avatar || profilePic}
          />
        </div>
      </div >

      {/* User Info */}
      < div className="flex flex-col" >
        <h1 className="text-sm font-semibold text-white">
          {user?.fullName}
        </h1>
        <p className="text-xs text-gray-400">
          @{user?.username}
        </p>
      </div >
    </div >
  )
}

export default User
