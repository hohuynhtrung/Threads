import { useState, useRef } from "react";
import { useDispatch } from "react-redux";
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
import { X, Plus, Trash2 } from "lucide-react";

function CreateThreadModal({ isOpen, onClose }) {
  const [content, setContent] = useState("");
  const [topic, setTopic] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 🔑 Thêm state quản lý các tính năng mở rộng
  const [selectedMedia, setSelectedMedia] = useState(null); // Lưu file ảnh/video đính kèm
  const [mediaPreview, setMediaPreview] = useState("");
  const [showPoll, setShowPoll] = useState(false); // Trạng thái bật khung tạo Poll
  const [pollOptions, setPollOptions] = useState(["", ""]); // Các lựa chọn trong poll
  const [location, setLocation] = useState(""); // Địa điểm
  const [showLocationInput, setShowLocationInput] = useState(false);

  const fileInputRef = useRef(null);
  const dispatch = useDispatch();
  const currentUser = useCurrentUser();

  const handleContentChange = (e) => {
    const value = e.target.value;
    setContent(value);
    e.target.style.height = "auto";
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

  // Xử lý chọn Media (Ảnh/Video)
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedMedia(file);
      setMediaPreview(URL.createObjectURL(file));
    }
  };

  // Xử lý thêm ô lựa chọn cho Poll
  const handleAddPollOption = () => {
    if (pollOptions.length < 4) {
      setPollOptions([...pollOptions, ""]);
    }
  };

  const handlePollOptionChange = (index, value) => {
    const newOptions = [...pollOptions];
    newOptions[index] = value;
    setPollOptions(newOptions);
  };

  const handlePostSubmit = async () => {
    if ((!content.trim() && !selectedMedia) || isSubmitting) return;

    try {
      setIsSubmitting(true);
      const formData = new FormData();
      formData.append("content", content.trim());
      formData.append("reply_permission", "everyone");
      if (topic.trim()) formData.append("topic", topic.trim());
      if (selectedMedia) formData.append("media", selectedMedia);
      if (location.trim()) formData.append("location", location.trim());
      if (showPoll) {
        formData.append(
          "poll_options",
          JSON.stringify(pollOptions.filter(Boolean)),
        );
      }

      await dispatch(createPost(formData)).unwrap();

      // Reset state sau khi post thành công
      setContent("");
      setTopic("");
      setSelectedMedia(null);
      setMediaPreview("");
      setShowPoll(false);
      setPollOptions(["", ""]);
      setLocation("");
      setShowLocationInput(false);
      onClose();
    } catch (err) {
      console.error("Lỗi tạo bài viết:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  // 🔑 Định nghĩa hành động khi bấm vào từng Action Button
  const handleActionClick = (alt) => {
    switch (alt) {
      case "Attach Media":
        fileInputRef.current?.click();
        break;
      case "Add a poll":
        setShowPoll((prev) => !prev);
        break;
      case "Add a location":
        setShowLocationInput((prev) => !prev);
        break;
      case "Add a gif":
        alert("Tính năng chọn GIF đang được phát triển!");
        break;
      case "Add an emoji":
        setContent((prev) => prev + " 😊"); // Chèn nhanh emoji mẫu vào cuối nội dung
        break;
      case "Attach text":
        alert("Tính năng định dạng văn bản nâng cao!");
        break;
      case "Add a music":
        alert("Tính năng gắn nhạc đang phát triển!");
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

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-155 max-w-[90vw] min-h-69 max-h-[85vh] p-0 rounded-2xl bg-white dark:bg-[#1e1e1e] border-none shadow-2xl overflow-y-auto text-black dark:text-white flex flex-col justify-between">
        {/* Hidden File Input cho Media */}
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*,video/*"
          className="hidden"
        />

        <DialogHeader className="flex flex-row items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-zinc-800 shrink-0">
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
                  title={btn.alt}
                  className="dark:invert w-5 h-5"
                />
              </button>
            ))}
          </div>
        </DialogHeader>

        <div className="p-4 flex-1 overflow-y-auto">
          <div className="flex gap-3">
            <div className="flex flex-col items-center gap-2">
              <div className="w-9 h-9 rounded-full bg-gray-200 dark:bg-zinc-700 overflow-hidden shrink-0">
                <img
                  src={currentUser?.avatar_url || Images.imgDefaultAvatar}
                  title="Avatar"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="w-0.5 flex-1 bg-gray-200 dark:bg-zinc-800 my-1" />
              <div className="w-5 h-5 rounded-full bg-gray-200 dark:bg-zinc-700 overflow-hidden shrink-0">
                <img
                  src={currentUser?.avatar_url || Images.imgDefaultAvatar}
                  title="Avatar mini"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="flex-1 flex flex-col gap-1">
              <div className="flex items-center gap-1.5 text-[16px] font-semibold">
                <span>{currentUser?.name || currentUser?.username}</span>
                <span className="text-gray-400 font-normal">&gt;</span>
                <input
                  type="text"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="Community or topic"
                  className="w-full bg-transparent text-[16px] border-none outline-none placeholder-gray-400 dark:placeholder-zinc-500 focus:ring-0 p-0 font-normal"
                />
              </div>

              {/* Textarea nhập nội dung */}
              <textarea
                value={content}
                onChange={handleContentChange}
                placeholder="What's new?"
                rows={1}
                className="w-full min-h-6 max-h-62.5 bg-transparent text-[16px] border-none outline-none resize-none placeholder-gray-400 dark:placeholder-zinc-500 focus:ring-0 p-0 overflow-y-auto leading-normal"
              />

              {/* 🔑 Khu vực hiển thị Ảnh/Video Preview */}
              {mediaPreview && (
                <div className="relative mt-2 w-full max-h-60 rounded-xl overflow-hidden border border-gray-200 dark:border-zinc-700">
                  <img
                    src={mediaPreview}
                    alt="Media preview"
                    className="w-full h-full object-cover max-h-60"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedMedia(null);
                      setMediaPreview("");
                    }}
                    className="absolute top-2 right-2 p-1 bg-black/60 text-white rounded-full hover:bg-black transition cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}

              {/* 🔑 Khu vực hiển thị Poll (Bình chọn) */}
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

              {/* 🔑 Khu vực nhập Location */}
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
                    className="text-gray-400 hover:text-red-500"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              )}

              {/* Danh sách Action Buttons */}
              <div className="flex items-center gap-3 py-2 text-gray-400 dark:text-zinc-500">
                {ACTION_BUTTONS.map((btn) => (
                  <button
                    key={btn.alt}
                    type="button"
                    onClick={() => handleActionClick(btn.alt)}
                    className="hover:text-black dark:hover:text-white transition cursor-pointer"
                  >
                    <img
                      src={btn.icon}
                      title={btn.alt}
                      className="dark:invert w-5 h-5"
                    />
                  </button>
                ))}
              </div>

              <div className="w-23.75 pt-2 text-sm text-gray-300 dark:text-zinc-500 cursor-not-allowed">
                Add to thread
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100 dark:border-zinc-800 shrink-0">
          <button className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition cursor-pointer">
            <img
              src={Icons.iconAddOption}
              title="Option"
              className="dark:invert w-5 h-5"
            />
            <span>Post Options</span>
          </button>

          <button
            type="button"
            onClick={handlePostSubmit}
            disabled={(!content.trim() && !selectedMedia) || isSubmitting}
            className="px-5 py-2 bg-black dark:bg-white text-white dark:text-black font-semibold text-sm rounded-full disabled:opacity-30 disabled:cursor-not-allowed hover:opacity-90 transition cursor-pointer"
          >
            {isSubmitting ? "Posting..." : "Post"}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default CreateThreadModal;
