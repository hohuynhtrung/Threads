import { useState, useRef, useEffect } from "react";
import Icons from "@/assets/icons";
import DeleteConfirmModal from "@/layouts/DefaultLayout/components/Posts/DeleteConfirmModel";
import EmbedModal from "@/layouts/DefaultLayout/components/Posts/EmbebModel";

function MorePostMenu({ post, isOwnPost = false, onDelete }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isEmbedOpen, setIsEmbedOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleToggleMenu = (e) => {
    e.stopPropagation();
    setIsOpen((prev) => !prev);
  };

  const handleCopyLink = (e) => {
    e.stopPropagation();
    setIsOpen(false);

    const postLink = `${window.location.origin}/post/${post.id}`;
    navigator.clipboard.writeText(postLink);

    setToastMessage("Đã sao chép");
    setTimeout(() => {
      setToastMessage("");
    }, 2000);
  };

  const handleOpenEmbed = (e) => {
    e.stopPropagation();
    setIsOpen(false);
    setIsEmbedOpen(true);
  };

  const handleDeleteClick = (e) => {
    e.stopPropagation();
    setIsOpen(false);
    setIsConfirmOpen(true);
  };

  const handleConfirmDelete = async (e) => {
    e.stopPropagation();
    try {
      if (onDelete) {
        await onDelete(post.id);
      }
      setIsConfirmOpen(false);
    } catch (error) {
      console.error("Xóa bài viết thất bại:", error);
    }
  };

  return (
    <>
      <div className="relative inline-block text-left" ref={menuRef}>
        <button
          type="button"
          onClick={handleToggleMenu}
          className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-[#262626] transition cursor-pointer"
          aria-label="More options"
        >
          <img
            src={Icons.iconMorePost}
            title="More"
            className="w-4 h-4 opacity-60 dark:invert"
          />
        </button>

        {/* Dropdown Menu */}
        {isOpen && (
          <div className="absolute right-0 mt-1 w-64 bg-white dark:bg-[#181818] rounded-2xl shadow-xl border border-gray-100 dark:border-[#2d2d2d] py-2 z-50 text-[14px] font-medium text-black dark:text-[#e8eaeb] animate-in fade-in zoom-in-95 duration-100">
            {isOwnPost ? (
              <>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsOpen(false);
                  }}
                  className="w-full flex items-center justify-between px-4 py-2.5 hover:bg-gray-100 dark:hover:bg-[#262626] transition cursor-pointer"
                >
                  <span>Insights</span>
                  <img
                    src={Icons.iconInsights}
                    title="Insights"
                    className="w-5 h-5"
                  />
                </button>

                <div className="h-px bg-gray-100 dark:bg-[#2d2d2d] my-1" />

                <button
                  type="button"
                  onClick={handleCopyLink}
                  className="w-full flex items-center justify-between px-4 py-2.5 hover:bg-gray-100 dark:hover:bg-[#262626] transition cursor-pointer"
                >
                  <span>Copy link</span>
                  <img
                    src={Icons.iconCopyLink}
                    title="Copy"
                    className="w-5 h-5"
                  />
                </button>

                <button
                  type="button"
                  onClick={handleOpenEmbed}
                  className="w-full flex items-center justify-between px-4 py-2.5 hover:bg-gray-100 dark:hover:bg-[#262626] transition cursor-pointer"
                >
                  <span>Get embed code</span>
                  <img
                    src={Icons.iconEmbebCode}
                    title="Embeb code"
                    className="w-5 h-5"
                  />
                </button>

                <div className="h-px bg-gray-100 dark:bg-[#2d2d2d] my-1" />

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsOpen(false);
                  }}
                  className="w-full flex items-center justify-between px-4 py-2.5 hover:bg-gray-100 dark:hover:bg-[#262626] transition cursor-pointer"
                >
                  <span>Save</span>
                  <img
                    src={Icons.iconSaved}
                    title="Saved"
                    className="w-5 h-5"
                  />
                </button>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsOpen(false);
                  }}
                  className="w-full flex items-center justify-between px-4 py-2.5 hover:bg-gray-100 dark:hover:bg-[#262626] transition cursor-pointer"
                >
                  <span>Pin to profile</span>
                  <img src={Icons.iconPin} title="Pin" className="w-5 h-5" />
                </button>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsOpen(false);
                  }}
                  className="w-full flex items-center justify-between px-4 py-2.5 hover:bg-gray-100 dark:hover:bg-[#262626] transition cursor-pointer"
                >
                  <span>Archive</span>
                  <img
                    src={Icons.iconArchive}
                    title="Archive"
                    className="w-5 h-5"
                  />
                </button>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsOpen(false);
                  }}
                  className="w-full flex items-center justify-between px-4 py-2.5 hover:bg-gray-100 dark:hover:bg-[#262626] transition cursor-pointer"
                >
                  <span>Hide like and share count</span>
                  <img
                    src={Icons.iconHideLike}
                    title="Hide"
                    className="w-5 h-5"
                  />
                </button>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsOpen(false);
                  }}
                  className="w-full flex items-center justify-between px-4 py-2.5 hover:bg-gray-100 dark:hover:bg-[#262626] transition cursor-pointer"
                >
                  <span>Reply options</span>
                  <img
                    src={Icons.iconChevronRight}
                    title="More"
                    className="w-5 h-5"
                  />
                </button>

                <div className="h-px bg-gray-100 dark:bg-[#2d2d2d] my-1" />

                <button
                  type="button"
                  onClick={handleDeleteClick}
                  className="w-full flex items-center justify-between px-4 py-2.5 text-red-500 hover:bg-gray-100 dark:hover:bg-[#262626] transition cursor-pointer"
                >
                  <span>Delete</span>
                  <img
                    src={Icons.iconDelete}
                    title="Delete"
                    className="w-5 h-5"
                  />
                </button>
              </>
            ) : (
              // --- MENU CHO BÀI VIẾT CỦA NGƯỜI KHÁC ---
              <>
                <button
                  type="button"
                  onClick={handleCopyLink}
                  className="w-full flex items-center justify-between px-4 py-2.5 hover:bg-gray-100 dark:hover:bg-[#262626] transition cursor-pointer"
                >
                  <span>Copy link</span>
                  <img
                    src={Icons.iconCopyLink}
                    title="Copy"
                    className="w-5 h-5"
                  />
                </button>

                <button
                  type="button"
                  onClick={handleOpenEmbed}
                  className="w-full flex items-center justify-between px-4 py-2.5 hover:bg-gray-100 dark:hover:bg-[#262626] transition cursor-pointer"
                >
                  <span>Get embed code</span>
                  <img
                    src={Icons.iconEmbebCode}
                    title="Embed code"
                    className="w-5 h-5"
                  />
                </button>

                <div className="h-px bg-gray-100 dark:bg-[#2d2d2d] my-1" />

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsOpen(false);
                  }}
                  className="w-full flex items-center justify-between px-4 py-2.5 hover:bg-gray-100 dark:hover:bg-[#262626] transition cursor-pointer"
                >
                  <span>Save</span>
                  <img
                    src={Icons.iconSaved}
                    title="Saved"
                    className="w-5 h-5"
                  />
                </button>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsOpen(false);
                  }}
                  className="w-full flex items-center justify-between px-4 py-2.5 hover:bg-gray-100 dark:hover:bg-[#262626] transition cursor-pointer"
                >
                  <span>Pin Ready</span>
                  <img src={Icons.iconPin} title="Pin" className="w-5 h-5" />
                </button>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsOpen(false);
                  }}
                  className="w-full flex items-center justify-between px-4 py-2.5 hover:bg-gray-100 dark:hover:bg-[#262626] transition cursor-pointer"
                >
                  <span>Hide for everyone</span>
                  <img
                    src={Icons.iconEyeHide}
                    title="Hide"
                    className="w-5 h-5"
                  />
                </button>

                <div className="h-px bg-gray-100 dark:bg-[#2d2d2d] my-1" />

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsOpen(false);
                  }}
                  className="w-full flex items-center justify-between px-4 py-2.5 hover:bg-gray-100 dark:hover:bg-[#262626] transition cursor-pointer"
                >
                  <span>Add to feed</span>
                  <img
                    src={Icons.iconChevronRight}
                    title="More"
                    className="w-5 h-5"
                  />
                </button>

                <div className="h-px bg-gray-100 dark:bg-[#2d2d2d] my-1" />

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsOpen(false);
                  }}
                  className="w-full flex items-center justify-between px-4 py-2.5 hover:bg-gray-100 dark:hover:bg-[#262626] transition cursor-pointer"
                >
                  <span>Mute</span>
                  <img src={Icons.iconMute} title="Mute" className="w-5 h-5" />
                </button>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsOpen(false);
                  }}
                  className="w-full flex items-center justify-between px-4 py-2.5 hover:bg-gray-100 dark:hover:bg-[#262626] transition cursor-pointer"
                >
                  <span>Restrict</span>
                  <img
                    src={Icons.iconRestrict}
                    title="Restrict"
                    className="w-5 h-5"
                  />
                </button>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsOpen(false);
                  }}
                  className="w-full flex items-center justify-between px-4 py-2.5 text-red-600 hover:bg-gray-100 dark:hover:bg-[#262626] transition cursor-pointer"
                >
                  <span>Block</span>
                  <img
                    src={Icons.iconBlock}
                    title="Block"
                    className="w-5 h-5"
                  />
                </button>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsOpen(false);
                  }}
                  className="w-full flex items-center justify-between px-4 py-2.5 text-red-600 hover:bg-gray-100 dark:hover:bg-[#262626] transition cursor-pointer"
                >
                  <span>Report</span>
                  <img
                    src={Icons.iconReport}
                    title="Report"
                    className="w-5 h-5"
                  />
                </button>
              </>
            )}
          </div>
        )}
      </div>

      {/* --- MODAL XÁC NHẬN XÓA --- */}
      <DeleteConfirmModal
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={handleConfirmDelete}
      />

      {/* --- MODAL EMBED CODE --- */}
      <EmbedModal
        isOpen={isEmbedOpen}
        onClose={() => setIsEmbedOpen(false)}
        post={post}
      />

      {/* --- TOAST THÔNG BÁO "ĐÃ SAO CHÉP" --- */}
      {toastMessage && (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50 bg-black dark:bg-white text-white dark:text-black px-4 py-2 rounded-xl text-sm font-semibold shadow-xl animate-in fade-in slide-in-from-bottom-4 duration-200">
          {toastMessage}
        </div>
      )}
    </>
  );
}

export default MorePostMenu;
