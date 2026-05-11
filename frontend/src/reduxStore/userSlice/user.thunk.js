import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'
import toast from 'react-hot-toast'

const host = import.meta.env.VITE_API_URL;

export const loginUserThunk = createAsyncThunk("user/login", async (loginData, thunkAPI) => {
  try {
    const response = await axios.post(
      `${host}/login`,
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
      `${host}/register`,
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
      `${host}/logout`,
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
      `${host}/get-profile`,
      {},
      { withCredentials: true }
    )
    return response.data
  } catch (err) {
    const errorMessage = err.response.data.message
    return thunkAPI.rejectWithValue(errorMessage)
  }
})

export const getOtherUsersThunk = createAsyncThunk('user/get-other-users', async (_, thunkAPI) => {
  try {
    const response = await axios.get(
      `${host}/get-other-users`,
      {},
      { withCredentials: true }
    )
    return response.data
  } catch (err) {
    const errorMessage = err.response.data.message
    return thunkAPI.rejectWithValue(errorMessage)
  }
})

export const deleteAccountThunk = createAsyncThunk('user/delete-account', async (_, thunkAPI) => {
  try {
    const response = await axios.post(
      `${host}/delete-account`,
      {},
      { withCredentials: true }
    )
    toast.success("Account deleted successfully");
    return response.data
  } catch (err) {
    const errorMessage = err.response.data.message
    return thunkAPI.rejectWithValue(errorMessage)
  }
})
