import React, { useEffect } from 'react'
import { FaSearch } from "react-icons/fa"
import User from './User'
import { useDispatch, useSelector } from 'react-redux'
import { getOtherUsersThunk, logoutUserThunk } from '../reduxStore/userSlice/user.thunk'
import { useNavigate } from 'react-router-dom'
import profilePic from '../assets/profile.jpg'

const UserList = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(getOtherUsersThunk())
  }, [dispatch])

  const { otherUsers } = useSelector((state) => state.user)

  function handleLogout() {
    dispatch(logoutUserThunk())
    navigate('/')
  }

  return (
    <div className="w-[30%] min-w-[250px] h-screen border-r border-gray-800 flex flex-col bg-gray-900 text-white">

      {/* Header */}
      <div className="p-4 border-b border-gray-800">
        <h1 className="text-2xl font-bold text-primary tracking-wide">
          ChitchatApp
        </h1>
        <p className="text-xs text-gray-400">Chat with friends</p>
      </div>

      {/* Search */}
      <div className="p-3">
        <label className="input input-bordered bg-gray-800 border-gray-700 flex items-center gap-2 w-full">
          <FaSearch className="text-gray-400" />
          <input
            type="search"
            className="grow text-sm bg-transparent focus:outline-none"
            placeholder="Search users..."
          />
        </label>
      </div>

      {/* User List */}
      <div className="flex-1 px-3 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700">
        {
          otherUsers?.length > 0 ? (
            otherUsers.map((user) => (
              <User key={user._id} user={user} profilePic={profilePic} />
            ))
          ) : (
            <p className="text-center text-gray-500 text-sm mt-6">
              No users found
            </p>
          )
        }
      </div>

      {/* Footer */}
      <div className="p-3 border-t border-gray-800 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="avatar online">
            <div className="w-10 rounded-full ring ring-primary ring-offset-2 ring-offset-gray-900">
              <img src="https://img.daisyui.com/images/profile/demo/spiderperson@192.webp" />
            </div>
          </div>
          <div className="text-sm">
            <p className="font-semibold">You</p>
            <p className="text-xs text-gray-400">Online</p>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="btn btn-sm btn-primary px-3 bg-primary"
        >
          Logout
        </button>
      </div>

    </div>
  )
}

export default UserList
