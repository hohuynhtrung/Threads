import { createSlice } from "@reduxjs/toolkit";
import {
  createPost,
  createReply,
  getPost,
  getPostById,
  getReplies,
  likePost,
} from "@/services/post/postService";

const initialState = {
  list: [],
  currentPost: null,
  replies: [],
  loadingReplies: false,
  pagination: null,
  loading: false,
  error: null,
};

const optimisticLikeToggle = (post) => {
  if (!post) return;

  const wasLiked = Boolean(post.is_liked_by_auth);
  const nextLiked = !wasLiked;

  post.is_liked_by_auth = nextLiked;
  post.is_liked = nextLiked;
  post.likes_count = Math.max(
    0,
    (post.likes_count || 0) + (nextLiked ? 1 : -1),
  );
};

const applyLikeResponse = (post, data) => {
  if (!post || !data) return;

  if (typeof data.is_liked === "boolean") {
    post.is_liked = data.is_liked;
    post.is_liked_by_auth = data.is_liked;
  }

  if (typeof data.likes_count === "number") {
    post.likes_count = data.likes_count;
  }
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
    clearReplies(state) {
      state.replies = [];
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
        state.currentPost = action.payload.data;
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
        const listPost = state.list.find((item) => item.id === postId);
        const detailPost =
          state.currentPost && state.currentPost.id === postId
            ? state.currentPost
            : null;

        optimisticLikeToggle(listPost);
        optimisticLikeToggle(detailPost);
      })

      .addCase(likePost.fulfilled, (state, action) => {
        const { postId, data } = action.payload || {};
        const listPost = state.list.find((item) => item.id === postId);
        const detailPost =
          state.currentPost && state.currentPost.id === postId
            ? state.currentPost
            : null;

        const resData = data?.data || data;

        applyLikeResponse(listPost, resData);
        applyLikeResponse(detailPost, resData);
      })

      .addCase(likePost.rejected, (state, action) => {
        const { postId } = action.payload || {};
        const listPost = state.list.find((item) => item.id === postId);
        const detailPost =
          state.currentPost && state.currentPost.id === postId
            ? state.currentPost
            : null;

        optimisticLikeToggle(listPost);
        optimisticLikeToggle(detailPost);
      })
      // GET replies
      .addCase(getReplies.pending, (state) => {
        state.loadingReplies = true;
      })
      .addCase(getReplies.fulfilled, (state, action) => {
        state.loadingReplies = false;
        const resData = action.payload.data;

        state.replies = Array.isArray(resData) ? resData : [];
      })
      .addCase(getReplies.rejected, (state, action) => {
        state.loadingReplies = false;
        state.error = action.payload;
      })
      // POST Reply
      .addCase(createReply.pending, (state) => {
        state.loadingReplies = true;
        state.error = null;
      })
      .addCase(createReply.fulfilled, (state, action) => {
        state.loadingReplies = false;

        const { postId, data } = action.payload || {};
        const newReply = data?.data || data;

        if (newReply) {
          // Đẩy reply mới vào đầu danh sách replies
          state.replies.unshift(newReply);

          // Tự động tăng replies_count ở currentPost (nếu đang xem trang Detail)
          if (state.currentPost && state.currentPost.id === postId) {
            state.currentPost.replies_count =
              (state.currentPost.replies_count || 0) + 1;
          }

          // Tự động tăng replies_count trong state.list (nếu có)
          const listPost = state.list.find((item) => item.id === postId);
          if (listPost) {
            listPost.replies_count = (listPost.replies_count || 0) + 1;
          }
        }
      })
      .addCase(createReply.rejected, (state, action) => {
        state.loadingReplies = false;
        state.error = action.payload;
      });
  },
});

export const { setList, clearCurrentPost, clearReplies } = postSlice.actions;

export default postSlice.reducer;
