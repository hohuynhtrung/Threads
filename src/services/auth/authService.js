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
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Login failed");
    }
  },
);

export const register = createAsyncThunk(
  "auth/register",
  async (data, { rejectWithValue }) => {
    try {
      const response = await http.post("/auth/register", data);
      return response;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.errors ||
          error.response?.data?.message ||
          "Register failed",
      );
    }
  },
);

export const logoutUser = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      const response = await http.post("/auth/logout");
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);
