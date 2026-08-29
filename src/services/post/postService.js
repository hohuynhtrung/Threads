import http from "@/utils/http";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getPost = createAsyncThunk(
  "posts/getPost",
  async (params = { type: "for_you", page: 1 }, { rejectWithValue }) => {
    try {
      const response = await http.get("/posts/feed", { params });
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.message || "Lỗi hệ thống");
    }
  },
);

export const getPostById = createAsyncThunk(
  "posts/getPostId",
  async (id, { rejectWithValue }) => {
    try {
      const response = await http.get(`/posts/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.message || "Get Post by id failed");
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

export const likePost = createAsyncThunk(
  "posts/likePost",
  async (postId, { rejectWithValue }) => {
    try {
      const response = await http.post(`/posts/${postId}/like`);
      return { postId, data: response.data };
    } catch (error) {
      return rejectWithValue({
        postId,
        message: error.response?.message || "Like failed",
      });
    }
  },
);
