import React from 'react'
import UserList from '../components/UserList'
import ChatBox from '../components/ChatBox'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { connectSocket, setOnlineUsers } from '../reduxStore/socketSlice/socket.slice'
import { setNewMessage } from '../reduxStore/messageSlice/message.slice'

const ChatPage = () => {

  const dispatch = useDispatch()

  const { isAuthenticated, userProfile } = useSelector((state) => state.user)

  const { socket } = useSelector((state) => state.socket)

  useEffect(() => {
    if (!isAuthenticated) {
      return;
    }
    dispatch(connectSocket(userProfile?._id))
  }, [isAuthenticated])

  useEffect(() => {
    if (!socket) return;

    socket.on("onlineUsers", (onlineUsers) => {
      dispatch(setOnlineUsers(onlineUsers))
    })

    socket.on("newMessage", (newMessage) => {
      dispatch(setNewMessage(newMessage))
    })

    return () => {
      socket.close()
    }
  }, [socket])

  return (
    <div className='flex'>
      <UserList />
      <ChatBox />
    </div>
  )
}

export default ChatPage