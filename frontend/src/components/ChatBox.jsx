import React, { useEffect, useState } from 'react'
import User from './User'
import MessageBox from './MessageBox'
import { IoIosSend } from "react-icons/io"
import { useDispatch, useSelector } from 'react-redux'
import { getMessageThunk, sendMessageThunk } from '../reduxStore/messageSlice/message.thunk'

const ChatBox = () => {

  const dispatch = useDispatch()

  const selectedUser = useSelector((state) => state.user.selectedUser)

  const messages = useSelector((state) => state.message.messages) || []

  const [messageData, setMessageData] = useState({
    receiverId: "",
    message: ""
  })

  useEffect(() => {
    if (selectedUser?._id) {
      dispatch(getMessageThunk({ receiverId: selectedUser._id }))
    }

    setMessageData(prev => (
      { ...prev, receiverId: selectedUser?._id }
    ))
  }, [selectedUser?._id, dispatch])

  function handleChange(e) {
    const { name, value } = e.target

    setMessageData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  function handleSubmit() {
    dispatch(sendMessageThunk(messageData))
    messageData.message = ""
  }

  return (
    <>
      {selectedUser?._id ? (
        <div className="w-full h-screen flex flex-col bg-gray-900 text-white">

          {/* Header */}
          <div className="p-4 border-b border-gray-800">
            <User user={selectedUser} />
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3">
            {
              messages.map((msg) => {
                return <MessageBox key={msg?._id} msg={msg} />
              })
            }
          </div>

          {/* Input */}
          <div className="p-3 border-t border-gray-800">
            <div className="flex items-center gap-3">
              <input
                type="text"
                className="input input-bordered flex-1 bg-gray-800 text-sm px-3"
                name='message'
                value={messageData.message}
                placeholder="Type a message..."
                onChange={handleChange}
              />
              <button onClick={handleSubmit} className="btn btn-circle btn-success bg-success">
                <IoIosSend size={18} />
              </button>
            </div>
          </div>

        </div>
      ) : (
        <div className="flex items-center justify-center w-full h-screen text-gray-400">
          <h1 className="text-2xl font-bold">
            Select user to chat
          </h1>
        </div>
      )}
    </>
  )
}

export default ChatBox