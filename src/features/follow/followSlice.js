import { followUser, getFollowers } from "@/services/follow/followService";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  followers: [],
  followersCount: 0,
  loading: false,
  error: null,
};

export const followSilce = createSlice({
  name: "follow",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // get follow user
      .addCase(getFollowers.pending, (state) => {
        state.loading = true;
      })
      .addCase(getFollowers.fulfilled, (state, action) => {
        ((state.loading = false), (state.followers = action.payload.data));
        state.followersCount = action.payload.pagination?.total;
      })
      .addCase(getFollowers.rejected, (state, action) => {
        ((state.loading = false), (state.error = action.payload));
      })

      //post follow user
      .addCase(followUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(followUser.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(followUser.rejected, (state) => {
        state.error = action.payload;
      });
  },
});

export default followSilce.reducer;
