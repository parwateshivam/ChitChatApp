import React from 'react'
import User from './User'
import MessageBox from './MessageBox'
import { IoIosSend } from "react-icons/io"

const ChatBox = () => {
  return (
    <div className="w-full h-screen flex flex-col bg-gray-900 text-white">

      {/* Chat Header */}
      <div className="p-4 border-b border-gray-800 bg-gray-900">
        <User />
      </div>

      {/* Messages */}
      <div className="flex-1 p-4 overflow-y-auto space-y-3 scrollbar-thin scrollbar-thumb-gray-700">
        <MessageBox />
        <MessageBox />
        <MessageBox />
        <MessageBox />
        <MessageBox />
        <MessageBox />
      </div>

      {/* Message Input */}
      <div className="p-3 border-t border-gray-800 bg-gray-900">
        <div className="flex items-center gap-3">
          <input
            type="text"
            className="input input-bordered flex-1 bg-gray-800 border-gray-700 text-sm focus:outline-none px-3"
            placeholder="Type a message..."
          />
          <button className="btn btn-circle btn-primary bg-success">
            <IoIosSend size={18} />
          </button>
        </div>
      </div>

    </div>
  )
}

export default ChatBox
