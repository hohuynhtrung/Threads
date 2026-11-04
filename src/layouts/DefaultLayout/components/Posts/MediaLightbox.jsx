import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

const VIDEO_REGEX = /\.(mp4|webm|ogg|mov)(\?.*)?$/i;

function MediaLightbox({ urls = [], startIndex = 0, onClose }) {
  const [index, setIndex] = useState(startIndex);

  const total = urls.length;
  const hasPrev = index > 0;
  const hasNext = index < total - 1;

  const goPrev = useCallback(() => setIndex((i) => Math.max(0, i - 1)), []);
  const goNext = useCallback(
    () => setIndex((i) => Math.min(total - 1, i + 1)),
    [total],
  );

  // Phím tắt: Esc đóng, ← → chuyển ảnh
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowLeft") goPrev();
      else if (e.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose, goPrev, goNext]);

  // Khóa scroll trang phía sau khi modal đang mở
  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, []);

  const handleClose = (e) => {
    e.stopPropagation();
    onClose();
  };

  const handlePrev = (e) => {
    e.stopPropagation();
    goPrev();
  };

  const handleNext = (e) => {
    e.stopPropagation();
    goNext();
  };

  const url = urls[index];
  if (!url) return null;
  const isVideo = VIDEO_REGEX.test(url);

  return createPortal(
    // Click vào nền đen => đóng modal
    <div
      role="dialog"
      aria-modal="true"
      onClick={handleClose}
      className="fixed inset-0 z-100 flex items-center justify-center bg-black/95"
    >
      {/* Nút close: góc trái màn hình */}
      <button
        type="button"
        onClick={handleClose}
        aria-label="Close"
        className="absolute top-4 left-4 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition cursor-pointer"
      >
        <X className="w-6 h-6" />
      </button>

      {/* Bộ đếm */}
      {total > 1 && (
        <div className="absolute top-5 left-1/2 -translate-x-1/2 text-sm font-medium text-white/80 select-none">
          {index + 1} / {total}
        </div>
      )}

      {/* Prev: ẩn khi đang ở ảnh đầu */}
      {hasPrev && (
        <button
          type="button"
          onClick={handlePrev}
          aria-label="Previous"
          className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition cursor-pointer"
        >
          <ChevronLeft className="w-7 h-7" />
        </button>
      )}

      {/* Next: ẩn khi đang ở ảnh cuối */}
      {hasNext && (
        <button
          type="button"
          onClick={handleNext}
          aria-label="Next"
          className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition cursor-pointer"
        >
          <ChevronRight className="w-7 h-7" />
        </button>
      )}

      {/* Nội dung: click vào ảnh không đóng modal */}
      {isVideo ? (
        <video
          key={url}
          src={url}
          controls
          autoPlay
          onClick={(e) => e.stopPropagation()}
          className="max-h-[90vh] max-w-[90vw] rounded-lg"
        />
      ) : (
        <img
          key={url}
          src={url}
          alt={`Media ${index + 1}`}
          draggable={false}
          onClick={(e) => e.stopPropagation()}
          className="max-h-[90vh] max-w-[90vw] object-contain select-none rounded-lg"
        />
      )}
    </div>,
    document.body,
  );
}

export default MediaLightbox;
