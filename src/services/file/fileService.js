import http from "@/utils/http";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const uploadMedia = createAsyncThunk(
  "media/uploadMedia",
  async (data, { rejectWithValue }) => {
    try {
      const response = await http.post("/upload/media", data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.message || "Upload Media failed");
    }
  },
);
