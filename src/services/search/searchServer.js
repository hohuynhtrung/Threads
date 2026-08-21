import http from "@/utils/http";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getSuggestion = createAsyncThunk(
  "users/suggestions",
  async (_, { rejectWithValue }) => {
    try {
      const response = await http.get("/users/suggestions");
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.message.data || "Get Suggestions Failed",
      );
    }
  },
);

export const getSearchAll = createAsyncThunk(
  "search",
  async (params = { q: "", page: 1 }, { rejectWithValue }) => {
    try {
      const response = await http.get("/search", { params });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data.message || "Search Failed");
    }
  },
);
