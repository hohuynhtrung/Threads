import { configureStore } from "@reduxjs/toolkit";
import postReducer from "@/features/post/postSlice";
import authReducer from "@/features/auth/authSlice";
import searchReducer from "@/features/search/searchSlice";

export const store = configureStore({
  reducer: {
    posts: postReducer,
    auth: authReducer,
    search: searchReducer,
  },
});
