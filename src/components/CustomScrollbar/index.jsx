import { useEffect, useRef, useState } from "react";

function CustomScrollbar({ scrollRef }) {
  const thumbRef = useRef(null);
  const [thumbHeight, setThumbHeight] = useState(40);
  const [thumbTop, setThumbTop] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const element = scrollRef.current;
    if (!element) return;

    const updateScrollbar = () => {
      const { scrollHeight, clientHeight, scrollTop } = element;

      if (scrollHeight <= clientHeight) {
        setThumbHeight(0);
        return;
      }

      const height = Math.max(30, (clientHeight / scrollHeight) * clientHeight);

      setThumbHeight(height);

      const maxThumbTop = clientHeight - height;
      const maxScrollTop = scrollHeight - clientHeight;

      setThumbTop((scrollTop / maxScrollTop) * maxThumbTop);
    };

    element.addEventListener("scroll", updateScrollbar);
    const observer = new ResizeObserver(updateScrollbar);

    observer.observe(element);
    observer.observe(element.firstElementChild || element);

    updateScrollbar();

    return () => {
      element.removeEventListener("scroll", updateScrollbar);
      observer.disconnect();
    };
  }, [scrollRef]);

  const handleMouseDown = (event) => {
    event.preventDefault();
    setIsDragging(true);
  };

  useEffect(() => {
    if (!isDragging) return;

    const element = scrollRef.current;
    if (!element) return;

    const handleMouseMove = (event) => {
      const rect = element.getBoundingClientRect();
      const maxThumbTop = element.clientHeight - thumbHeight;
      const maxScrollTop = element.scrollHeight - element.clientHeight;

      const nextTop = Math.max(
        0,
        Math.min(maxThumbTop, event.clientY - rect.top - thumbHeight / 2),
      );

      element.scrollTop = (nextTop / maxThumbTop) * maxScrollTop;
    };

    const handleMouseUp = () => setIsDragging(false);

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, scrollRef, thumbHeight]);

  if (!thumbHeight) return null;

  return (
    <div className="fixed right-1 top-0 z-50 h-screen w-3 flex justify-center">
      <div
        ref={thumbRef}
        onMouseDown={handleMouseDown}
        className="absolute w-1.5 rounded-full bg-gray-400/70 hover:bg-gray-500 cursor-pointer transition-colors"
        style={{
          height: thumbHeight,
          top: thumbTop,
        }}
      />
    </div>
  );
}

export default CustomScrollbar;
