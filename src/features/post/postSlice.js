import { createSlice } from "@reduxjs/toolkit";
import { createPost, getPost } from "@/services/post/postService";

const initialState = {
  list: [],
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
  },
  extraReducers: (builder) => {
    builder
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
      });
  },
});

export const { setList } = postSlice.actions;

export default postSlice.reducer;
