import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFollowers } from "@/services/follow/followService";

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

export const useFollowers = () => {
  return useSelector((state) => state.follow.followers);
};

export const useFollowersCount = () => {
  return useSelector((state) => state.follow.followersCount);
};
