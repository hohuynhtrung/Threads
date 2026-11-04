import { useState, useEffect } from "react";
import { ChevronRight } from "lucide-react";
import { useCurrentUser, useUpdateProfile } from "@/features/auth/hook";
import EditFieldModal from "@/page/Profile/components/EditProfileModal/components/EditFieldModal";
import AvatarPickerMenu from "@/page/Profile/components/EditProfileModal/components/AvatarPickerMenu";

function EditProfileModal({ isOpen, onClose }) {
  const currentUser = useCurrentUser();
  const { updateProfile, updateProfileLoading, updateProfileError } =
    useUpdateProfile();

  const [formData, setFormData] = useState({
    name: "",
    username: "",
    bio: "",
    interests: "",
    links: "",
    podcast: "",
    show_instagram_badge: false,
    show_recent_views: false,
    is_private: false,
  });

  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState("");
  const [activeFieldModal, setActiveFieldModal] = useState(null);

  useEffect(() => {
    if (currentUser) {
      setFormData({
        name: currentUser.name || "",
        username: currentUser.username || "",
        bio: currentUser.bio || "",
        interests: currentUser.interests || "",
        links: currentUser.links || "",
        podcast: currentUser.podcast || "",
        show_instagram_badge: Boolean(currentUser.show_instagram_badge),
        show_recent_views: Boolean(currentUser.show_recent_views),
        is_private: Boolean(currentUser.is_private),
      });
      setAvatarPreview(currentUser.avatar_url || "");
    }
  }, [currentUser, isOpen]);

  if (!isOpen) return null;

  // Handler xử lý file avatar được chọn từ AvatarPickerMenu
  const handleAvatarSelect = (file) => {
    setAvatarFile(file);
    setAvatarPreview(URL.createObjectURL(file));
  };

  // Handler xoá avatar
  const handleRemoveAvatar = () => {
    setAvatarFile(null);
    setAvatarPreview("");
  };

  const handleFieldSave = (fieldName, newValue) => {
    setFormData((prev) => ({ ...prev, [fieldName]: newValue }));
  };

  const handleSaveAll = async () => {
    const data = new FormData();
    data.append("_method", "PUT");
    data.append("name", formData.name);
    data.append("username", formData.username);
    data.append("bio", formData.bio || "");
    data.append("interests", formData.interests || "");
    data.append("links", formData.links || "");
    data.append("podcast", formData.podcast || "");
    data.append("show_instagram_badge", formData.show_instagram_badge ? 1 : 0);
    data.append("show_recent_views", formData.show_recent_views ? 1 : 0);
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
    <>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs animate-in fade-in duration-200 p-4"
        onClick={onClose}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-xl bg-white dark:bg-[#181818] rounded-3xl shadow-2xl border border-gray-100 dark:border-[#2d2d2d] overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-150"
        >
          <div className="px-6 py-4 border-b border-gray-100 dark:border-[#2d2d2d] text-center font-bold text-[16px] text-black dark:text-white">
            Edit profile
          </div>

          <div className="overflow-y-auto px-6 py-4 flex flex-col gap-4 text-left">
            <div className="flex items-center justify-between border-b border-gray-100 dark:border-[#2d2d2d] pb-4">
              {/* Sửa Name */}
              <div
                onClick={() =>
                  setActiveFieldModal({
                    name: "name",
                    title: "Edit name",
                    label: "Name",
                    initialValue: formData.name,
                    placeholder: "Add your name...",
                  })
                }
                className="flex flex-col flex-1 pr-4 cursor-pointer group"
              >
                <span className="font-semibold text-[15px] text-black dark:text-white">
                  Name
                </span>
                <span className="mt-1 text-[15px] text-gray-800 dark:text-gray-200 truncate">
                  {formData.name || "Add your name..."}
                </span>
              </div>

              {/* 🔑 Component Avatar độc lập */}
              <AvatarPickerMenu
                avatarPreview={avatarPreview}
                onAvatarChange={handleAvatarSelect}
                onRemoveAvatar={handleRemoveAvatar}
              />
            </div>

            {/* 2. Username */}
            <div
              onClick={() =>
                setActiveFieldModal({
                  name: "username",
                  title: "Edit username",
                  label: "Username",
                  initialValue: formData.username,
                  placeholder: "Add username...",
                })
              }
              className="flex items-center justify-between border-b border-gray-100 dark:border-[#2d2d2d] pb-4 cursor-pointer group"
            >
              <div className="flex flex-col flex-1">
                <span className="font-semibold text-[15px] text-black dark:text-white">
                  Username
                </span>
                <span className="mt-1 text-[15px] text-gray-800 dark:text-gray-200">
                  {formData.username || "Add username..."}
                </span>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-400 group-hover:translate-x-0.5 transition-transform" />
            </div>

            {/* 3. Bio */}
            <div
              onClick={() =>
                setActiveFieldModal({
                  name: "bio",
                  title: "Edit bio",
                  label: "Bio",
                  initialValue: formData.bio,
                  placeholder: "+ Write bio",
                  isTextarea: true,
                })
              }
              className="flex items-center justify-between border-b border-gray-100 dark:border-[#2d2d2d] pb-4 cursor-pointer group"
            >
              <div className="flex flex-col flex-1 pr-4">
                <span className="font-semibold text-[15px] text-black dark:text-white">
                  Bio
                </span>
                <span className="mt-1 text-[15px] text-gray-800 dark:text-gray-200 line-clamp-2">
                  {formData.bio || "+ Write bio"}
                </span>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-400 group-hover:translate-x-0.5 transition-transform shrink-0" />
            </div>

            {/* 4. Interests */}
            <div
              onClick={() =>
                setActiveFieldModal({
                  name: "interests",
                  title: "Edit interests",
                  label: "Interests",
                  initialValue: formData.interests,
                  placeholder: "Add interests",
                })
              }
              className="flex items-center justify-between border-b border-gray-100 dark:border-[#2d2d2d] pb-4 cursor-pointer group"
            >
              <div className="flex flex-col flex-1">
                <span className="font-semibold text-[15px] text-black dark:text-white">
                  Interests
                </span>
                <span className="mt-1 text-[15px] text-gray-400">
                  {formData.interests || "Add interests"}
                </span>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-400 group-hover:translate-x-0.5 transition-transform" />
            </div>

            {/* 5. Links */}
            <div
              onClick={() =>
                setActiveFieldModal({
                  name: "links",
                  title: "Edit links",
                  label: "Links",
                  initialValue: formData.links,
                  placeholder: "Add link",
                })
              }
              className="flex items-center justify-between border-b border-gray-100 dark:border-[#2d2d2d] pb-4 cursor-pointer group"
            >
              <div className="flex flex-col flex-1">
                <span className="font-semibold text-[15px] text-black dark:text-white">
                  Links
                </span>
                <span className="mt-1 text-[15px] text-gray-400">
                  {formData.links || "Add link"}
                </span>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-400 group-hover:translate-x-0.5 transition-transform" />
            </div>

            {/* 6. Podcast */}
            <div
              onClick={() =>
                setActiveFieldModal({
                  name: "podcast",
                  title: "Edit podcast",
                  label: "Podcast",
                  initialValue: formData.podcast,
                  placeholder: "+ Link to your podcast",
                })
              }
              className="flex items-center justify-between border-b border-gray-100 dark:border-[#2d2d2d] pb-4 cursor-pointer group"
            >
              <div className="flex flex-col flex-1">
                <span className="font-semibold text-[15px] text-black dark:text-white">
                  Podcast
                </span>
                <span className="mt-1 text-[15px] text-gray-400">
                  {formData.podcast || "+ Link to your podcast"}
                </span>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-400 group-hover:translate-x-0.5 transition-transform" />
            </div>

            {/* Toggles */}
            <div className="flex items-center justify-between border-b border-gray-100 dark:border-[#2d2d2d] pb-4">
              <span className="font-semibold text-[15px] text-black dark:text-white">
                Show Instagram badge
              </span>
              <div
                onClick={() =>
                  setFormData((prev) => ({
                    ...prev,
                    show_instagram_badge: !prev.show_instagram_badge,
                  }))
                }
                className={`w-12 h-7 flex items-center rounded-full p-1 cursor-pointer transition-colors ${
                  formData.show_instagram_badge
                    ? "bg-black dark:bg-white"
                    : "bg-gray-300 dark:bg-gray-700"
                }`}
              >
                <div
                  className={`bg-white dark:bg-black w-5 h-5 rounded-full shadow-md transform transition-transform ${
                    formData.show_instagram_badge
                      ? "translate-x-5"
                      : "translate-x-0"
                  }`}
                />
              </div>
            </div>

            <div className="flex items-center justify-between border-b border-gray-100 dark:border-[#2d2d2d] pb-4">
              <div className="flex flex-col">
                <span className="font-semibold text-[15px] text-black dark:text-white">
                  Show recent views
                </span>
                <span className="text-xs text-gray-400 mt-0.5">
                  This will be public on your profile when you get 1K+ recent
                  views.
                </span>
              </div>
              <div
                onClick={() =>
                  setFormData((prev) => ({
                    ...prev,
                    show_recent_views: !prev.show_recent_views,
                  }))
                }
                className={`w-12 h-7 flex items-center rounded-full p-1 cursor-pointer transition-colors shrink-0 ml-4 ${
                  formData.show_recent_views
                    ? "bg-black dark:bg-white"
                    : "bg-gray-300 dark:bg-gray-700"
                }`}
              >
                <div
                  className={`bg-white dark:bg-black w-5 h-5 rounded-full shadow-md transform transition-transform ${
                    formData.show_recent_views
                      ? "translate-x-5"
                      : "translate-x-0"
                  }`}
                />
              </div>
            </div>

            {/* Profile Privacy */}
            <div className="flex items-center justify-between pb-2 cursor-pointer group">
              <div
                className="flex flex-col flex-1"
                onClick={() =>
                  setFormData((prev) => ({
                    ...prev,
                    is_private: !prev.is_private,
                  }))
                }
              >
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-[15px] text-black dark:text-white">
                    Profile privacy
                  </span>
                  <span className="text-[15px] text-gray-400 font-normal mr-2">
                    {formData.is_private ? "Private" : "Public"}
                  </span>
                </div>
                <span className="text-xs text-gray-400 mt-0.5 max-w-110">
                  If you switch to private, only followers can see your threads.
                  Your replies will be visible to followers and individual
                  profiles you reply to.
                </span>
              </div>
              <ChevronRight
                className="w-4 h-4 text-gray-400 group-hover:translate-x-0.5 transition-transform shrink-0"
                onClick={() =>
                  setFormData((prev) => ({
                    ...prev,
                    is_private: !prev.is_private,
                  }))
                }
              />
            </div>

            {updateProfileError && (
              <p className="text-sm text-red-500 font-medium" role="alert">
                {updateProfileError}
              </p>
            )}
          </div>

          {/* Footer Done */}
          <div className="p-4 border-t border-gray-100 dark:border-[#2d2d2d] bg-white dark:bg-[#181818]">
            <button
              type="button"
              disabled={updateProfileLoading}
              onClick={handleSaveAll}
              className="w-full py-3 bg-black dark:bg-white text-white dark:text-black font-bold rounded-2xl hover:opacity-80 transition cursor-pointer disabled:opacity-50 text-[15px]"
            >
              {updateProfileLoading ? "Saving..." : "Done"}
            </button>
          </div>
        </div>
      </div>

      <EditFieldModal
        isOpen={Boolean(activeFieldModal)}
        fieldConfig={activeFieldModal}
        onClose={() => setActiveFieldModal(null)}
        onSave={handleFieldSave}
      />
    </>
  );
}

export default EditProfileModal;
