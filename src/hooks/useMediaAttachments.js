import { useCallback, useEffect, useRef, useState } from "react";

export function useMediaAttachments(max = 10) {
  const [items, setItems] = useState([]);
  const [error, setError] = useState("");
  const latestItems = useRef([]);

  // Giữ bản mới nhất để dọn object URL khi unmount
  useEffect(() => {
    latestItems.current = items;
  }, [items]);

  useEffect(() => {
    return () => {
      latestItems.current.forEach((item) => URL.revokeObjectURL(item.preview));
    };
  }, []);

  const addFiles = useCallback(
    (fileList) => {
      const files = Array.from(fileList || []);
      if (files.length === 0) return;

      const accepted = files.slice(0, Math.max(max - items.length, 0));
      setError(
        accepted.length < files.length
          ? `Bạn chỉ có thể đính kèm tối đa ${max} tệp.`
          : "",
      );

      const newItems = accepted.map((file) => ({
        id: crypto.randomUUID(),
        file,
        preview: URL.createObjectURL(file),
        type: file.type.startsWith("video/") ? "video" : "image",
      }));
      setItems((prev) => [...prev, ...newItems]);
    },
    [items.length, max],
  );

  const remove = useCallback(
    (id) => {
      const target = items.find((item) => item.id === id);
      if (target) URL.revokeObjectURL(target.preview);
      setItems((prev) => prev.filter((item) => item.id !== id));
      setError("");
    },
    [items],
  );

  const clear = useCallback(() => {
    items.forEach((item) => URL.revokeObjectURL(item.preview));
    setItems([]);
    setError("");
  }, [items]);

  return {
    items,
    error,
    addFiles,
    remove,
    clear,
    reachedLimit: items.length >= max,
  };
}
