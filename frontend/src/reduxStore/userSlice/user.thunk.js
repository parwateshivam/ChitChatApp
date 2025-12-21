import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'
import toast from 'react-hot-toast'

export const loginUserThunk = createAsyncThunk("user/login", async (loginData, thunkAPI) => {
  try {
    const response = await axios.post(
      "http://localhost:5000/api/auth/login",
      loginData,
      { withCredentials: true }
    )
    toast.success("Login successful")
    return response.data
  } catch (err) {
    const errorMessage = err.response.data.message
    toast.error(errorMessage)
    return thunkAPI.rejectWithValue(errorMessage)
  }
})

export const registerUserThunk = createAsyncThunk("user/register", async (registerData, thunkAPI) => {
  try {
    const response = await axios.post(
      "http://localhost:5000/api/auth/register",
      registerData,
      { withCredentials: true }
    )
    toast.success("registered successfully")
    return response.data
  } catch (err) {
    const errorMessage = err.response.data.message
    toast.error(errorMessage)
    return thunkAPI.rejectWithValue(errorMessage)
  }
})

export const logoutUserThunk = createAsyncThunk("user/logout", async (_, thunkAPI) => {
  try {
    const response = await axios.post(
      "http://localhost:5000/api/auth/logout",
      {},
      { withCredentials: true }
    )
    toast.success("Logout successful")
    return response.data
  } catch (err) {
    const errorMessage = err.response?.data?.message || "Logout failed"
    toast.error(errorMessage)
    return thunkAPI.rejectWithValue(errorMessage)
  }
})

export const getUserProfileThunk = createAsyncThunk("user/get-profile", async (_, thunkAPI) => {
  try {
    const response = await axios.get(
      "http://localhost:5000/api/auth/get-profile",
      { withCredentials: true }
    )
    console.log(response.data)
    return response.data
  } catch (err) {
    const errorMessage = err.response.data.message
    return thunkAPI.rejectWithValue(errorMessage)
  }
})

export const getOtherUsersThunk = createAsyncThunk('user/get-other-users', async (_, thunkAPI) => {
  try {
    const response = await axios.get(
      "http://localhost:5000/api/auth/get-other-users",
      { withCredentials: true }
    )
    return response.data
  } catch (err) {
    const errorMessage = err.response.data.message
    return thunkAPI.rejectWithValue(errorMessage)
  }
})
