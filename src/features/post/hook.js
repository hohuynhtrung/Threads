import { clearCurrentPost, setList } from "@/features/post/postSlice";
import {
  createPost,
  getPost,
  getPostById,
  likePost,
} from "@/services/post/postService";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

export const usePosts = () => {
  const dispatch = useDispatch();

  const posts = useSelector((state) => state.posts.list);
  const currentPost = useSelector((state) => state.posts.currentPost);
  const pagination = useSelector((state) => state.posts.pagination);
  const loading = useSelector((state) => state.posts.loading);
  const error = useSelector((state) => state.posts.error);

  const fetchPosts = useCallback(
    (params = { type: "for_you", page: 1 }) => dispatch(getPost(params)),
    [dispatch],
  );

  const fetchPostById = useCallback(
    (id) => dispatch(getPostById(id)),
    [dispatch],
  );

  const handleCreatePost = useCallback(
    (data) => dispatch(createPost(data)),
    [dispatch],
  );

  const handleLikePost = useCallback(
    (postId) => dispatch(likePost(postId)),
    [dispatch],
  );

  const handleSetPosts = useCallback(
    (newList) => dispatch(setList(newList)),
    [dispatch],
  );

  const handleClearCurrentPost = useCallback(
    () => dispatch(clearCurrentPost()),
    [dispatch],
  );

  return {
    posts,
    currentPost,
    loading,
    error,
    hasMore: pagination ? pagination.curren_page < pagination.last_page : false,
    fetchPosts,
    fetchPostById,
    createPost: handleCreatePost,
    likePost: handleLikePost,
    setPosts: handleSetPosts,
    clearCurrentPost: handleClearCurrentPost,
  };
};
