import http from "@/utils/http";
import { createAsyncThunk } from "@reduxjs/toolkit";

// POST Mute
export const muteUser = createAsyncThunk(
  "action/muteUser",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await http.post(`/users/${userId}/mute`);
      return response;
    } catch (error) {
      return rejectWithValue({
        userId,
        message: error.response.message || "Mute User failed",
      });
    }
  },
);

// POST Unmute
export const unMuteUser = createAsyncThunk(
  "action/unMuteUser",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await http.del(`/users/${userId}/mute`);
      return response;
    } catch (error) {
      return rejectWithValue({
        userId,
        message: error.response.message || "Unmute User failed",
      });
    }
  },
);
