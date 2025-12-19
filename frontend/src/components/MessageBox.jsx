import React from 'react'
import { useSelector } from 'react-redux'

const MessageBox = ({ msg }) => {

  const userProfile = useSelector((state) => state.user.userProfile)

  const isOwnMessage = msg?.senderId === userProfile?._id

  return (
    <div className={`chat ${isOwnMessage ? 'chat-end' : 'chat-start'}`}>

      {/* Avatar (only for other user) */}
      {!isOwnMessage && (
        <div className="chat-image avatar">
          <div className="w-9 rounded-full">
            <img
              src={msg?.senderAvatar || "https://img.daisyui.com/images/profile/demo/kenobee@192.webp"}
              alt="user"
            />
          </div>
        </div>
      )}

      {/* Header */}
      <div className="chat-header text-xs text-gray-400 mb-1">
        {isOwnMessage ? 'You' : msg?.senderName}
        <time className="ml-2 opacity-60">
          {msg?.createdAt
            ? new Date(msg.createdAt).toLocaleTimeString()
            : '12:45'}
        </time>
      </div>

      {/* Bubble */}
      <div
        className={`chat-bubble max-w-xs text-sm leading-relaxed
          ${isOwnMessage
            ? 'bg-primary text-white'
            : 'bg-gray-800 text-gray-100'}
        `}
      >
        {msg?.message}
      </div>

      {/* Footer */}
      {isOwnMessage && (
        <div className="chat-footer text-[10px] text-gray-400 mt-1">
          Delivered
        </div>
      )}
    </div>
  )
}

export default MessageBox
