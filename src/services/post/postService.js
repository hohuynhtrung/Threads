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
  async ({ postId, content, mediaFiles = [] }, { rejectWithValue }) => {
    try {
      let body = { content };

      if (mediaFiles.length > 0) {
        body = new FormData();
        body.append("content", content);
        mediaFiles.forEach((file) => body.append("media[]", file));
      }

      const response = await http.post(`/posts/${postId}/reply`, body);
      return { postId, data: response };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Reply failed");
    }
  },
);

// POST repost post
export const repostPost = createAsyncThunk(
  "posts/repostPost",
  async (postId, { rejectWithValue }) => {
    try {
      const response = await http.post(`/posts/${postId}/repost`);
      return { postId, data: response };
    } catch (error) {
      return rejectWithValue({
        postId,
        message: error.message?.data?.message || "Repost failed",
      });
    }
  },
);

// GET repost post
export const getUserReposts = createAsyncThunk(
  "posts/getUserReposts",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await http.get(`/users/${userId}/reposts`);
      return response;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Get reposts failed",
      );
    }
  },
);

// POST Delete post
export const deletePost = createAsyncThunk(
  "posts/deletePost",
  async (postId, { rejectWithValue }) => {
    try {
      const response = await http.del(`/posts/${postId}`);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.message || "Delete post failed");
    }
  },
);

// PUT Post
export const updatePost = createAsyncThunk(
  "posts/updatePost",
  async ({ postId, content }, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append("_method", "PUT");
      formData.append("content", content);

      const response = await http.post(`/posts/${postId}`, formData);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message || "Update post failed",
      );
    }
  },
);

// POST Quote
export const quotePost = createAsyncThunk(
  "posts/quotePost",
  async ({ postId, data }, { rejectWithValue }) => {
    try {
      // Kiểm tra kỹ xem postId có truyền vào đây không nhé
      console.log("URL gọi API:", `/posts/${postId}/quote`);

      const response = await http.post(`/posts/${postId}/quote`, data);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Quote post failed",
      );
    }
  },
);

// POST Save
export const toggleSavePost = createAsyncThunk(
  "posts/toggleSavePost",
  async ({ postId, post }, { rejectWithValue }) => {
    try {
      const response = await http.post(`/posts/${postId}/save`);
      return { postId, post, data: response.data };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Không thể lưu bài viết",
      );
    }
  },
);

export const fetchRepliesPreview = (
  postId,
  { page = 1, per_page = 2 } = {},
) => {
  return http.get(`/posts/${postId}/replies`, { params: { page, per_page } });
};
