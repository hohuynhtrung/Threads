import http from "@/utils/http";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getPost = createAsyncThunk(
  "posts/getPost",
  async (
    params = { type: "for_you", page: 1, per_page: 10 },
    { rejectWithValue },
  ) => {
    try {
      const response = await http.get("/posts/feed", { params });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Lỗi hệ thống");
    }
  },
);
