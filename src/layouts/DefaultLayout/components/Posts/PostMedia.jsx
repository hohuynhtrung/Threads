import { useRef, useState } from "react";
import MediaLightbox from "@/layouts/DefaultLayout/components/Posts/MediaLightbox";

const VIDEO_REGEX = /\.(mp4|webm|ogg|mov)(\?.*)?$/i;
const DRAG_THRESHOLD = 5;

function useDragScroll() {
  const ref = useRef(null);
  const drag = useRef({ startX: 0, startLeft: 0, moved: false });
  const [isDragging, setIsDragging] = useState(false);

  const onMouseDown = (e) => {
    const el = ref.current;
    if (!el || e.button !== 0 || e.target.closest("video")) return;

    drag.current = {
      startX: e.clientX,
      startLeft: el.scrollLeft,
      moved: false,
    };

    const handleMove = (ev) => {
      const dx = ev.clientX - drag.current.startX;

      if (!drag.current.moved && Math.abs(dx) > DRAG_THRESHOLD) {
        drag.current.moved = true;
        setIsDragging(true);
      }
      if (drag.current.moved) {
        el.scrollLeft = drag.current.startLeft - dx;
      }
    };

    const handleUp = () => {
      setIsDragging(false);
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseup", handleUp);
    };

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseup", handleUp);
  };

  const wasDragged = () => drag.current.moved;

  return { ref, onMouseDown, isDragging, wasDragged };
}

function PostMedia({ urls = [] }) {
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const { ref, onMouseDown, isDragging, wasDragged } = useDragScroll();

  if (!urls || urls.length === 0) return null;

  const isSingle = urls.length === 1;

  const handleClickCapture = (e) => {
    if (wasDragged()) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  const openLightbox = (e, index) => {
    e.stopPropagation();
    setLightboxIndex(index);
  };

  return (
    <>
      <div
        ref={ref}
        onMouseDown={isSingle ? undefined : onMouseDown}
        onClickCapture={handleClickCapture}
        className={
          isSingle
            ? "mt-2"
            : `mt-2 flex gap-2 overflow-x-auto select-none scrollbar-none [&::-webkit-scrollbar]:hidden ${
                isDragging ? "cursor-grabbing" : "cursor-grab"
              }`
        }
      >
        {urls.map((url, index) => {
          const isVideo = VIDEO_REGEX.test(url);
          const sizeClass = isSingle
            ? "max-h-107.5 w-auto max-w-full"
            : "h-60 w-auto max-w-none";

          return (
            <div
              key={`${url}-${index}`}
              className={`rounded-xl overflow-hidden border border-gray-100 dark:border-[#2d2d2d] ${
                isSingle ? "inline-block max-w-full" : "shrink-0"
              }`}
            >
              {isVideo ? (
                <video
                  src={url}
                  controls
                  onClick={(e) => e.stopPropagation()}
                  className={`${sizeClass} object-cover`}
                />
              ) : (
                <img
                  src={url}
                  alt={`Media ${index + 1}`}
                  draggable={false}
                  onClick={(e) => openLightbox(e, index)}
                  className={`${sizeClass} object-cover ${
                    isSingle ? "cursor-pointer" : ""
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>

      {lightboxIndex !== null && (
        <MediaLightbox
          urls={urls}
          startIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
        />
      )}
    </>
  );
}

export default PostMedia;
