import Icons from "@/assets/icons";
import { formatCount } from "@/layouts/DefaultLayout/helper/formatCount";
import { usePosts } from "@/features/post/hook";
import { useCurrentUser } from "@/features/auth/hook";
import RequireLoginModal from "@/layouts/DefaultLayout/components/RequireLoginModel";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function PostActions({ post, onCommentClick }) {
  const { likePost, repostPost } = usePosts();
  const currentUser = useCurrentUser();
  const navigate = useNavigate();
  const isLoggedIn = Boolean(currentUser);

  const [isOpenRequireLogin, setIsOpenRequireLogin] = useState(false);
  const [showRepostMenu, setShowRepostMenu] = useState(false);
  const repostMenuRef = useRef(null);

  const isPostLike = Boolean(post.is_liked_by_auth);
  const isReposted = Boolean(post.is_reposted_by_auth);

  useEffect(() => {
    if (!showRepostMenu) return;
    const closeOnOutsideClick = (e) => {
      if (repostMenuRef.current && !repostMenuRef.current.contains(e.target)) {
        setShowRepostMenu(false);
      }
    };
    document.addEventListener("mousedown", closeOnOutsideClick);
    return () => document.removeEventListener("mousedown", closeOnOutsideClick);
  }, [showRepostMenu]);

  const handleActionClick = (e, callback) => {
    e.stopPropagation();
    if (!isLoggedIn) {
      setIsOpenRequireLogin(true);
      return;
    }
    if (callback) callback();
  };

  const handleShare = async () => {
    const url = `${window.location.origin}/post/${post.id}`;
    try {
      await navigator.clipboard.writeText(url);
      console.log("Đã copy link:", url);
    } catch {
      console.error("Không thể copy link");
    }
  };

  // 1 hàm duy nhất cho cả repost lẫn remove — toggle
  const handleRepost = async () => {
    await repostPost(post.id);
    setShowRepostMenu(false);
  };

  const actions = [
    {
      id: "like",
      label: "Like",
      icon: isPostLike ? Icons.iconLikedPost : Icons.iconLikePost,
      count: post.likes_count,
      isLiked: isPostLike,
      onClick: (e) => handleActionClick(e, () => likePost(post.id)),
    },
    {
      id: "comment",
      label: "Comment",
      icon: Icons.iconCommentPost,
      count: post.replies_count,
      onClick: (e) =>
        handleActionClick(e, () => {
          if (onCommentClick) {
            onCommentClick();
          } else {
            navigate(`/post/${post.id}`, { state: { focusReply: true } });
          }
        }),
    },
    {
      id: "repost",
      label: "Repost",
      icon: Icons.iconRepostPost,
      count: post.reposts_and_quotes_count,
      isReposted,
      onClick: (e) => handleActionClick(e, () => setShowRepostMenu((v) => !v)),
    },
    {
      id: "share",
      label: "Share",
      icon: Icons.iconSharePost,
      count: post.shares_count,
      onClick: (e) => handleActionClick(e, handleShare),
    },
  ];

  return (
    <div className="flex items-center gap-5 pt-2 text-[#4d4d4d] dark:text-[#cccccc]">
      {actions.map((action) => (
        <div
          key={action.id}
          className="relative"
          ref={action.id === "repost" ? repostMenuRef : null}
        >
          <button
            onClick={action.onClick}
            className={`flex items-center p-2 rounded-2xl gap-1.5 text-sm font-normal transition-colors active:scale-95 cursor-pointer hover:bg-gray-100 dark:hover:bg-[#2d2d2d] ${
              action.isLiked
                ? "text-red-500"
                : action.id === "repost" && action.isReposted
                  ? "text-gray-500-500"
                  : "text-gray-500 hover:text-black dark:hover:text-white"
            }`}
          >
            <img
              src={action.icon}
              alt={action.label}
              className={`w-5 h-5 object-contain ${
                action.isLiked || (action.id === "repost" && action.isReposted)
                  ? ""
                  : "dark:invert"
              }`}
            />
            <span>{formatCount(action.count)}</span>
          </button>

          {/* Dropdown repost */}
          {action.id === "repost" && showRepostMenu && (
            <div
              onClick={(e) => e.stopPropagation()}
              className="absolute left-0 top-full mt-1 w-44 bg-white dark:bg-[#1e1e1e] border border-[#00000026] dark:border-[#2d2d2d] rounded-xl shadow-lg z-10 py-1"
            >
              {isReposted ? (
                <button
                  className="w-full text-left px-4 py-2 text-sm font-medium text-red-500 hover:bg-gray-100 dark:hover:bg-[#2d2d2d]"
                  onClick={handleRepost}
                >
                  Remove
                </button>
              ) : (
                <button
                  className="w-full text-left px-4 py-2 text-sm font-medium hover:bg-gray-100 dark:hover:bg-[#2d2d2d]"
                  onClick={handleRepost}
                >
                  Repost
                </button>
              )}
              <button
                className="w-full text-left px-4 py-2 text-sm font-medium hover:bg-gray-100 dark:hover:bg-[#2d2d2d]"
                onClick={() => {
                  // TODO: mở composer quote
                  setShowRepostMenu(false);
                }}
              >
                Quote
              </button>
            </div>
          )}
        </div>
      ))}

      <RequireLoginModal
        isOpen={isOpenRequireLogin}
        onClose={() => setIsOpenRequireLogin(false)}
      />
    </div>
  );
}

export default PostActions;
