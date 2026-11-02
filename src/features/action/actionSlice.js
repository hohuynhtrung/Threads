import { createSlice } from "@reduxjs/toolkit";
import { muteUser, unMuteUser } from "@/services/actions/actionService";

const initialState = {
  muteMap: {},
  loading: false,
  error: null,
};

export const actionSlice = createSlice({
  name: "action",
  initialState,
  reducers: {
    setMuteStatus(state, action) {
      const { userId, isMuted } = action.payload;
      if (userId !== undefined && userId !== null) {
        state.muteMap[String(userId)] = Boolean(isMuted);
      }
    },
  },

  extraReducers: (builder) => {
    builder
      // Mute User
      .addCase(muteUser.pending, (state, action) => {
        const userId = action.meta.arg;
        if (userId) state.muteMap[String(userId)] = true;
      })
      .addCase(muteUser.fulfilled, (state) => {
        state.error = null;
      })
      .addCase(muteUser.rejected, (state, action) => {
        const userId = action.meta.arg;
        if (userId) state.muteMap[String(userId)] = false;
        state.error = action.payload?.message;
      })

      // Unmute User
      .addCase(unMuteUser.pending, (state, action) => {
        const userId = action.meta.arg;
        if (userId) state.muteMap[String(userId)] = false;
      })
      .addCase(unMuteUser.fulfilled, (state) => {
        state.error = null;
      })
      .addCase(unMuteUser.rejected, (state, action) => {
        const userId = action.meta.arg;
        if (userId) state.muteMap[String(userId)] = true;
        state.error = action.payload?.message;
      });
  },
});

export const { setMuteStatus } = actionSlice.actions;
export default actionSlice.reducer;
