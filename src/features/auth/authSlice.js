import { createSlice } from "@reduxjs/toolkit";
import {
  login,
  getCurrentUser,
  register,
  logoutUser,
  forgotPassword,
  resetPassoword,
  verifyEmail,
} from "@/services/auth";

const initialState = {
  currentUser: null,
  fetching: false,
  loginError: null,
  loggingIn: false,
  registerError: null,
  registering: false,
  loggingOut: false,
  forgotSending: false,
  forgotError: null,
  resetSending: false,
  resetError: null,
  verifyingEmail: false,
  verifyEmailError: null,
};

const handleLogoutSuccess = (state) => {
  state.loggingOut = false;
  state.currentUser = null;
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
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
    resetAuth(state) {
      handleLogoutSuccess(state);
    },
  },

  extraReducers: (builder) => {
    builder
      // Get Current User
      .addCase(getCurrentUser.pending, (state) => {
        state.fetching = true;
      })
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.currentUser = action.payload?.data || action.payload;
        state.fetching = false;
      })
      .addCase(getCurrentUser.rejected, (state) => {
        state.currentUser = null;
        state.fetching = false;
      })

      // Login
      .addCase(login.pending, (state) => {
        state.loggingIn = true;
        state.loginError = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loggingIn = false;

        const resData = action.payload?.data;
        if (resData) {
          state.currentUser = resData.user;
          if (resData.access_token) {
            localStorage.setItem("accessToken", resData.access_token);
          }
          if (resData.refresh_token) {
            localStorage.setItem("refreshToken", resData.refresh_token);
          }
        }
      })
      .addCase(login.rejected, (state, action) => {
        state.loggingIn = false;
        state.loginError = action.payload;
      })

      // Register
      .addCase(register.pending, (state) => {
        state.registering = true;
        state.registerError = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.registering = false;
      })
      .addCase(register.rejected, (state, action) => {
        state.registering = false;
        state.registerError = action.payload;
      })

      //Logout
      .addCase(logoutUser.pending, (state) => {
        state.loggingOut = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        handleLogoutSuccess(state);
      })
      .addCase(logoutUser.rejected, (state) => {
        handleLogoutSuccess(state);
      })

      // Forgot Password
      .addCase(forgotPassword.pending, (state) => {
        state.forgotSending = true;
        state.forgotError = null;
      })
      .addCase(forgotPassword.fulfilled, (state) => {
        state.forgotSending = false;
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.forgotSending = false;
        state.forgotError = action.payload;
      })

      // Reset Password
      .addCase(resetPassoword.pending, (state) => {
        state.resetSending = true;
        state.resetError = null;
      })
      .addCase(resetPassoword.fulfilled, (state) => {
        state.resetSending = false;
      })
      .addCase(resetPassoword.rejected, (state, action) => {
        state.resetSending = false;
        state.resetError = action.payload;
      })

      // Verify email
      .addCase(verifyEmail.pending, (state) => {
        state.verifyingEmail = true;
        state.verifyEmailError = null;
      })
      .addCase(verifyEmail.fulfilled, (state) => {
        state.verifyingEmail = false;
      })
      .addCase(verifyEmail.rejected, (state, action) => {
        state.verifyingEmail = false;
        state.verifyEmailError = action.payload;
      });
  },
});

export const { setCurrentUser, clearLoginError, resetAuth } = authSlice.actions;
export default authSlice.reducer;
