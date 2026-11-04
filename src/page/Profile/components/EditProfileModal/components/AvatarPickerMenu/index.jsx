import { useState, useRef } from "react";
import Images from "@/assets/images";

function AvatarPickerMenu({ avatarPreview, onAvatarChange, onRemoveAvatar }) {
  const [showAvatarMenu, setShowAvatarMenu] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      onAvatarChange(file);
    }
    setShowAvatarMenu(false);
  };

  const handleRemove = () => {
    onRemoveAvatar();
    setShowAvatarMenu(false);
  };

  return (
    <div className="relative">
      {/* File input ẩn */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />

      {/* Avatar Circle Button */}
      <div
        onClick={(e) => {
          e.stopPropagation();
          setShowAvatarMenu((prev) => !prev);
        }}
        className="w-14 h-14 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-800 shrink-0 cursor-pointer relative group"
      >
        <img
          src={avatarPreview || Images.imgDefaultAvatar}
          alt="Avatar"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
          <span className="text-[11px] text-white font-medium">Edit</span>
        </div>
      </div>

      {/* Dropdown Menu xổ xuống */}
      {showAvatarMenu && (
        <div
          onClick={(e) => e.stopPropagation()}
          className="absolute right-0 top-16 w-48 bg-white dark:bg-[#222222] border border-gray-200 dark:border-zinc-700 rounded-2xl shadow-xl py-2 z-20 flex flex-col"
        >
          <button
            type="button"
            onClick={() => {
              setShowAvatarMenu(false);
              fileInputRef.current?.click();
            }}
            className="px-4 py-2.5 text-left text-[14px] text-black dark:text-white hover:bg-gray-100 dark:hover:bg-zinc-700 transition cursor-pointer font-medium"
          >
            Upload picture
          </button>
          <button
            type="button"
            onClick={handleRemove}
            className="px-4 py-2.5 text-left text-[14px] text-red-500 hover:bg-gray-100 dark:hover:bg-zinc-700 transition cursor-pointer font-medium"
          >
            Remove current picture
          </button>
        </div>
      )}
    </div>
  );
}

export default AvatarPickerMenu;
