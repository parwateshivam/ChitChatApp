import { createSlice } from '@reduxjs/toolkit'
import {
  getOtherUsersThunk,
  getUserProfileThunk,
  loginUserThunk,
  logoutUserThunk,
  registerUserThunk
} from './user.thunk'

export const userSlice = createSlice({
  name: 'user',

  initialState: {
    isAuthenticated: false,
    userProfile: null,
    otherUsers: null,
    buttonLoading: false,
    screenLoading: true
  },

  reducers: {},

  extraReducers: (builder) => {

    /* LOGIN */
    builder.addCase(loginUserThunk.pending, (state) => {
      state.buttonLoading = true
    })
    builder.addCase(loginUserThunk.fulfilled, (state, action) => {
      state.isAuthenticated = true
      state.userProfile = action.payload.responseData.user
      state.buttonLoading = false
    })
    builder.addCase(loginUserThunk.rejected, (state) => {
      state.buttonLoading = false
    })

    /* REGISTER */
    builder.addCase(registerUserThunk.pending, (state) => {
      state.buttonLoading = true
    })
    builder.addCase(registerUserThunk.fulfilled, (state, action) => {
      state.isAuthenticated = true
      state.userProfile = action.payload.responseData.user
      state.buttonLoading = false
    })
    builder.addCase(registerUserThunk.rejected, (state) => {
      state.buttonLoading = false
    })

    /* LOGOUT */
    builder.addCase(logoutUserThunk.pending, (state) => {
      state.buttonLoading = true
    })
    builder.addCase(logoutUserThunk.fulfilled, (state) => {
      state.isAuthenticated = false
      state.userProfile = null
      state.buttonLoading = false
      state.screenLoading = false
    })
    builder.addCase(logoutUserThunk.rejected, (state) => {
      state.buttonLoading = false
    })

    /* GET PROFILE */
    builder.addCase(getUserProfileThunk.pending, () => { })
    builder.addCase(getUserProfileThunk.fulfilled, (state, action) => {
      state.isAuthenticated = true
      state.userProfile = action.payload.responseData.user
      state.screenLoading = false
    })
    builder.addCase(getUserProfileThunk.rejected, (state) => {
      state.isAuthenticated = false
      state.userProfile = null
      state.screenLoading = false
    })

    // GET OTHER USERS
    builder.addCase(getOtherUsersThunk.pending, (state, action) => {
      state.screenLoading = true;
    });
    builder.addCase(getOtherUsersThunk.fulfilled, (state, action) => {
      state.screenLoading = false;
      state.otherUsers = action.payload?.responseData;
    });
    builder.addCase(getOtherUsersThunk.rejected, (state, action) => {
      state.screenLoading = false;
    });

  }
})

export default userSlice.reducer
