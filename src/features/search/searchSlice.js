import { getSuggestion } from "@/services/search/searchServer";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  list: [],
  loading: false,
  error: null,
};

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setList(state, action) {
      state.list = action.payload;
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
        state.list = action.payload || [];
      })
      .addCase(getSuggestion.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setList } = searchSlice.actions;

export default searchSlice.reducer;
