import { createSlice } from "@reduxjs/toolkit";
import { login, getCurrentUser, register } from "@/services/auth";

const initialState = {
  currentUser: null,
  fetching: true,
  loginError: null,
  loggingIn: false,
  registerError: null,
  registering: false,
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
      localStorage.removeItem("refreshToken");
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getCurrentUser.pending, (state) => {
        state.fetching = true;
      })
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.currentUser = action.payload;
        state.fetching = false;
      })
      .addCase(getCurrentUser.rejected, (state, action) => {
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
        localStorage.setItem("refreshToken", action.payload.refresh_token);
      })
      .addCase(login.rejected, (state, action) => {
        state.loggingIn = false;
        state.loginError = action.payload;
      })
      .addCase(register.pending, (state) => {
        state.registering = true;
        state.registerError = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.registering = false;
        state.currentUser = action.payload.user;
        if (action.payload.access_token) {
          localStorage.setItem("accessToken", action.payload.access_token);
          localStorage.setItem("refreshToken", action.payload.refresh_token);
        }
      })
      .addCase(register.rejected, (state, action) => {
        state.registering = false;
        state.registerError = action.payload;
      });
  },
});

export const { setCurrentUser, clearLoginError, logout } = authSlice.actions;
export default authSlice.reducer;
