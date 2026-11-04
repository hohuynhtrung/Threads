import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { Plus, Trash2, X } from "lucide-react";

import { createPost } from "@/services/post/postService";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useCurrentUser } from "@/features/auth/hook";
import Images from "@/assets/images";
import Icons from "@/assets/icons";

const MAX_MEDIA = 10;

function CreateThreadModal({ isOpen, onClose }) {
  const [content, setContent] = useState("");
  const [topic, setTopic] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  // Mỗi phần tử: { id, file, preview, type: "image" | "video" }
  const [mediaItems, setMediaItems] = useState([]);
  const [mediaError, setMediaError] = useState("");

  const [showPoll, setShowPoll] = useState(false);
  const [pollOptions, setPollOptions] = useState(["", ""]);
  const [location, setLocation] = useState("");
  const [showLocationInput, setShowLocationInput] = useState(false);

  const fileInputRef = useRef(null);
  const textareaRef = useRef(null);
  const mediaRef = useRef([]);
  const dispatch = useDispatch();
  const currentUser = useCurrentUser();

  // Giữ bản mới nhất để dọn object URL khi component unmount
  mediaRef.current = mediaItems;
  useEffect(() => {
    return () => {
      mediaRef.current.forEach((item) => URL.revokeObjectURL(item.preview));
    };
  }, []);

  const isMulti = mediaItems.length > 1;
  const reachedLimit = mediaItems.length >= MAX_MEDIA;
  const canSubmit = (content.trim() || mediaItems.length > 0) && !isSubmitting;

  const handleContentChange = (e) => {
    setContent(e.target.value);
    e.target.style.height = "auto";
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files || []);
    e.target.value = ""; // cho phép chọn lại cùng 1 file
    if (files.length === 0) return;

    const remaining = Math.max(MAX_MEDIA - mediaItems.length, 0);
    const accepted = files.slice(0, remaining);

    setMediaError(
      files.length > accepted.length
        ? `Bạn chỉ có thể đính kèm tối đa ${MAX_MEDIA} tệp.`
        : "",
    );

    const newItems = accepted.map((file) => ({
      id: crypto.randomUUID(),
      file,
      preview: URL.createObjectURL(file),
      type: file.type.startsWith("video/") ? "video" : "image",
    }));

    setMediaItems((prev) => [...prev, ...newItems]);
  };

  const handleRemoveMedia = (id) => {
    const target = mediaItems.find((item) => item.id === id);
    if (target) URL.revokeObjectURL(target.preview);
    setMediaItems((prev) => prev.filter((item) => item.id !== id));
    setMediaError("");
  };

  const handleAddPollOption = () => {
    if (pollOptions.length < 4) setPollOptions([...pollOptions, ""]);
  };

  const handlePollOptionChange = (index, value) => {
    const next = [...pollOptions];
    next[index] = value;
    setPollOptions(next);
  };

  const resetForm = () => {
    mediaItems.forEach((item) => URL.revokeObjectURL(item.preview));
    setContent("");
    setTopic("");
    setMediaItems([]);
    setMediaError("");
    setSubmitError("");
    setShowPoll(false);
    setPollOptions(["", ""]);
    setLocation("");
    setShowLocationInput(false);
    if (textareaRef.current) textareaRef.current.style.height = "auto";
  };

  const handleClose = () => {
    if (isSubmitting) return;
    resetForm();
    onClose();
  };

  const handlePostSubmit = async () => {
    if (!canSubmit) return;

    try {
      setIsSubmitting(true);
      setSubmitError("");

      const formData = new FormData();
      formData.append("content", content.trim());
      formData.append("reply_permission", "everyone");
      if (topic.trim()) formData.append("topic", topic.trim());

      // Nhiều file: append lặp lại cùng key "media[]"
      mediaItems.forEach((item) => formData.append("media[]", item.file));

      await dispatch(createPost(formData)).unwrap();

      resetForm();
      onClose();
    } catch (err) {
      setSubmitError(
        typeof err === "string" ? err : "Đăng bài thất bại, vui lòng thử lại.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleActionClick = (alt) => {
    switch (alt) {
      case "Attach Media":
        if (!reachedLimit) fileInputRef.current?.click();
        break;
      case "Add a poll":
        setShowPoll((prev) => !prev);
        break;
      case "Add a location":
        setShowLocationInput((prev) => !prev);
        break;
      case "Add an emoji":
        setContent((prev) => prev + " 😊");
        break;
      default:
        break;
    }
  };

  const ACTION_BUTTONS = [
    { icon: Icons.iconAttachMedia, alt: "Attach Media" },
    { icon: Icons.iconAddGif, alt: "Add a gif" },
    { icon: Icons.iconAddEmoji, alt: "Add an emoji" },
    { icon: Icons.iconAddPoll, alt: "Add a poll" },
    { icon: Icons.iconAttachText, alt: "Attach text" },
    { icon: Icons.iconAddLocation, alt: "Add a location" },
    { icon: Icons.iconAddMusic, alt: "Add a music" },
  ];

  const mediaClass = isMulti
    ? "h-56 w-auto max-w-none"
    : "max-h-80 w-auto max-w-full";

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
      <DialogContent className="w-155 max-w-[90vw] min-h-69 max-h-[85vh] p-0 rounded-2xl bg-white dark:bg-[#1e1e1e] border-none shadow-2xl overflow-hidden text-black dark:text-white flex flex-col">
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*,video/*"
          multiple
          className="hidden"
        />

        {/* Header */}
        <DialogHeader className="flex flex-row items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-zinc-800 shrink-0">
          <button
            type="button"
            onClick={handleClose}
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
                type="button"
                className="hover:opacity-70 transition cursor-pointer"
              >
                <img
                  src={btn.src}
                  title={btn.alt}
                  className="dark:invert w-5 h-5"
                />
              </button>
            ))}
          </div>
        </DialogHeader>

        {/* Body */}
        <div className="p-4 flex-1 overflow-y-auto">
          <div className="flex gap-3">
            {/* Cột avatar + đường nối thread */}
            <div className="flex flex-col items-center gap-2">
              <div className="w-9 h-9 rounded-full bg-gray-200 dark:bg-zinc-700 overflow-hidden shrink-0">
                <img
                  src={currentUser?.avatar_url || Images.imgDefaultAvatar}
                  alt="Avatar"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="w-0.5 flex-1 bg-gray-200 dark:bg-zinc-800 my-1" />
              <div className="w-5 h-5 rounded-full bg-gray-200 dark:bg-zinc-700 overflow-hidden shrink-0 opacity-60">
                <img
                  src={currentUser?.avatar_url || Images.imgDefaultAvatar}
                  alt="Avatar mini"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* min-w-0 để dải ảnh cuộn ngang không làm vỡ layout modal */}
            <div className="flex-1 min-w-0 flex flex-col gap-1">
              <div className="flex items-center gap-1.5 text-[15px]">
                <span className="font-semibold shrink-0">
                  {currentUser?.username || currentUser?.name}
                </span>
                <span className="text-gray-400">&gt;</span>
                <input
                  type="text"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="Add a topic"
                  className="flex-1 min-w-0 bg-transparent border-none outline-none placeholder-gray-400 dark:placeholder-zinc-500 focus:ring-0 p-0"
                />
              </div>

              <textarea
                ref={textareaRef}
                value={content}
                onChange={handleContentChange}
                placeholder="What's new?"
                rows={1}
                className="w-full min-h-6 max-h-62.5 bg-transparent text-[15px] border-none outline-none resize-none placeholder-gray-400 dark:placeholder-zinc-500 focus:ring-0 p-0 overflow-y-auto leading-normal"
              />

              {/* Dải media: cuộn ngang khi có nhiều ảnh/video */}
              {mediaItems.length > 0 && (
                <div className="mt-2">
                  <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none [&::-webkit-scrollbar]:hidden">
                    {mediaItems.map((item) => (
                      <div
                        key={item.id}
                        className="relative shrink-0 max-w-full rounded-xl overflow-hidden border border-gray-200 dark:border-zinc-700 bg-black/5"
                      >
                        {item.type === "video" ? (
                          <video
                            src={item.preview}
                            className={`${mediaClass} object-cover`}
                            muted
                            playsInline
                          />
                        ) : (
                          <img
                            src={item.preview}
                            alt="Media preview"
                            className={`${mediaClass} object-cover`}
                          />
                        )}

                        <button
                          type="button"
                          onClick={() => handleRemoveMedia(item.id)}
                          aria-label="Remove media"
                          className="absolute top-2 right-2 p-1 bg-black/60 text-white rounded-full hover:bg-black transition cursor-pointer"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>

                  {mediaError && (
                    <p className="mt-1 text-xs text-red-500">{mediaError}</p>
                  )}
                </div>
              )}

              {/* Poll */}
              {showPoll && (
                <div className="mt-3 p-3 border border-gray-200 dark:border-zinc-700 rounded-xl flex flex-col gap-2 bg-gray-50 dark:bg-zinc-900">
                  <span className="text-xs font-semibold text-gray-500">
                    Create a poll
                  </span>
                  {pollOptions.map((opt, idx) => (
                    <input
                      key={idx}
                      type="text"
                      value={opt}
                      onChange={(e) =>
                        handlePollOptionChange(idx, e.target.value)
                      }
                      placeholder={`Option ${idx + 1}`}
                      className="w-full bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-lg px-3 py-1.5 text-sm outline-none"
                    />
                  ))}
                  {pollOptions.length < 4 && (
                    <button
                      type="button"
                      onClick={handleAddPollOption}
                      className="text-xs font-semibold text-blue-500 hover:underline flex items-center gap-1 mt-1 cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" /> Add option
                    </button>
                  )}
                </div>
              )}

              {/* Location */}
              {showLocationInput && (
                <div className="mt-2 flex items-center gap-2">
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Add location..."
                    className="w-full bg-gray-100 dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-lg px-3 py-1.5 text-sm outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setLocation("");
                      setShowLocationInput(false);
                    }}
                    className="text-gray-400 hover:text-red-500 cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              )}

              {/* Hàng icon hành động */}
              <div className="flex items-center gap-4 py-2 text-gray-400 dark:text-zinc-500">
                {ACTION_BUTTONS.map((btn) => {
                  const disabled = btn.alt === "Attach Media" && reachedLimit;
                  return (
                    <button
                      key={btn.alt}
                      type="button"
                      disabled={disabled}
                      onClick={() => handleActionClick(btn.alt)}
                      className="opacity-60 hover:opacity-100 transition cursor-pointer disabled:opacity-20 disabled:cursor-not-allowed"
                    >
                      <img
                        src={btn.icon}
                        title={btn.alt}
                        className="dark:invert w-5 h-5"
                      />
                    </button>
                  );
                })}
              </div>

              <div className="text-sm text-gray-300 dark:text-zinc-600 cursor-not-allowed select-none">
                Add to thread
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between gap-4 px-6 py-4 border-t border-gray-100 dark:border-zinc-800 shrink-0">
          <div className="min-w-0">
            {submitError ? (
              <p className="text-sm text-red-500 truncate">{submitError}</p>
            ) : (
              <span className="text-sm text-gray-400 dark:text-zinc-500">
                Anyone can reply &amp; quote
              </span>
            )}
          </div>

          <button
            type="button"
            onClick={handlePostSubmit}
            disabled={!canSubmit}
            className="px-5 py-2 bg-black dark:bg-white text-white dark:text-black font-semibold text-sm rounded-full disabled:opacity-30 disabled:cursor-not-allowed hover:opacity-90 transition cursor-pointer shrink-0"
          >
            {isSubmitting ? "Posting..." : "Post"}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default CreateThreadModal;
