import Icons from "@/assets/icons";
import Images from "@/assets/images";

function UsersSuggestions({ user, onToggleFollow }) {
  if (!user) return null;

  return (
    <div className="flex items-start justify-between py-3 pl-3 group cursor-pointer">
      <img
        src={user.avatar_url || Images.imgDefaultAvatar}
        alt={user.name}
        className="w-9 h-9 rounded-full object-cover border border-gray-200 dark:border-zinc-700"
      />

      <div className="w-full flex flex-col ml-4 pr-4 border-b">
        <div className="flex justify-between items-center">
          <div className="flex flex-col">
            <div className="flex items-center">
              <span className="font-semibold text-[16px] mr-2 hover:underline">
                {user.username}
              </span>
              {user.verified && (
                <img
                  src={Icons.iconTickBlue}
                  alt="Verified"
                  title="Verified"
                  className="w-3 h-3 cursor-pointer"
                />
              )}
            </div>
            <span className="text-[15px] font-normal text-[#999999] dark:text-zinc-500">
              {user.name}
            </span>
          </div>
          <button
            onClick={() => onToggleFollow && onToggleFollow(user.id)}
            className={`px-6 py-1.5 rounded-[10px] font-semibold text-[16px] transition border cursor-pointer ${
              user.is_following
                ? "border-gray-300 dark:border-zinc-700 text-gray-500 dark:text-gray-400"
                : "bg-black dark:bg-white text-white dark:text-black border-transparent hover:opacity-90"
            }`}
          >
            {user.is_following ? "Following" : "Follow"}
          </button>
        </div>

        {user.bio && (
          <span className="font-normal text-[15px] text-black dark:text-white mt-1">
            {user.bio}
          </span>
        )}

        <span className="text-[15px] text-[#999999] dark:text-zinc-500 my-2">
          {user.followers_count || 0} followers
        </span>
      </div>
    </div>
  );
}

export default UsersSuggestions;
