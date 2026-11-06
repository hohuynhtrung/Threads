import { createSlice } from "@reduxjs/toolkit";
import {
  createPost,
  createReply,
  deletePost,
  getPost,
  getPostById,
  getReplies,
  getUserReposts,
  likePost,
  repostPost,
  updatePost,
  quotePost,
  toggleSavePost,
} from "@/services/post/postService";

const initialState = {
  list: [],
  saveList: [],
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
      .addCase(repostPost.fulfilled, (state) => {
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
      })

      // Delete post
      .addCase(deletePost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.loading = false;
        const deletedPostId = action.meta.arg;

        state.list = state.list.filter((post) => post.id !== deletedPostId);
        if (state.currentPost?.id === deletedPostId) {
          state.currentPost = null;
        }
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update post
      .addCase(updatePost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        state.loading = false;
        const updatedPost = action.payload?.data || action.payload;

        if (updatedPost && updatedPost.id) {
          const index = state.list.findIndex(
            (item) => item.id === updatedPost.id,
          );
          if (index !== -1) {
            state.list[index] = { ...state.list[index], ...updatedPost };
          }
          if (state.currentPost?.id === updatedPost.id) {
            state.currentPost = { ...state.currentPost, ...updatedPost };
          }
          const replyIndex = state.replies.findIndex(
            (item) => item.id === updatedPost.id,
          );
          if (replyIndex !== -1) {
            state.replies[replyIndex] = {
              ...state.replies[replyIndex],
              ...updatedPost,
            };
          }
        }
      })
      .addCase(updatePost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Quote Post
      .addCase(quotePost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(quotePost.fulfilled, (state, action) => {
        state.loading = false;
        // Đưa bài viết mới được quote lên đầu danh sách hiển thị luôn
        if (action.payload?.data) {
          state.list.unshift(action.payload.data);
        }
      })
      .addCase(quotePost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Toggle save post
      .addCase(toggleSavePost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(toggleSavePost.fulfilled, (state, action) => {
        state.loading = false;
        const { postId, post: requestedPost, data } = action.payload;
        const responsePost = data?.data?.id ? data.data : data?.id ? data : null;
        const existingPost =
          state.list.find((item) => item.id === postId) ||
          (state.currentPost?.id === postId ? state.currentPost : null) ||
          state.replies.find((item) => item.id === postId) ||
          state.reposts.find((item) => item.id === postId) ||
          requestedPost;
        const isSaved =
          typeof responsePost?.is_saved_by_auth === "boolean"
            ? responsePost.is_saved_by_auth
            : !existingPost?.is_saved_by_auth;
        const updatedPost = {
          ...existingPost,
          ...responsePost,
          is_saved_by_auth: isSaved,
        };

        state.list = state.list.map((item) =>
          item.id === postId ? updatedPost : item,
        );
        if (state.currentPost?.id === postId) {
          state.currentPost = updatedPost;
        }
        state.replies = state.replies.map((item) =>
          item.id === postId ? updatedPost : item,
        );
        state.reposts = state.reposts.map((item) =>
          item.id === postId ? updatedPost : item,
        );

        if (isSaved) {
          const savedIndex = state.saveList.findIndex(
            (item) => item.id === postId,
          );
          if (savedIndex === -1) {
            state.saveList.push(updatedPost);
          } else {
            state.saveList[savedIndex] = updatedPost;
          }
        } else {
          state.saveList = state.saveList.filter(
            (item) => item.id !== postId,
          );
        }
      })
      .addCase(toggleSavePost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setList, clearCurrentPost, clearReplies, clearReposts } =
  postSlice.actions;

export default postSlice.reducer;
