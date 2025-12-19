import { createSlice } from "@reduxjs/toolkit";
import { getMessageThunk, sendMessageThunk } from "./message.thunk";

const messageSlice = createSlice({
  name: "message",
  initialState: {
    messages: [],
    buttonLoading: false,
    screenLoading: true
  },
  reducers: {},
  extraReducers: (builder) => {

    // SEND MESSAGE
    builder
      .addCase(sendMessageThunk.pending, (state) => {
        state.buttonLoading = true;
      })
      .addCase(sendMessageThunk.fulfilled, (state, action) => {
        state.buttonLoading = false;
      })
      .addCase(sendMessageThunk.rejected, (state) => {
        state.buttonLoading = false;
      });

    // GET MESSAGES
    builder
      .addCase(getMessageThunk.pending, (state) => {
        state.screenLoading = true;
      })
      .addCase(getMessageThunk.fulfilled, (state, action) => {
        state.screenLoading = false;
        state.messages = action?.payload?.responseData?.messages;
      })
      .addCase(getMessageThunk.rejected, (state) => {
        state.screenLoading = false;
      });
  }
});

export default messageSlice.reducer;
