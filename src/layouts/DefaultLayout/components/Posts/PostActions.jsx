import Icons from "@/assets/icons";
import { formatCount } from "@/layouts/DefaultLayout/helper/formatCount";

function PostActions({ post }) {
  const actions = [
    {
      id: "like",
      label: "Like",
      icon: Icons.iconLikePost,
      count: post.likes_count,
      onClick: () => console.log("Like post:", post.id),
    },
    {
      id: "comment",
      label: "Comment",
      icon: Icons.iconCommentPost,
      count: post.replies_count,
      onClick: () => console.log("Comment post:", post.id),
    },
    {
      id: "repost",
      label: "Repost",
      icon: Icons.iconRepostPost,
      count: post.reposts_and_quotes_count,
      onClick: () => console.log("Repost post:", post.id),
    },
    {
      id: "share",
      label: "Share",
      icon: Icons.iconSharePost,
      count: post.shares_count || post.reposts_and_quotes_count,
      onClick: () => console.log("Share post:", post.id),
    },
  ];

  return (
    <div className="flex items-center gap-5 pt-2 text-[#4d4d4d] dark:text-[#cccccc]">
      {actions.map((action) => (
        <button
          key={action.id}
          onClick={action.onClick}
          className="flex items-center p-2 rounded-2xl gap-1.5 text-sm font-normal hover:bg-gray-100 dark:hover:bg-[#2d2d2d] transition-colors active:scale-95 cursor-pointer"
        >
          <img
            src={action.icon}
            alt={action.label}
            className="w-5 h-5 object-contain dark:invert"
          />
          <span>{formatCount(action.count)}</span>
        </button>
      ))}
    </div>
  );
}

export default PostActions;
