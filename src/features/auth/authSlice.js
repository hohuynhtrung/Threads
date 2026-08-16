import { createSlice } from "@reduxjs/toolkit";
import { login, getCurrentUser } from "@/services/auth";

const initialState = {
  currentUser: null,
  fetching: true,
  loginError: null,
  loggingIn: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCurrentUser(state, action) {
      state.currentUser = action.payload;
    },
    clearLoginError(state) {
      state.loginError = null;
    },
    logout(state) {
      state.currentUser = null;
      localStorage.removeItem("accessToken");
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getCurrentUser.pending, (state) => {
        state.fetching = true;
      })
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        console.log("✅ getCurrentUser fulfilled:", action.payload);

        state.currentUser = action.payload;
        state.fetching = false;
      })
      .addCase(getCurrentUser.rejected, (state, action) => {
        console.log("❌ getCurrentUser rejected:", action.payload);
        state.currentUser = null;
        state.fetching = false;
      })
      .addCase(login.pending, (state) => {
        state.loggingIn = true;
        state.loginError = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loggingIn = false;
        state.currentUser = action.payload.user;
        localStorage.setItem("accessToken", action.payload.access_token);
      })
      .addCase(login.rejected, (state, action) => {
        state.loggingIn = false;
        state.loginError = action.payload;
      });
  },
});

export const { setCurrentUser, clearLoginError, logout } = authSlice.actions;
export default authSlice.reducer;
