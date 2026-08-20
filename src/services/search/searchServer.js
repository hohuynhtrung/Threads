import http from "@/utils/http";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getSuggestion = createAsyncThunk(
  "users/suggestions",
  async (_, { rejecWithValue }) => {
    try {
      const response = await http.get("/users/suggestions");
      return response.data;
    } catch (error) {
      return rejecWithValue(
        error.response?.data?.messagee || "Get Suggestions Failed",
      );
    }
  },
);
