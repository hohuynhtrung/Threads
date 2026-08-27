import http from "@/utils/http";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getFollowers = createAsyncThunk(
  "follow/getFollowers",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await http.get(`/users/${userId}/followers`);
      return response;
    } catch (error) {
      return rejectWithValue(
        error.response.message || "Unable to fetch followers",
      );
    }
  },
);
