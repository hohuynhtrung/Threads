import { useState, useRef, useEffect } from "react";
import Images from "@/assets/images";
import Icons from "@/assets/icons";

function RepliesInput({
  targetUsername,
  currentUserAvatar,
  onSubmit,
  onSortChange, // Callback nhận giá trị "top" hoặc "recent" để component cha sort
}) {
  const [content, setContent] = useState("");
  const [sortBy, setSortBy] = useState("top"); // Mặc định chọn "top"
  const [isSortOpen, setIsSortOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Đóng dropdown khi click ra ngoài
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
    if (onSortChange) {
      onSortChange(option);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (content.trim() && onSubmit) {
        onSubmit(content);
        setContent("");
      }
    }
  };

  return (
    <div className="w-full flex flex-col gap-3 font-sans">
      {/* Top / Recent Dropdown Header */}
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

          {/* Menu xổ xuống */}
          {isSortOpen && (
            <div className="absolute left-0 top-7 w-32 bg-white dark:bg-[#1f1f1f] border border-gray-200 dark:border-zinc-700 rounded-2xl shadow-lg py-1.5 z-20 animate-in fade-in zoom-in-95 duration-150">
              <button
                type="button"
                onClick={() => handleSelectSort("top")}
                className={`w-full px-4 py-2 text-left text-[14px] transition cursor-pointer flex items-center justify-between ${
                  sortBy === "top"
                    ? "font-bold text-black dark:text-white bg-gray-50 dark:bg-zinc-800"
                    : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-zinc-800"
                }`}
              >
                <span>Top</span>
                {sortBy === "top" && <span className="text-xs">✓</span>}
              </button>
              <button
                type="button"
                onClick={() => handleSelectSort("recent")}
                className={`w-full px-4 py-2 text-left text-[14px] transition cursor-pointer flex items-center justify-between ${
                  sortBy === "recent"
                    ? "font-bold text-black dark:text-white bg-gray-50 dark:bg-zinc-800"
                    : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-zinc-800"
                }`}
              >
                <span>Recent</span>
                {sortBy === "recent" && <span className="text-xs">✓</span>}
              </button>
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

      {/* Input box */}
      <div className="flex items-center gap-3 bg-[#f5f5f5] dark:bg-[#1e1e1e] border border-transparent focus-within:border-gray-300 dark:focus-within:border-gray-700 rounded-full px-3 py-2.5 transition-all">
        <div className="w-8 h-8 rounded-full bg-gray-300 dark:bg-gray-700 overflow-hidden shrink-0 flex items-center justify-center">
          <img
            src={currentUserAvatar || Images.imgDefaultAvatar}
            alt="Avatar"
            className="w-full h-full object-cover rounded-full"
          />
        </div>

        <input
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
            className="hover:text-gray-700 dark:hover:text-gray-300 transition cursor-pointer"
            title="Attach Image"
          >
            <img
              src={Icons.iconAttachMedia}
              alt="Attach Media"
              className="w-5 h-5 opacity-40 scale-90 hover:scale-100 transition-all duration-200 cursor-pointer origin-center dark:invert"
            />
          </button>

          <button
            type="button"
            className="hover:text-gray-700 dark:hover:text-gray-300 transition cursor-pointer"
            title="Attach GIF"
          >
            <img
              src={Icons.iconAddGif}
              alt="GIF"
              className="w-5 h-5 opacity-40 scale-90 hover:scale-100 transition-all duration-200 cursor-pointer origin-center dark:invert"
            />
          </button>

          <button
            type="button"
            className="hover:text-gray-700 dark:hover:text-gray-300 transition cursor-pointer"
            title="Expand"
          >
            <img
              src={Icons.iconExpandComposer}
              alt="Expand composer"
              className="w-5 h-5 opacity-40 scale-90 hover:scale-100 transition-all duration-200 cursor-pointer origin-center dark:invert"
            />
          </button>
        </div>
      </div>
    </div>
  );
}

export default RepliesInput;
