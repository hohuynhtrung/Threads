import { useState, useEffect, useRef } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { usePosts } from "@/features/post/hook";
import { useCurrentUser } from "@/features/auth/hook";

import Images from "@/assets/images";
import Icons from "@/assets/icons";

function EditPostModal({ isOpen, onClose, post }) {
  const [content, setContent] = useState("");
  const [topic, setTopic] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const textareaRef = useRef(null);

  const { updatePost } = usePosts();
  const currentUser = useCurrentUser();

  // Khởi tạo dữ liệu khi mở modal
  useEffect(() => {
    if (!isOpen || !post) return;

    setContent(post.content || "");
    setTopic(post.topic_name || "");

    const frameId = requestAnimationFrame(() => {
      const textarea = textareaRef.current;
      if (!textarea) return;
      const textLength = textarea.value.length;
      textarea.focus();
      textarea.setSelectionRange(textLength, textLength);
    });

    return () => cancelAnimationFrame(frameId);
  }, [isOpen, post]);

  // Cập nhật bài viết
  const handleUpdate = async () => {
    const trimmedContent = content.trim();

    if (!post?.id || !trimmedContent || isSubmitting) return;

    try {
      setIsSubmitting(true);

      await updatePost(post.id, trimmedContent).unwrap();

      onClose();
    } catch (error) {
      console.error("Cập nhật bài viết thất bại:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const isSubmitDisabled = !content.trim() || isSubmitting;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        onClick={(event) => event.stopPropagation()}
        className="w-155 max-w-[90vw] p-0 rounded-2xl bg-white dark:bg-[#1e1e1e] border-none shadow-2xl overflow-hidden text-black dark:text-white flex flex-col"
      >
        <DialogHeader className="flex flex-row items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-zinc-800 shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="text-sm hover:opacity-75 transition cursor-pointer"
          >
            Cancel
          </button>

          <DialogTitle className="text-base font-bold">Edit post</DialogTitle>

          <button
            type="button"
            aria-label="More options"
            className="hover:opacity-75 transition cursor-pointer"
          >
            <img
              src={Icons.iconMorePost}
              alt=""
              className="w-5 h-5 dark:invert"
            />
          </button>
        </DialogHeader>

        <div className="p-6 flex gap-3">
          <div className="w-9 h-9 rounded-full bg-gray-200 dark:bg-zinc-700 overflow-hidden shrink-0">
            <img
              src={currentUser?.avatar_url || Images.imgDefaultAvatar}
              alt="Avatar"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex-1 flex flex-col gap-1">
            <div className="flex items-center gap-1.5 text-[15px] font-semibold">
              <span>{currentUser?.username || currentUser?.name}</span>

              <span className="text-gray-400 font-normal">&gt;</span>

              <input
                type="text"
                value={topic}
                onChange={(event) => setTopic(event.target.value)}
                placeholder="Community or topic"
                className="w-full bg-transparent text-[15px] border-none outline-none placeholder-gray-400 dark:placeholder-zinc-500 focus:ring-0 p-0 font-normal"
              />
            </div>

            <textarea
              ref={textareaRef}
              value={content}
              onChange={(event) => setContent(event.target.value)}
              rows={4}
              placeholder="What's new?"
              className="w-full bg-transparent text-[15px] border-none outline-none resize-none placeholder-gray-400 focus:ring-0 p-0 mt-1 leading-normal"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100 dark:border-zinc-800 shrink-0 bg-white dark:bg-[#1e1e1e]">
          <button
            type="button"
            className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition cursor-pointer"
          >
            <img
              src={Icons.iconAddOption}
              alt=""
              className="dark:invert w-4 h-4"
            />

            <span>Reply options</span>
          </button>

          <button
            type="button"
            disabled={isSubmitDisabled}
            onClick={handleUpdate}
            className="px-5 py-2 bg-black dark:bg-white text-white dark:text-black font-semibold text-sm rounded-full disabled:opacity-30 disabled:cursor-not-allowed hover:opacity-90 transition cursor-pointer"
          >
            {isSubmitting ? "Saving..." : "Done"}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default EditPostModal;
