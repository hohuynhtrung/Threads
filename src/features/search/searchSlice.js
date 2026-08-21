import { getSearchAll, getSuggestion } from "@/services/search/searchServer";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  suggestions: [],
  searchResults: {
    users: [],
    topics: [],
  },
  isSearched: false,
  loading: false,
  error: null,
};

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    clearSearchResults(state) {
      state.searchResults = { users: [], topics: [] };
      state.isSearched = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSuggestion.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSuggestion.fulfilled, (state, action) => {
        state.loading = false;
        state.suggestions = action.payload || [];
      })
      .addCase(getSuggestion.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getSearchAll.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSearchAll.fulfilled, (state, action) => {
        state.loading = false;
        state.isSearched = true;
        state.searchResults = action.payload?.data ||
          action.payload || { users: {}, topics: [] };
      })
      .addCase(getSearchAll.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearSearchResults } = searchSlice.actions;

export default searchSlice.reducer;
