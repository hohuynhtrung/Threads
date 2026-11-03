import { useState, useEffect, useRef } from "react";
import Images from "@/assets/images";
import { useCurrentUser, useUpdateProfile } from "@/features/auth/hook";

function EditProfileModal({ isOpen, onClose }) {
  const currentUser = useCurrentUser();
  const { updateProfile, updateProfileLoading, updateProfileError } =
    useUpdateProfile();

  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    name: "",
    username: "",
    bio: "",
    is_private: false,
  });

  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState("");

  // Đồng bộ dữ liệu user hiện tại vào form mỗi khi mở modal
  useEffect(() => {
    if (currentUser) {
      setFormData({
        name: currentUser.name || "",
        username: currentUser.username || "",
        bio: currentUser.bio || "",
        is_private: Boolean(currentUser.is_private),
      });
      setAvatarPreview(currentUser.avatar_url || "");
    }
  }, [currentUser, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatarFile(file);
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();

    // Chuẩn bị FormData theo đúng định dạng API backend F8 yêu cầu (multipart/form-data kèm _method: PUT)[cite: 4]
    const data = new FormData();
    data.append("_method", "PUT");
    data.append("name", formData.name);
    data.append("username", formData.username);
    data.append("bio", formData.bio || "");
    data.append("is_private", formData.is_private ? 1 : 0);

    if (avatarFile) {
      data.append("avatar", avatarFile);
    }

    try {
      await updateProfile(data).unwrap();
      onClose();
    } catch (err) {
      console.error("Cập nhật hồ sơ thất bại:", err);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs animate-in fade-in duration-200 p-4"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-xl bg-white dark:bg-[#181818] rounded-3xl shadow-2xl border border-gray-100 dark:border-[#2d2d2d] overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-150"
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-100 dark:border-[#2d2d2d] text-center font-bold text-base text-black dark:text-white">
          Edit profile
        </div>

        {/* Content Form */}
        <div className="overflow-y-auto px-6 py-4 flex flex-col gap-6 text-left">
          {/* Name & Avatar */}
          <div className="flex items-center justify-between border-b border-gray-100 dark:border-[#2d2d2d] pb-4">
            <div className="flex flex-col flex-1 pr-4">
              <label className="font-semibold text-sm text-black dark:text-white">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="mt-1 bg-transparent text-sm text-gray-800 dark:text-gray-200 focus:outline-none"
                placeholder="Add your name..."
              />
            </div>

            {/* Hidden file input for avatar */}
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleAvatarChange}
              accept="image/*"
              className="hidden"
            />

            <div
              onClick={() => fileInputRef.current?.click()}
              className="w-14 h-14 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-800 shrink-0 cursor-pointer relative group"
            >
              <img
                src={avatarPreview || Images.imgDefaultAvatar}
                alt="Avatar"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                <span className="text-[10px] text-white font-medium">Edit</span>
              </div>
            </div>
          </div>

          {/* Username */}
          <div className="flex flex-col border-b border-gray-100 dark:border-[#2d2d2d] pb-4">
            <label className="font-semibold text-sm text-black dark:text-white">
              Username
            </label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="mt-1 bg-transparent text-sm text-gray-800 dark:text-gray-200 focus:outline-none"
              placeholder="Add username..."
            />
          </div>

          {/* Bio */}
          <div className="flex flex-col border-b border-gray-100 dark:border-[#2d2d2d] pb-4">
            <label className="font-semibold text-sm text-black dark:text-white">
              Bio
            </label>
            <textarea
              name="bio"
              rows={2}
              value={formData.bio}
              onChange={handleChange}
              className="mt-1 bg-transparent text-sm text-gray-800 dark:text-gray-200 focus:outline-none resize-none"
              placeholder="+ Write bio"
            />
          </div>

          {/* Private Profile Toggle */}
          <div className="flex items-center justify-between pb-2">
            <div className="flex flex-col">
              <span className="font-semibold text-sm text-black dark:text-white">
                Private profile
              </span>
              <span className="text-xs text-gray-400 mt-0.5">
                If enabled, only approved followers can see your posts.
              </span>
            </div>
            <div
              onClick={() =>
                setFormData((prev) => ({
                  ...prev,
                  is_private: !prev.is_private,
                }))
              }
              className={`w-12 h-7 flex items-center rounded-full p-1 cursor-pointer transition-colors ${
                formData.is_private
                  ? "bg-black dark:bg-white"
                  : "bg-gray-300 dark:bg-gray-700"
              }`}
            >
              <div
                className={`bg-white dark:bg-black w-5 h-5 rounded-full shadow-md transform transition-transform ${
                  formData.is_private ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </div>
          </div>

          {/* Hiển thị lỗi nếu có */}
          {updateProfileError && (
            <p className="text-sm text-red-500 font-medium" role="alert">
              {updateProfileError}
            </p>
          )}
        </div>

        {/* Footer với nút Done */}
        <div className="p-4 border-t border-gray-100 dark:border-[#2d2d2d] bg-white dark:bg-[#181818]">
          <button
            type="button"
            disabled={updateProfileLoading}
            onClick={handleSave}
            className="w-full py-3 bg-black dark:bg-white text-white dark:text-black font-bold rounded-2xl hover:opacity-80 transition cursor-pointer disabled:opacity-50"
          >
            {updateProfileLoading ? "Saving..." : "Done"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditProfileModal;
