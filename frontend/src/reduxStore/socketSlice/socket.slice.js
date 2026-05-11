import { createSlice } from "@reduxjs/toolkit"
import io from "socket.io-client"

const initialState = {
  socket: null,
  onlineUsers: [],
};

const socketSlice = createSlice({
  name: "socket",
  initialState,
  reducers: {
    connectSocket: (state, action) => {
      const socket = io(
        "https://chitchatapp-ifdl.onrender.com", {
        query: {
          userId: action.payload,
        }
      });
      state.socket = socket
    },
    setOnlineUsers: (state, action) => {
      state.onlineUsers = action.payload
    }
  },
})

export const { connectSocket, setOnlineUsers } = socketSlice.actions
export default socketSlice.reducer
