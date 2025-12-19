import { createSlice } from "@reduxjs/toolkit";
import { getMessageThunk, sendMessageThunk } from "./message.thunk";

const messageSlice = createSlice({
  name: "message",
  initialState: {
    messages: null,
    buttonLoading: false,
    screenLoading: false
  },
  reducers: {
    clearMessages: (state) => {
      state.messages = [];
    }
  },
  extraReducers: (builder) => {

    // SEND MESSAGE
    builder
      .addCase(sendMessageThunk.pending, (state) => {
        state.buttonLoading = true;
      })
      .addCase(sendMessageThunk.fulfilled, (state, action) => {
        const oldMessages = state.messages ?? [];
        state.messages = [...oldMessages, action.payload?.responseData];
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
        state.messages = action.payload?.responseData?.messages
      })
      .addCase(getMessageThunk.rejected, (state) => {
        state.screenLoading = false;
      });
  }
});

export const { clearMessages } = messageSlice.actions;
export default messageSlice.reducer;
