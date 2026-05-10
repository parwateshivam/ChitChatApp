import { configureStore } from '@reduxjs/toolkit'
import userSlice from './userSlice/user.slice'
import messageSlice from './messageSlice/message.slice'
import socketSlice from './socketSlice/socket.slice'

export default configureStore({
  reducer: {
    user: userSlice,
    message: messageSlice,
    socket: socketSlice,
  },
  middleware: (getDefaultMiddlware) =>
    getDefaultMiddlware({
      serializableCheck: {
        ignoredPaths: ["socket.socket"],
      },
    }),
})