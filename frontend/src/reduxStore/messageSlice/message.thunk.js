import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const host = import.meta.env.VITE_API_URL;

export const sendMessageThunk = createAsyncThunk(
  "message/send-message",
  async (data, thunkAPI) => {
    try {
      if (!data?.receiverId || !data?.message?.trim()) {
        return thunkAPI.rejectWithValue("Invalid message data")
      }
      const response = await axios.post(
        `${host}/message/send/${data.receiverId}`,
        { message: data.message },
        { withCredentials: true }
      )
      return response.data
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to send message"
      )
    }
  }
)

export const getMessageThunk = createAsyncThunk(
  "message/get-message",
  async ({ receiverId }, thunkAPI) => {
    try {
      const response = await axios.get(
        `${host}/message/get-message/${receiverId}`,
        { withCredentials: true }
      );
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to fetch messages"
      );
    }
  }
);
