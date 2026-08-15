import http from "@/utils/http";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getPost = createAsyncThunk(
  "posts/getPost",
  async (_, { rejectWithValue }) => {
    try {
      const res = await http.get("/posts/feed");
      return res;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Không thể tải danh sách bài viết",
      );
    }
  },
);
