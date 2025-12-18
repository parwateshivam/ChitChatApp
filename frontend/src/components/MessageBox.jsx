import React from 'react'

const MessageBox = ({ message, isOwnMessage }) => {
  return (
    <div className={`chat ${isOwnMessage ? 'chat-end' : 'chat-start'}`}>

      {/* Avatar (only for other user) */}
      {!isOwnMessage && (
        <div className="chat-image avatar">
          <div className="w-9 rounded-full">
            <img
              src="https://img.daisyui.com/images/profile/demo/kenobee@192.webp"
              alt="user"
            />
          </div>
        </div>
      )}

      {/* Header */}
      <div className="chat-header text-xs text-gray-400 mb-1">
        {isOwnMessage ? 'You' : message?.senderName}
        <time className="ml-2 opacity-60">
          {message?.time || '12:45'}
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
        {message?.text || 'You were the Chosen One!'}
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
