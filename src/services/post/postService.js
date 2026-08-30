import http from "@/utils/http";
import { createAsyncThunk } from "@reduxjs/toolkit";

// GET feed
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

// GET post detail
export const getPostById = createAsyncThunk(
  "posts/getPostId",
  async (id, { rejectWithValue }) => {
    try {
      const response = await http.get(`/posts/${id}`);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.message || "Get Post by id failed");
    }
  },
);

// POST create post
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

// POST toggle like
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

// GET replies
export const getReplies = createAsyncThunk(
  "posts/getReplies",
  async (postId, { rejectWithValue }) => {
    try {
      const response = await http.get(`/posts/${postId}/replies`);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.message);
    }
  },
);

// POST reply
export const createReply = createAsyncThunk(
  "post/createReply",
  async ({ postId, content }, { rejectWithValue }) => {
    try {
      const response = await http.post(`/posts/${postId}/reply`, { content });
      return { postId, reply: response };
    } catch (error) {
      return rejectWithValue(error.response.message);
    }
  },
);
