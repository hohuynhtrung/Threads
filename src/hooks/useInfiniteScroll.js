import { useEffect } from "react";

export const useInfiniteScroll = (callback, hasMore, loading) => {
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition =
        window.innerHeight + document.documentElement.scrollTop;

      const targetPosition = document.documentElement.offsetHeight - 200;

      if (scrollPosition >= targetPosition && hasMore && !loading) {
        callback();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [callback, hasMore, loading]);
};
