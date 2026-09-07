import { Link } from "react-router";
import Icons from "@/assets/icons";
import { cn } from "@/lib/utils";

const navItemClass =
  "flex items-center text-sm p-2 rounded-xl text-black dark:text-white " +
  "hover:bg-gray-500/10 dark:hover:bg-gray-700/50 active:scale-95 " +
  "transition-all duration-200 w-full";

function FeedsSection() {
  return (
    <div className="mt-6 flex flex-col gap-1">
      <div className="mb-1 flex justify-between px-2">
        <span className="text-xs font-medium text-gray-500">Feeds</span>
        <span className="cursor-pointer text-xs font-medium text-gray-500 hover:underline">
          Edit
        </span>
      </div>

      <Link to="/following" className={cn(navItemClass, "justify-start")}>
        <span>Following</span>
      </Link>

      <Link to="/ghost-posts" className={cn(navItemClass, "justify-between")}>
        <span>Ghost posts</span>
        <img
          src={Icons.iconGhost}
          alt="Ghost"
          className="h-5 w-5 object-contain dark:invert"
        />
      </Link>
    </div>
  );
}

export default FeedsSection;
