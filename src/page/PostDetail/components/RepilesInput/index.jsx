import { useState } from "react";
import {
  ArrowUpDown,
  ChevronDown,
  ChevronRight,
  Image as ImageIcon,
  Maximize2,
} from "lucide-react"; // Dùng lucide-react hoặc thay bằng SVG/Icons của dự án bạn
import Images from "@/assets/images";
import Icons from "@/assets/icons";

function RepilesInput({ targetUsername, currentUserAvatar, onSubmit }) {
  const [content, setContent] = useState("");

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
    <div className="w-full  flex flex-col gap-3 font-sans">
      <div className="flex items-center justify-between px-1 text-gray-900 dark:text-[#e8eaeb]">
        <button className="flex items-center gap-1.5 text-[15px] font-semibold hover:opacity-80 transition cursor-pointer">
          <img src={Icons.iconSort} alt="Sort" className="w-4 h-4" />
          <span>Recent</span>
          <ChevronDown className="w-4 h-4 text-gray-500 dark:text-gray-400" />
        </button>

        <button className="flex items-center gap-1 text-[14px] font-normal dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition cursor-pointer">
          <span>View activity</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      <div className="flex items-center gap-3 bg-[#f5f5f5] dark:bg-[#1e1e1e] border border-transparent focus-within:border-gray-300 dark:focus-within:border-gray-700 rounded-full px-1 py-2.5 transition-all">
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
          placeholder={`Reply to ${targetUsername}...`}
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
            className="hover:text-gray-700 dark:hover:text-gray-300 transition cursor-pointer font-bold text-[11px] border-1.5 border-current rounded px-1 py-0.5 leading-none"
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

export default RepilesInput;
