import { useEffect } from "react";
import { Link } from "react-router";

import Icons from "@/assets/icons";
import Images from "@/assets/images";
import { useFetchFollowers, useUserFollow } from "@/features/follow/hook";

function ProfileInfo({ user, isOwnProfile = false }) {
  if (!user) return null;

  const userId = user.id;
  const { followersCount, loading } = useFetchFollowers(userId);
  const { isFollowing, toggleFollow, initFollowStatus, followError } =
    useUserFollow(userId);

  useEffect(() => {
    const followStatus = user?.is_followed_by_auth;
    if (typeof followStatus === "boolean") {
      initFollowStatus(followStatus);
    }
  }, [user?.id, user?.is_followed_by_auth, initFollowStatus]);

  return (
    <div className="p-4">
      <div className="flex items-start justify-between w-full">
        <div className="flex flex-col gap-1">
          <h1 className="font-bold text-[26px] tracking-tight">{user.name}</h1>
          <span className="text-[15px] font-normal">{user.username}</span>
        </div>

        <div className="w-20 h-20 rounded-full overflow-hidden bg-[#e0e0e0] dark:bg-[#262626] flex items-center justify-center shrink-0">
          {user.avatar_url ? (
            <img
              src={user.avatar_url}
              alt={user.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <img
              src={Images.imgDefaultAvatar}
              alt="Default Avatar"
              className="w-full h-full object-cover"
            />
          )}
        </div>
      </div>

      {user.bio && (
        <p className="mt-3 text-sm text-gray-800 dark:text-gray-200 whitespace-pre-line">
          {user.bio}
        </p>
      )}

      <div className="flex items-center justify-between mt-4">
        <span className="text-sm font-medium opacity-40 hover:underline cursor-pointer">
          {loading
            ? "..."
            : `${followersCount} ${followersCount > 1 ? "followers" : "follower"}`}
        </span>

        {isOwnProfile ? (
          <div className="flex items-center gap-3">
            <button className="hover:opacity-70 transition cursor-pointer">
              <img
                src={Icons.iconInsights}
                alt="Insights"
                title="Insights"
                className="w-5 h-5 dark:invert"
              />
            </button>
            <button className="hover:opacity-70 transition cursor-pointer">
              <img
                src={Icons.iconInstagram}
                alt="Instagram"
                title="Instagram"
                className="w-5 h-5 dark:invert"
              />
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <button className="hover:opacity-70 transition cursor-pointer">
              <img src={Icons.iconNotifyBell} className="w-5 h-5 dark:invert" />
            </button>
            <button className="hover:opacity-70 transition cursor-pointer">
              <img
                src={Icons.iconMorePost}
                alt="More"
                title="More"
                className="w-5 h-5 dark:invert"
              />
            </button>
          </div>
        )}
      </div>

      {isOwnProfile ? (
        <div className="flex w-full gap-2.5">
          <Link className="w-full flex justify-center mt-4 py-2 border border-gray-300 dark:border-[#2d2d2d] rounded-xl font-semibold text-sm hover:bg-gray-50 dark:hover:bg-[#1e1e1e] active:scale-[0.99] transition cursor-pointer">
            Edit profile
          </Link>
          <Link
            to="/insights"
            className="w-full flex justify-center mt-4 py-2 border border-gray-300 dark:border-[#2d2d2d] rounded-xl font-semibold text-sm hover:bg-gray-50 dark:hover:bg-[#1e1e1e] active:scale-[0.99] transition cursor-pointer"
          >
            View insights
          </Link>
        </div>
      ) : (
        <div className="flex w-full gap-2.5">
          <button
            onClick={toggleFollow}
            className={`w-full flex justify-center mt-4 py-2 rounded-xl font-semibold text-sm active:scale-[0.99] transition cursor-pointer ${
              isFollowing
                ? "border border-gray-300 dark:border-[#2d2d2d] hover:bg-gray-50 dark:hover:bg-[#1e1e1e]"
                : "bg-black dark:bg-white text-white dark:text-black hover:opacity-80"
            }`}
          >
            {isFollowing ? "Following" : "Follow"}
          </button>
          <button className="w-full flex justify-center mt-4 py-2 border border-gray-300 dark:border-[#2d2d2d] rounded-xl font-semibold text-sm hover:bg-gray-50 dark:hover:bg-[#1e1e1e] active:scale-[0.99] transition cursor-pointer">
            Message
          </button>
        </div>
      )}
      {followError && (
        <p className="mt-2 text-sm text-red-600" role="alert">
          {followError}
        </p>
      )}
    </div>
  );
}

export default ProfileInfo;
