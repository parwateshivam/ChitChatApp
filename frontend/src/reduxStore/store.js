import { configureStore } from '@reduxjs/toolkit'
import userSlice from './userSlice/user.slice'

export default configureStore({
  reducer: {
    user: userSlice
  },
})