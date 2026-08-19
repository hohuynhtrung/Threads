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
      // GET CURRENT USER
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

      // LOGIN
      .addCase(login.pending, (state) => {
        state.loggingIn = true;
        state.loginError = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loggingIn = false;

        // Bóc tách đúng object data từ response
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

      // REGISTER
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
      });
  },
});

export const { setCurrentUser, clearLoginError, logout } = authSlice.actions;
export default authSlice.reducer;
