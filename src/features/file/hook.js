import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uploadMedia } from "@/services/file/fileService";

export function useFile() {
  const dispatch = useDispatch();
  const { loading, uploadedMediaUrl, error } = useSelector(
    (state) => state.file,
  );

  const handleUploadMedia = useCallback(
    (fileData) => dispatch(uploadMedia(fileData)),
    [dispatch],
  );

  return {
    loading,
    uploadedMediaUrl,
    error,
    uploadMedia: handleUploadMedia,
  };
}
