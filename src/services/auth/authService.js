import { createAsyncThunk } from "@reduxjs/toolkit";

import http from "@/utils/http";

export const getCurrentUser = createAsyncThunk(
  "auth/getCurrentUser",
  async (_, { rejectWithValue }) => {
    try {
      const response = await http.get("/auth/user");
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Unable to retrieve user information",
      );
    }
  },
);

export const login = createAsyncThunk(
  "auth/login",
  async (data, { rejectWithValue }) => {
    try {
      const response = await http.post("/auth/login", data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Login failed");
    }
  },
);

export const refreshToken = createAsyncThunk(
  "auth/refreshToken",
  async (_, { rejectWithValue }) => {
    try {
      const refresh_token = localStorage.getItem("refreshToken");
      const response = await http.post("/auth/refresh", { refresh_token });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Refresh token failed",
      );
    }
  },
);
