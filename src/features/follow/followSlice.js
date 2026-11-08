import { createSlice } from "@reduxjs/toolkit";
import {
  followUser,
  unfollowUser,
  getFollowers,
  getFollowings,
} from "@/services/follow/followService";

const initialState = {
  followersMap: {},
  followersCountMap: {},
  followingsMap: {},
  followingsCountMap: {},
  followingMap: {},
  loading: false,
  error: null,
  followError: null,
};

export const followSilce = createSlice({
  name: "follow",
  initialState,
  reducers: {
    setFollowStatus(state, action) {
      const { userId, isFollowing } = action.payload;
      state.followingMap[userId] = isFollowing;
    },
  },
  extraReducers: (builder) => {
    builder
      // Get Followers
      .addCase(getFollowers.pending, (state) => {
        state.loading = true;
      })
      .addCase(getFollowers.fulfilled, (state, action) => {
        state.loading = false;
        const userId = action.meta.arg;
        const followers = action.payload.data || [];
        const total = action.payload.pagination?.total ?? followers.length;

        state.followersMap[userId] = followers;
        state.followersCountMap[userId] = total;
      })
      .addCase(getFollowers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Get Followings
      .addCase(getFollowings.pending, (state) => {
        state.loading = true;
      })
      .addCase(getFollowings.fulfilled, (state, action) => {
        state.loading = false;
        const userId = action.meta.arg;
        const followings = action.payload.data || [];
        const total = action.payload.pagination?.total ?? followings.length;

        state.followingsMap[userId] = followings;
        state.followingsCountMap[userId] = total;
      })
      .addCase(getFollowings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Follow user
      .addCase(followUser.pending, (state, action) => {
        const userId = action.meta.arg;
        state.followingMap[userId] = true;
        if (state.followersCountMap[userId] !== undefined) {
          state.followersCountMap[userId] += 1;
        }
        state.followError = null;
      })
      .addCase(followUser.fulfilled, (state) => {
        state.followError = null;
      })
      .addCase(followUser.rejected, (state, action) => {
        const userId = action.meta.arg;
        state.followingMap[userId] = false;
        if (state.followersCountMap[userId] !== undefined) {
          state.followersCountMap[userId] = Math.max(
            0,
            state.followersCountMap[userId] - 1,
          );
        }
        state.followError = action.payload?.message || "Follow failed";
      })

      // Unfollow user
      .addCase(unfollowUser.pending, (state, action) => {
        const userId = action.meta.arg;
        state.followingMap[userId] = false;
        if (state.followersCountMap[userId] !== undefined) {
          state.followersCountMap[userId] = Math.max(
            0,
            state.followersCountMap[userId] - 1,
          );
        }
        state.followError = null;
      })
      .addCase(unfollowUser.fulfilled, (state) => {
        state.followError = null;
      })
      .addCase(unfollowUser.rejected, (state, action) => {
        const userId = action.meta.arg;
        state.followingMap[userId] = true;
        if (state.followersCountMap[userId] !== undefined) {
          state.followersCountMap[userId] += 1;
        }
        state.followError = action.payload?.message || "Unfollow failed";
      });
  },
});

export const { setFollowStatus } = followSilce.actions;
export default followSilce.reducer;
