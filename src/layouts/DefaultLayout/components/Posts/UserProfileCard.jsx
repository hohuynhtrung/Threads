import { useNavigate } from "react-router";
import { useSelector } from "react-redux"; // 🔑 Import useSelector
import Images from "@/assets/images";

function UserProfileHoverCard({ user, children }) {
  const navigate = useNavigate();

  // 🔑 Lấy thông tin user đang đăng nhập từ Redux store
  const currentUser = useSelector((state) => state.auth?.currentUser);

  // Kiểm tra xem user trong card có phải là chính mình không
  const isSelf =
    currentUser?.id && user?.id && String(currentUser.id) === String(user.id);

  const handleProfileClick = (e) => {
    e.stopPropagation();
    const username = user?.username;
    if (!username) return;
    navigate(`/@${username}`, { state: { user } });
  };

  return (
    <div className="relative group inline-block">
      {children}

      <div className="absolute left-0 top-full mt-1 w-80 bg-white dark:bg-[#181818] rounded-3xl shadow-2xl border border-gray-200 dark:border-[#2d2d2d] p-5 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 ease-out transform translate-y-2 group-hover:translate-y-0">
        <div className="flex justify-between items-start">
          <div onClick={handleProfileClick} className="cursor-pointer">
            <h3 className="font-bold text-[18px] text-black dark:text-white hover:underline leading-tight">
              {user?.name}
            </h3>
            <p className="text-[14px] text-gray-500 dark:text-[#8e8e8e] mt-0.5">
              @{user?.username}
            </p>
          </div>

          <div
            onClick={handleProfileClick}
            className="w-14 h-14 rounded-full bg-gray-200 dark:bg-gray-800 overflow-hidden cursor-pointer shrink-0"
          >
            <img
              src={user?.avatar_url || Images.imgDefaultAvatar}
              alt={user?.name || "avatar"}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <p className="text-[14px] text-black dark:text-[#e8eaeb] mt-3 line-clamp-3">
          {user?.bio || "Không có tiểu sử"}
        </p>

        <div className="text-[14px] text-gray-500 dark:text-[#8e8e8e] mt-3">
          <span>{user?.followers_count || 0} followers</span>
        </div>

        {!isSelf && (
          <div className="flex gap-3 mt-4">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
              }}
              className="flex-1 bg-black text-white dark:bg-white dark:text-black font-semibold py-2 rounded-xl text-[14px] hover:opacity-80 transition cursor-pointer"
            >
              {user?.is_followed_by_auth ? "Following" : "Follow"}
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
              }}
              className="flex-1 border border-gray-300 dark:border-[#2d2d2d] font-semibold py-2 rounded-xl text-[14px] text-black dark:text-white hover:bg-gray-50 dark:hover:bg-[#262626] transition cursor-pointer"
            >
              Message
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default UserProfileHoverCard;
