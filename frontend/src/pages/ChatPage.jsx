import React from 'react'
import UserList from '../components/UserList'
import ChatBox from '../components/ChatBox'

const ChatPage = () => {
  return (
    <div className='flex'>
      <UserList />
      <ChatBox />
    </div>
  )
}

export default ChatPage