import http from "@/utils/http";
import { createAsyncThunk } from "@reduxjs/toolkit";

const getErrorMessage = (error, fallback) => {
  const responseMessage =
    error.response?.data?.message || error.response?.data?.errors;

  if (typeof responseMessage === "string") {
    return responseMessage;
  }

  if (Array.isArray(responseMessage)) {
    return responseMessage.join(", ");
  }

  return typeof error.message === "string" ? error.message : fallback;
};

export const getFollowers = createAsyncThunk(
  "follow/getFollowers",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await http.get(`/users/${userId}/followers`);
      return response;
    } catch (error) {
      return rejectWithValue(
        getErrorMessage(error, "Unable to fetch followers"),
      );
    }
  },
);

export const getFollowings = createAsyncThunk(
  "follow/getFollowings",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await http.get(`/users/${userId}/followings`);
      return response;
    } catch (error) {
      return rejectWithValue(
        getErrorMessage(error, "Unable to fetch followings"),
      );
    }
  },
);

export const followUser = createAsyncThunk(
  "follow/followUser",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await http.post(`/users/${userId}/follow`, {});
      return { userId, data: response };
    } catch (error) {
      return rejectWithValue({
        userId,
        message: getErrorMessage(error, "Unable to follow user"),
      });
    }
  },
);

export const unfollowUser = createAsyncThunk(
  "follow/unfollowUser",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await http.del(`/users/${userId}/follow`);
      return { userId, data: response };
    } catch (error) {
      return rejectWithValue({
        userId,
        message: getErrorMessage(error, "Unable to unfollow user"),
      });
    }
  },
);
