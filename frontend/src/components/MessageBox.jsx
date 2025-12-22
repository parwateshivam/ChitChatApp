import React, { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'

const MessageBox = ({ msg }) => {

  const messageRef = useRef(null)

  const userProfile = useSelector((state) => state.user.userProfile)

  const isMyMessage = userProfile?._id === msg?.senderId

  useEffect(() => {
    if (messageRef.current) {
      messageRef.current.scrollIntoView({ behaviour: "smooth" })
    }
  }, [])

  return (
    <div ref={messageRef} className={`chat ${isMyMessage ? 'chat-end' : 'chat-start'} mb-1`}>
      <div className={`chat-bubble max-w-xs px-4 py-2 rounded-2xl text-sm leading-relaxed ${isMyMessage ? 'bg-green-500 text-white' : 'bg-gray-700 text-white'}`}>
        {msg?.message}
      </div>
    </div>
  )
}

export default MessageBox
