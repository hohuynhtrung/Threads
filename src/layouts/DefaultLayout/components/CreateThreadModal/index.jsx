import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useCurrentUser } from "@/features/auth/hook";
import Images from "@/assets/images";
import Icons from "@/assets/icons";

// Gom danh sách action icon để map
const ACTION_BUTTONS = [
  { icon: Icons.iconAttachMedia, alt: "Attach Media" },
  { icon: Icons.iconAddGif, alt: "Add a gif" },
  { icon: Icons.iconAddEmoji, alt: "Add an emoji" },
  { icon: Icons.iconAddPoll, alt: "Add a poll" },
  { icon: Icons.iconAttachText, alt: "Attach text" },
  { icon: Icons.iconAddLocation, alt: "Add a location" },
  { icon: Icons.iconAddMusic, alt: "Add a music" },
];

function CreateThreadModal({ isOpen, onClose }) {
  const [content, setContent] = useState("");
  const [topic, setTopic] = useState(""); // Tách state riêng cho Topic
  const currentUser = useCurrentUser();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-155 h-69 p-0 rounded-2xl bg-white dark:bg-[#1e1e1e] border-none shadow-2xl overflow-hidden text-black dark:text-white">
        {/* HEADER */}
        <DialogHeader className="flex flex-row items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-zinc-800">
          <button
            onClick={onClose}
            className="text-sm text-black dark:text-white hover:opacity-70 transition cursor-pointer"
          >
            Cancel
          </button>

          <DialogTitle className="text-base font-bold text-center">
            New thread
          </DialogTitle>

          <div className="flex items-center gap-3">
            {[
              { src: Icons.iconDraftsPost, alt: "Drafts" },
              { src: Icons.iconMorePost, alt: "More" },
            ].map((btn) => (
              <button
                key={btn.alt}
                className="hover:opacity-70 transition cursor-pointer"
              >
                <img
                  src={btn.src}
                  alt={btn.alt}
                  className="dark:invert w-5 h-5"
                />
              </button>
            ))}
          </div>
        </DialogHeader>

        {/* BODY */}
        <div className="p-2">
          <div className="flex gap-3">
            {/* Cột Avatar & Line */}
            <div className="flex flex-col items-center gap-2">
              <div className="w-9 h-9 rounded-full bg-gray-200 dark:bg-zinc-700 overflow-hidden shrink-0">
                <img
                  src={Images.imgDefaultAvatar}
                  alt="Avatar"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="w-0.5 flex-1 bg-gray-200 dark:bg-zinc-800 my-1" />
              <div className="w-5 h-5 rounded-full bg-gray-200 dark:bg-zinc-700 overflow-hidden shrink-0">
                <img
                  src={Images.imgDefaultAvatar}
                  alt="Avatar mini"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Cột Nội dung chính */}
            <div className="flex-1 flex flex-col gap-1">
              {/* User info & Topic Input */}
              <div className="flex items-center gap-1.5 text-[16px] font-semibold">
                <span>{currentUser?.name}</span>
                <span className="text-gray-400 font-normal">&gt;</span>
                <input
                  type="text"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="Community or topic"
                  className="w-full bg-transparent text-[16px] border-none outline-none placeholder-gray-400 dark:placeholder-zinc-500 focus:ring-0 p-0 font-normal"
                />
              </div>

              {/* Textarea Nội dung */}
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="What's new?"
                className="w-full h-6 bg-transparent text-[16px] border-none outline-none resize-none placeholder-gray-400 dark:placeholder-zinc-500 focus:ring-0 p-0"
              />

              {/* Action Icons */}
              <div className="flex items-center gap-3 py-2 text-gray-400 dark:text-zinc-500">
                {ACTION_BUTTONS.map((btn) => (
                  <button
                    key={btn.alt}
                    className="hover:text-black dark:hover:text-white transition cursor-pointer"
                  >
                    <img
                      src={btn.icon}
                      alt={btn.alt}
                      className="dark:invert w-5 h-5"
                    />
                  </button>
                ))}
              </div>

              {/* Add to thread label */}
              <div className="w-23.75 pt-2 text-sm text-gray-300 dark:text-zinc-500 cursor-not-allowed">
                Add to thread
              </div>
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100 dark:border-zinc-800">
          <button className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition cursor-pointer">
            <img
              src={Icons.iconAddOption}
              alt="Option"
              className="dark:invert w-5 h-5"
            />
            <span>Post Options</span>
          </button>

          <button
            disabled={!content.trim()}
            className="px-5 py-2 bg-black dark:bg-white text-white dark:text-black font-semibold text-sm rounded-full disabled:opacity-30 disabled:cursor-not-allowed hover:opacity-90 transition"
          >
            Post
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default CreateThreadModal;
