import { createSlice } from "@reduxjs/toolkit";
import {
  createPost,
  getPost,
  getPostById,
  likePost,
} from "@/services/post/postService";

const initialState = {
  list: [],
  currentPost: null,
  pagination: null,
  loading: false,
  error: null,
};

export const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    setList(state, action) {
      state.list = action.payload;
    },
    clearCurrentPost(state) {
      state.currentPost = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // GET post
      .addCase(getPost.pending, (state) => {
        state.loading = true;
      })
      .addCase(getPost.fulfilled, (state, action) => {
        state.loading = false;

        const newPosts = action.payload?.data || [];
        const pagination = action.payload?.pagination || null;

        if (pagination) {
          state.pagination = pagination;
        }
        const currentPage = action.meta.arg?.page || 1;

        if (currentPage === 1) {
          state.list = newPosts;
        } else {
          state.list = [...state.list, ...newPosts];
        }
      })
      .addCase(getPost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // GET POST BY ID
      .addCase(getPostById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getPostById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentPost = action.payload;
      })
      .addCase(getPostById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Create Post
      .addCase(createPost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.loading = false;
        const newPost = action.payload?.data;
        if (newPost) {
          state.list.unshift(newPost);
        }
      })
      .addCase(createPost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      //Like Post
      .addCase(likePost.pending, (state, action) => {
        const postId = action.meta.arg;
        const post = state.list.find((item) => item.id === postId);

        if (post) {
          const wasLiked = Boolean(post.is_liked_by_auth ?? post.is_liked);
          post.is_liked_by_auth = !wasLiked;
          post.likes_count = wasLiked
            ? Math.max(0, (post.likes_count || 0) - 1)
            : (post.likes_count || 0) + 1;
        }
      })

      .addCase(likePost.fulfilled, (state, action) => {
        const { postId, data } = action.payload || {};
        const post = state.list.find((item) => item.id === postId);

        const resData = data?.data || data;

        if (post && resData) {
          if (typeof resData.is_liked === "boolean") {
            post.is_liked = resData.is_liked;
          }
          if (typeof resData.likes_count === "number") {
            post.likes_count = resData.likes_count;
          }
        }
      })

      .addCase(likePost.rejected, (state, action) => {
        const { postId } = action.payload || {};
        const post = state.list.find((item) => item.id === postId);

        if (post) {
          const isCurrentlyLiked = post.is_liked;
          post.is_liked = !isCurrentlyLiked;
          post.likes_count = isCurrentlyLiked
            ? Math.max(0, (post.likes_count || 0) - 1)
            : (post.likes_count || 0) + 1;
        }
      });
  },
});

export const { setList, clearCurrentPost } = postSlice.actions;

export default postSlice.reducer;
