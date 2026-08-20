import http from "@/utils/http";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getPost = createAsyncThunk(
  "posts/getPost",
  async (params = { type: "for_you", page: 1 }, { rejectWithValue }) => {
    try {
      const response = await http.get("/posts/feed", { params });
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Lỗi hệ thống");
    }
  },
);

export const createPost = createAsyncThunk(
  "posts",
  async (data, { rejectWithValue }) => {
    try {
      const response = await http.post("/posts", data);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Create Posts failed",
      );
    }
  },
);
