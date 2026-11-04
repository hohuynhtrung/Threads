import { useEffect } from "react";

export const useInfiniteScroll = (callback, hasMore, loading, scrollRef) => {
  useEffect(() => {
    const scrollElement = scrollRef?.current;

    if (!scrollElement) return;

    const handleScroll = () => {
      const { scrollTop, clientHeight, scrollHeight } = scrollElement;

      const isNearBottom = scrollTop + clientHeight >= scrollHeight - 200;

      if (isNearBottom && hasMore && !loading) {
        callback();
      }
    };

    const handleWheel = (event) => {
      if (!scrollElement.contains(event.target)) {
        scrollElement.scrollTop += event.deltaY;
      }
    };

    scrollElement.addEventListener("scroll", handleScroll);
    window.addEventListener("wheel", handleWheel, { passive: true });

    return () => {
      scrollElement.removeEventListener("scroll", handleScroll);
      window.removeEventListener("wheel", handleWheel);
    };
  }, [callback, hasMore, loading, scrollRef]);
};
