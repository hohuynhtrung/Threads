import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFollowers, getFollowings } from "@/services/follow/followService";
import Images from "@/assets/images";

function FollowersModal({ isOpen, onClose, userId, initialTab = "followers" }) {
  const [activeTab, setActiveTab] = useState(initialTab);
  const [followedMap, setFollowedMap] = useState({});
  const modalRef = useRef(null);
  const dispatch = useDispatch();

  const { followers, followings, loading } = useSelector(
    (state) => state.follow,
  );

  useEffect(() => {
    if (isOpen && userId) {
      if (activeTab === "followers") {
        dispatch(getFollowers(userId));
      } else {
        dispatch(getFollowings(userId));
      }
    }
  }, [isOpen, userId, activeTab, dispatch]);

  // Xử lý khi bấm nút Follow / Follow back / Following
  const handleToggleFollow = (targetUserId) => {
    setFollowedMap((prev) => ({
      ...prev,
      [targetUserId]: !prev[targetUserId],
    }));
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const currentList = activeTab === "followers" ? followers : followings;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        ref={modalRef}
        className="w-full max-w-110 bg-white dark:bg-[#181818] rounded-3xl shadow-2xl border border-gray-100 dark:border-[#2d2d2d] overflow-hidden flex flex-col max-h-[80vh] p-2.5"
      >
        {/* Header Tabs */}
        <div className="flex border-b border-gray-100 dark:border-[#2d2d2d] relative">
          <button
            type="button"
            onClick={() => setActiveTab("followers")}
            className={`flex-1 py-4 text-center text-sm font-semibold transition cursor-pointer flex flex-col items-center gap-0.5 ${
              activeTab === "followers"
                ? "text-black dark:text-white"
                : "text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            }`}
          >
            <span>Followers</span>
            <span className="text-xs font-normal opacity-60">
              {followers.length}
            </span>
            {activeTab === "followers" && (
              <div className="absolute bottom-0 left-0 w-1/2 h-0.5 bg-black dark:bg-white transition-all duration-300" />
            )}
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("following")}
            className={`flex-1 py-4 text-center text-sm font-semibold transition cursor-pointer flex flex-col items-center gap-0.5 ${
              activeTab === "following"
                ? "text-black dark:text-white"
                : "text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            }`}
          >
            <span>Following</span>
            <span className="text-xs font-normal opacity-60">
              {followings.length}
            </span>
            {activeTab === "following" && (
              <div className="absolute bottom-0 right-0 w-1/2 h-0.5 bg-black dark:bg-white transition-all duration-300" />
            )}
          </button>
        </div>

        {/* Danh sách User */}
        <div className="overflow-y-auto p-4 flex flex-col gap-4 divide-y divide-gray-100 dark:divide-[#2d2d2d]">
          {loading ? (
            <div className="py-12 text-center text-sm text-gray-400">
              Loading...
            </div>
          ) : currentList.length === 0 ? (
            <div className="py-12 text-center text-sm text-gray-400">
              No {activeTab} yet.
            </div>
          ) : (
            currentList.map((item, index) => {
              const userItem = item.user || item;
              const isUserFollowing =
                followedMap[userItem.id] ?? activeTab === "following";

              let buttonText = isUserFollowing ? "Following" : "Follow back";
              let buttonStyle = isUserFollowing
                ? "border border-gray-300 dark:border-[#2d2d2d] hover:bg-gray-50 dark:hover:bg-[#262626] text-black dark:text-white"
                : "bg-black dark:bg-white text-white dark:text-black hover:opacity-80";

              return (
                <div
                  key={userItem.id || index}
                  className="flex items-center justify-between pt-3 first:pt-0"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-800 shrink-0">
                      <img
                        src={userItem.avatar_url || Images.imgDefaultAvatar}
                        alt={userItem.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex flex-col">
                      <span className="font-semibold text-sm text-black dark:text-[#e8eaeb] hover:underline cursor-pointer">
                        {userItem.username || userItem.name}
                      </span>
                      <span className="text-xs text-gray-400 dark:text-gray-500">
                        {userItem.name}
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleToggleFollow(userItem.id)}
                    className={`px-4 py-1.5 rounded-xl text-sm font-semibold transition cursor-pointer active:scale-[0.98] ${buttonStyle}`}
                  >
                    {buttonText}
                  </button>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}

export default FollowersModal;
