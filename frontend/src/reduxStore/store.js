import { configureStore } from '@reduxjs/toolkit'
import userSlice from './userSlice/user.slice'
import messageSlice from './messageSlice/message.slice'

export default configureStore({
  reducer: {
    user: userSlice,
    message: messageSlice
  },
})