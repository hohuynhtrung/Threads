import { createSlice } from "@reduxjs/toolkit";
import { login, getCurrentUser, register, logoutUser } from "@/services/auth";

const initialState = {
  currentUser: null,
  fetching: false,
  loginError: null,
  loggingIn: false,
  registerError: null,
  registering: false,
  loggingOut: false,
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
      });
  },
});

export const { setCurrentUser, clearLoginError, resetAuth } = authSlice.actions;
export default authSlice.reducer;
