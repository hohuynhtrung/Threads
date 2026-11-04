import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import Images from "@/assets/images";
import Icons from "@/assets/icons";
import { useMediaAttachments } from "@/hooks/useMediaAttachments";

const MAX_MEDIA = 10;

function RepliesInput({
  ref,
  targetUsername,
  currentUserAvatar,
  onSubmit, // async (content, mediaFiles) => boolean (true = thành công)
  onSortChange,
}) {
  const [content, setContent] = useState("");
  const [sortBy, setSortBy] = useState("top");
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dropdownRef = useRef(null);
  const fileInputRef = useRef(null);

  const media = useMediaAttachments(MAX_MEDIA);
  const hasMedia = media.items.length > 0;
  const canSubmit = (content.trim() || hasMedia) && !isSubmitting;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsSortOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelectSort = (option) => {
    setSortBy(option);
    setIsSortOpen(false);
    if (onSortChange) onSortChange(option);
  };

  const handleFileChange = (e) => {
    media.addFiles(e.target.files);
    e.target.value = ""; // cho phép chọn lại cùng 1 file
  };

  const handleSubmit = async () => {
    if (!canSubmit || !onSubmit) return;

    setIsSubmitting(true);
    try {
      const ok = await onSubmit(
        content.trim(),
        media.items.map((item) => item.file),
      );
      // Chỉ xóa nội dung khi gửi thành công, tránh mất ảnh nếu API lỗi
      if (ok !== false) {
        setContent("");
        media.clear();
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleKeyDown = (e) => {
    // isComposing: tránh gửi nhầm khi đang gõ tiếng Việt bằng bộ gõ (Telex/VNI)
    if (e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="w-full flex flex-col gap-3 font-sans">
      {/* Top / Recent */}
      <div className="flex items-center justify-between px-1 text-gray-900 dark:text-[#e8eaeb]">
        <div className="relative" ref={dropdownRef}>
          <button
            type="button"
            onClick={() => setIsSortOpen((prev) => !prev)}
            className="flex items-center gap-1.5 text-[15px] font-semibold hover:opacity-80 transition cursor-pointer capitalize"
          >
            <img
              src={Icons.iconSort}
              alt="Sort"
              className="w-4 h-4 dark:invert"
            />
            <span>{sortBy === "top" ? "Top" : "Recent"}</span>
            <img
              src={Icons.iconChevronDown}
              alt="Chevron"
              className={`w-4 h-4 dark:invert transition-transform duration-200 ${
                isSortOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {isSortOpen && (
            <div className="absolute left-0 top-7 w-32 bg-white dark:bg-[#1f1f1f] border border-gray-200 dark:border-zinc-700 rounded-2xl shadow-lg py-1.5 z-20 animate-in fade-in zoom-in-95 duration-150">
              {["top", "recent"].map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => handleSelectSort(option)}
                  className={`w-full px-4 py-2 text-left text-[14px] transition cursor-pointer flex items-center justify-between capitalize ${
                    sortBy === option
                      ? "font-bold text-black dark:text-white bg-gray-50 dark:bg-zinc-800"
                      : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-zinc-800"
                  }`}
                >
                  <span>{option}</span>
                  {sortBy === option && <span className="text-xs">✓</span>}
                </button>
              ))}
            </div>
          )}
        </div>

        <button
          type="button"
          className="flex items-center gap-1 text-[14px] font-normal dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition cursor-pointer"
        >
          <span>View activity</span>
          <img
            src={Icons.iconChevronRight}
            alt="Chevron"
            className="w-4 h-4 dark:invert"
          />
        </button>
      </div>

      {/* Input box: bo tròn dạng pill, chuyển sang bo lớn khi có media */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*,video/*"
        multiple
        className="hidden"
      />

      <div
        className={`flex flex-col gap-2 bg-[#f5f5f5] dark:bg-[#1e1e1e] border border-transparent focus-within:border-gray-300 dark:focus-within:border-gray-700 px-3 py-2.5 transition-all ${
          hasMedia ? "rounded-3xl" : "rounded-full"
        }`}
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gray-300 dark:bg-gray-700 overflow-hidden shrink-0 flex items-center justify-center">
            <img
              src={currentUserAvatar || Images.imgDefaultAvatar}
              alt="Avatar"
              className="w-full h-full object-cover rounded-full"
            />
          </div>

          <input
            ref={ref}
            type="text"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={`Reply to ${targetUsername || "author"}...`}
            className="w-full bg-transparent border-none outline-none text-[15px] text-black dark:text-white dark:placeholder-[#777777]"
          />

          <div className="flex items-center gap-2.5 text-gray-400 dark:text-gray-500 shrink-0">
            <button
              type="button"
              title="Attach Image"
              disabled={media.reachedLimit}
              onClick={() => fileInputRef.current?.click()}
              className="hover:text-gray-700 dark:hover:text-gray-300 transition cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <img
                src={Icons.iconAttachMedia}
                alt="Attach Media"
                className="w-5 h-5 opacity-40 scale-90 hover:scale-100 transition-all duration-200 origin-center dark:invert"
              />
            </button>

            <button
              type="button"
              title="Attach GIF"
              className="hover:text-gray-700 dark:hover:text-gray-300 transition cursor-pointer"
            >
              <img
                src={Icons.iconAddGif}
                alt="GIF"
                className="w-5 h-5 opacity-40 scale-90 hover:scale-100 transition-all duration-200 origin-center dark:invert"
              />
            </button>

            <button
              type="button"
              title="Expand"
              className="hover:text-gray-700 dark:hover:text-gray-300 transition cursor-pointer"
            >
              <img
                src={Icons.iconExpandComposer}
                alt="Expand composer"
                className="w-5 h-5 opacity-40 scale-90 hover:scale-100 transition-all duration-200 origin-center dark:invert"
              />
            </button>

            {(content.trim() || hasMedia) && (
              <button
                type="button"
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="text-[15px] font-semibold text-black dark:text-white hover:opacity-70 transition cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Posting..." : "Post"}
              </button>
            )}
          </div>
        </div>

        {/* Preview media: cuộn ngang, canh lề theo ô nhập (avatar 8 + gap 3 = pl-11) */}
        {hasMedia && (
          <div className="flex gap-2 overflow-x-auto pl-11 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {media.items.map((item) => (
              <div
                key={item.id}
                className="relative shrink-0 rounded-xl overflow-hidden border border-gray-200 dark:border-zinc-700 bg-black/5"
              >
                {item.type === "video" ? (
                  <video
                    src={item.preview}
                    muted
                    playsInline
                    className="h-28 w-auto max-w-none object-cover"
                  />
                ) : (
                  <img
                    src={item.preview}
                    alt="Media preview"
                    className="h-28 w-auto max-w-none object-cover"
                  />
                )}
                <button
                  type="button"
                  onClick={() => media.remove(item.id)}
                  aria-label="Remove media"
                  className="absolute top-1.5 right-1.5 p-1 bg-black/60 text-white rounded-full hover:bg-black transition cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        )}

        {media.error && (
          <p className="pl-11 text-xs text-red-500">{media.error}</p>
        )}
      </div>
    </div>
  );
}

export default RepliesInput;
