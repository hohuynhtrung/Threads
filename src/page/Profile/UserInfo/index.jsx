import Icons from "@/assets/icons";
import Images from "@/assets/images";
import { useFetchFollowers } from "@/features/follow/hook";

function UserInfo({ user }) {
  // 1. Kiểm tra nếu chưa có dữ liệu user thì dừng render để tránh crash app
  if (!user) return null;

  // 2. Lấy followers theo user._id (hoặc user.id)
  const userId = user._id || user.id;
  const { followersCount, loading } = useFetchFollowers(userId);

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

      <div className="flex items-center justify-between mt-4 text-xs text-gray-500">
        <span className="hover:underline cursor-pointer">
          {loading ? "..." : `${followersCount} followers`}
        </span>
        <div className="flex items-center gap-3">
          <button className="hover:opacity-70 transition cursor-pointer">
            <img
              src={Icons.iconInstagram || Icons.iconMorePost}
              alt="Instagram"
              className="w-5 h-5 dark:invert"
            />
          </button>
        </div>
      </div>

      <button className="w-full mt-4 py-2 border border-gray-300 dark:border-[#2d2d2d] rounded-xl font-semibold text-sm hover:bg-gray-50 dark:hover:bg-[#1e1e1e] active:scale-[0.99] transition cursor-pointer">
        Edit profile
      </button>
    </div>
  );
}

export default UserInfo;
