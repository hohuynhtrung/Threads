import React from "react";
import Icons from "@/assets/icons";
import { formatCount } from "@/layouts/DefaultLayout/helper/formatCount";
import { usePosts } from "@/features/post/hook";

function PostActions({ post }) {
  const { likePost } = usePosts();

  const handleLike = (e) => {
    e.stopPropagation();
    likePost(post.id);
  };

  const isPostLike = Boolean(post.is_liked_by_auth);

  const actions = [
    {
      id: "like",
      label: "Like",
      icon: isPostLike ? Icons.iconLikedPost : Icons.iconLikePost,
      count: post.likes_count,
      isLiked: isPostLike,
      onClick: handleLike,
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
          className={`flex items-center p-2 rounded-2xl gap-1.5 text-sm font-normal transition-colors active:scale-95 cursor-pointer hover:bg-gray-100 dark:hover:bg-[#2d2d2d] ${
            action.isLiked
              ? "fill-red-500 text-red-500"
              : "text-gray-500 hover:text-black dark:hover:text-white"
          }`}
        >
          <img
            src={action.icon}
            alt={action.label}
            className={`w-5 h-5 object-contain ${
              action.isLiked ? "" : "dark:invert"
            }`}
          />
          <span>{formatCount(action.count)}</span>
        </button>
      ))}
    </div>
  );
}

export default PostActions;
