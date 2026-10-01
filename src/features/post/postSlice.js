import { createSlice } from "@reduxjs/toolkit";
import {
  createPost,
  createReply,
  getPost,
  getPostById,
  getReplies,
  getUserReposts,
  likePost,
  repostPost,
} from "@/services/post/postService";

const initialState = {
  list: [],
  reposts: [],
  loadingReposts: false,
  currentPost: null,
  replies: [],
  loadingReplies: false,
  pagination: null,
  loading: false,
  error: null,
};

// helper function
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

const optimisticRepostToggle = (post) => {
  if (!post) return;
  const wasReposted = Boolean(post.is_reposted_by_auth);
  const nextReposted = !wasReposted;
  post.is_reposted_by_auth = nextReposted;
  post.reposts_and_quotes_count = Math.max(
    0,
    (post.reposts_and_quotes_count || 0) + (nextReposted ? 1 : -1),
  );
};

// Lấy post từ cả list lẫn currentPost theo postId
const findPostInState = (state, postId) => ({
  listPost: state.list.find((item) => item.id === postId) || null,
  detailPost: state.currentPost?.id === postId ? state.currentPost : null,
});

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
    clearReposts(state) {
      state.reposts = [];
    },
  },
  extraReducers: (builder) => {
    builder
      // Get feed
      .addCase(getPost.pending, (state) => {
        state.loading = true;
        state.error = null;
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

      // Get post by id
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

      // Create post
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

      // Like post
      .addCase(likePost.pending, (state, action) => {
        const { listPost, detailPost } = findPostInState(
          state,
          action.meta.arg,
        );
        optimisticLikeToggle(listPost);
        optimisticLikeToggle(detailPost);
      })
      .addCase(likePost.fulfilled, (state, action) => {
        const { postId, data } = action.payload || {};
        const { listPost, detailPost } = findPostInState(state, postId);
        const resData = data?.data || data;
        applyLikeResponse(listPost, resData);
        applyLikeResponse(detailPost, resData);
      })
      .addCase(likePost.rejected, (state, action) => {
        const { postId } = action.payload || {};
        const { listPost, detailPost } = findPostInState(state, postId);
        // Rollback — toggle ngược lại
        optimisticLikeToggle(listPost);
        optimisticLikeToggle(detailPost);
      })

      // Toggle repost
      .addCase(repostPost.pending, (state, action) => {
        const { listPost, detailPost } = findPostInState(
          state,
          action.meta.arg,
        );
        optimisticRepostToggle(listPost);
        optimisticRepostToggle(detailPost);
      })
      .addCase(repostPost.fulfilled, (state, action) => {
        // Response trả về post repost mới, không có count của post gốc
        // Optimistic update từ pending đã đủ, không cần làm gì thêm
      })
      .addCase(repostPost.rejected, (state, action) => {
        const { postId } = action.payload || {};
        const { listPost, detailPost } = findPostInState(state, postId);
        // Rollback — toggle ngược lại về trạng thái cũ
        optimisticRepostToggle(listPost);
        optimisticRepostToggle(detailPost);
      })

      // Get user repost
      .addCase(getUserReposts.pending, (state) => {
        state.loadingReposts = true;
        state.error = null;
      })
      .addCase(getUserReposts.fulfilled, (state, action) => {
        state.loadingReposts = false;
        state.reposts = action.payload?.data || [];
      })
      .addCase(getUserReposts.rejected, (state, action) => {
        state.loadingReposts = false;
        state.error = action.payload;
      })

      // Get replies
      .addCase(getReplies.pending, (state) => {
        state.loadingReplies = true;
        state.error = null;
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

      // Create reply
      .addCase(createReply.pending, (state) => {
        state.loadingReplies = true;
        state.error = null;
      })
      .addCase(createReply.fulfilled, (state, action) => {
        state.loadingReplies = false;
        const { postId, data } = action.payload || {};
        const newReply = data?.data || data;

        if (newReply) {
          state.replies.unshift(newReply);

          if (state.currentPost?.id === postId) {
            state.currentPost.replies_count =
              (state.currentPost.replies_count || 0) + 1;
          }

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

export const { setList, clearCurrentPost, clearReplies, clearReposts } =
  postSlice.actions;

export default postSlice.reducer;
