import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  followUser,
  unfollowUser,
  getFollowers,
  getFollowings,
} from "@/services/follow/followService";
import { setFollowStatus } from "@/features/follow/followSlice";

export const useFetchFollowers = (userId) => {
  const dispatch = useDispatch();
  const { followersCount, loading } = useSelector((state) => state.follow);

  useEffect(() => {
    if (userId) {
      dispatch(getFollowers(userId));
    }
  }, [dispatch, userId]);

  return { followersCount, loading };
};

export const useFetchFollowings = (userId) => {
  const dispatch = useDispatch();
  const { followingsCount, loading } = useSelector((state) => state.follow);

  useEffect(() => {
    if (userId) {
      dispatch(getFollowings(userId));
    }
  }, [dispatch, userId]);

  return { followingsCount, loading };
};

export const useUserFollow = (userId) => {
  const dispatch = useDispatch();
  const isFollowing = useSelector(
    (state) => state.follow.followingMap[userId] ?? false,
  );
  const followError = useSelector((state) => state.follow.followError);

  const toggleFollow = useCallback(() => {
    if (!userId) return;

    if (isFollowing) {
      dispatch(unfollowUser(userId));
    } else {
      dispatch(followUser(userId));
    }
  }, [dispatch, userId, isFollowing]);

  const initFollowStatus = useCallback(
    (status) => {
      if (userId && typeof status === "boolean") {
        dispatch(setFollowStatus({ userId, isFollowing: status }));
      }
    },
    [dispatch, userId],
  );

  return { isFollowing, toggleFollow, initFollowStatus, followError };
};
