import { useEffect, useRef } from "react";

export const useInfiniteScroll = (
  callback,
  hasMore,
  loading,
  scrollRootRef = null,
) => {
  const sentinelRef = useRef(null);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel || !hasMore || loading) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) callback();
      },
      {
        root: scrollRootRef?.current ?? null,
        rootMargin: "0px 0px 200px 0px",
      },
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [callback, hasMore, loading, scrollRootRef]);

  return sentinelRef;
};
