import { X } from "lucide-react";
import Images from "@/assets/images";

function AvatarModal({ isOpen, imageUrl, userName, onClose }) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 dark:bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <button
        type="button"
        onClick={onClose}
        className="absolute top-6 left-6 p-2 rounded-full text-black dark:text-white hover:bg-black/10 dark:hover:bg-white/10 transition cursor-pointer"
        aria-label="Close"
      >
        <X className="w-6 h-6" />
      </button>

      <div
        onClick={(e) => e.stopPropagation()}
        className="flex items-center justify-center p-4 max-w-lg max-h-lg w-full h-full"
      >
        <img
          src={imageUrl || Images.imgDefaultAvatar}
          alt={userName || "Avatar"}
          className="w-64 h-64 sm:w-80 sm:h-80 rounded-full object-cover shadow-2xl animate-in zoom-in-95 duration-150"
        />
      </div>
    </div>
  );
}

export default AvatarModal;
