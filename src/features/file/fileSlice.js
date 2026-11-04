import { createSlice } from "@reduxjs/toolkit";
import { uploadMedia } from "@/services/file/fileService";

const initialState = {
  loading: false,
  uploadedMediaUrl: null,
  error: null,
};

const fileSlice = createSlice({
  name: "file",
  initialState,
  reducers: {
    clearMediaState: (state) => {
      state.uploadedMediaUrl = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(uploadMedia.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(uploadMedia.fulfilled, (state, action) => {
        state.loading = false;
        const urls = action.payload?.data?.urls;
        state.uploadedMediaUrl = urls && urls.length > 0 ? urls[0] : null;
      })
      .addCase(uploadMedia.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearMediaState } = fileSlice.actions;
export default fileSlice.reducer;
