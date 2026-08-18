import { Link } from "react-router";
import Icons from "@/assets/icons";

function FeedsSection() {
  return (
    <div className="flex flex-col mt-6 gap-1">
      <div className="flex justify-between px-2 mb-1">
        <span className="text-xs text-gray-500 dark:text-gray-500 font-medium">
          Feeds
        </span>
        <span className="text-xs text-gray-500 dark:text-gray-500 font-medium cursor-pointer hover:underline">
          Edit
        </span>
      </div>

      <Link
        to="/following"
        className="flex items-center text-sm p-2 rounded-xl text-black dark:text-white hover:bg-gray-500/10 dark:hover:bg-gray-700/50 active:scale-95 transition-all duration-200 justify-start w-full"
      >
        <span>Following</span>
      </Link>

      <Link
        to="/ghost-posts"
        className="flex items-center justify-between text-sm p-2 rounded-xl text-black dark:text-white hover:bg-gray-500/10 dark:hover:bg-gray-700/50 active:scale-95 transition-all duration-200 w-full"
      >
        <span>Ghost posts</span>
        <img
          src={Icons.iconGhost}
          alt="Ghost"
          className="w-5 h-5 object-contain dark:invert"
        />
      </Link>
    </div>
  );
}

export default FeedsSection;
