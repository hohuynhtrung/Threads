import { useNavigate, useParams } from "react-router";
import { formatTimeAgo } from "@/layouts/DefaultLayout/helper/formatTimeAgo";
import PostActions from "@/layouts/DefaultLayout/components/Posts/PostActions";
import ReplyPreviewList from "@/layouts/DefaultLayout/components/Posts/ReplyPreviewList";

import Images from "@/assets/images";

function PostItem({
  post,
  variant = "feed",
  renderReplies = true,
  onCommentClick,
}) {
  const navigate = useNavigate();
  const params = useParams();

  const isMain = variant === "main";
  const isAncestor = variant === "ancestor";

  const handlePostDetail = () => {
    if (params.id === String(post.id)) return;
    navigate(`/post/${post.id}`);
  };

  const handleUserProfile = (event) => {
    event.stopPropagation();

    const username = post?.user?.username;
    if (!username) return;

    navigate(`/@${username}`, { state: { user: post.user } });
  };

  const avatarSize = isMain ? "w-12 h-12" : "w-10 h-10";
  const nameSize = isMain ? "text-[17px]" : "text-[16px]";
  const contentSize = isMain ? "text-[18px]" : "text-[16px]";

  const repliesCount = Number(post?.replies_count || 0);

  return (
    <div
      onClick={handlePostDetail}
      className={`relative flex flex-col gap-2 cursor-pointer w-full ${isAncestor ? "opacity-70" : ""}`}
    >
      {renderReplies && !isAncestor && repliesCount > 0 && (
        <div
          className={`absolute left-4.75 ${isMain ? "top-12" : "top-10"} bottom-0 w-0.5 bg-gray-300 dark:bg-[#2d2d2d] pointer-events-none`}
        />
      )}

      <div className="flex items-start gap-3 w-full">
        <div className="flex flex-col items-center shrink-0">
          <button
            type="button"
            onClick={handleUserProfile}
            className={`${avatarSize} rounded-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center font-bold text-gray-700 dark:text-gray-300 overflow-hidden transition-transform hover:scale-[1.02] cursor-pointer`}
            aria-label={`View ${post?.user?.name || "user"} profile`}
          >
            <img
              src={post?.user?.avatar_url || Images.imgDefaultAvatar}
              className="rounded-[50%] w-full h-full object-cover"
              alt={post?.user?.name || "avatar"}
            />
          </button>
        </div>

        <div className="w-full">
          <button
            type="button"
            onClick={handleUserProfile}
            className={`font-semibold text-black dark:text-[#e8eaeb] ${nameSize} leading-tight text-left cursor-pointer hover:underline`}
          >
            {post?.user?.name}
            <span className="text-[14px] font-normal text-gray-400 dark:text-[#cccccc] ml-2">
              {formatTimeAgo(post?.created_at)}
            </span>
          </button>

          {/* Reply preview khi chưa có ancestor-chain đầy đủ từ API */}
          {!isAncestor && post?.reply_to_username && (
            <p className="text-[13px] text-gray-400 dark:text-gray-500">
              Trả lời{" "}
              <span className="text-gray-500 dark:text-gray-400">
                @{post.reply_to_username}
              </span>
            </p>
          )}

          <p
            className={`w-full max-w-138.5 ${contentSize} font-normal text-black dark:text-[#e8eaeb] whitespace-normal wrap-break-word my-1`}
          >
            {post?.content}
          </p>

          {!isAncestor && (
            <div onClick={(e) => e.stopPropagation()}>
              <PostActions post={post} onCommentClick={onCommentClick} />
            </div>
          )}

          {renderReplies && !isAncestor && repliesCount > 0 && (
            <div className="mt-3 w-full" onClick={(e) => e.stopPropagation()}>
              <ReplyPreviewList postId={post.id} repliesCount={repliesCount} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default PostItem;
