import { formatTimeAgo } from "@/layouts/DefaultLayout/helper/formatTimeAgo";
import PostActions from "@/layouts/DefaultLayout/components/Posts/PostActions";
import { useNavigate, useParams } from "react-router-dom";
import Images from "@/assets/images";

function PostItem({
  post,
  variant = "feed",
  hasBottomConnector = false,
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

  const avatarSize = isMain ? "w-12 h-12" : "w-10 h-10";
  const nameSize = isMain ? "text-[17px]" : "text-[16px]";
  const contentSize = isMain ? "text-[18px]" : "text-[16px]";

  return (
    <div
      onClick={handlePostDetail}
      className={`flex flex-col gap-2 cursor-pointer ${isAncestor ? "opacity-70" : ""}`}
    >
      <div className="flex items-start gap-3">
        {/* Cột avatar + đường nối thread */}
        <div className="flex flex-col items-center shrink-0">
          <div
            className={`${avatarSize} rounded-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center font-bold text-gray-700 dark:text-gray-300 overflow-hidden`}
          >
            <img
              src={post.user.avatar_url || Images.imgDefaultAvatar}
              className="rounded-[50%] w-full h-full object-cover"
            />
          </div>
          {hasBottomConnector && (
            <div className="w-[2px] flex-1 min-h-[60px] mt-1 bg-[#00000026] dark:bg-[#2d2d2d]" />
          )}
        </div>

        <div className="w-full">
          <h4
            className={`font-semibold text-black dark:text-[#e8eaeb] ${nameSize} leading-tight`}
          >
            {post.user?.name}
            <span className="text-[14px] font-normal text-gray-400 dark:text-[#cccccc] ml-2">
              {formatTimeAgo(post.created_at)}
            </span>
          </h4>

          {/* Reply preview khi chưa có ancestor-chain đầy đủ từ API */}
          {!isAncestor && post.reply_to_username && (
            <p className="text-[13px] text-gray-400 dark:text-gray-500">
              Trả lời{" "}
              <span className="text-gray-500 dark:text-gray-400">
                @{post.reply_to_username}
              </span>
            </p>
          )}

          <p
            className={`w-138.5 ${contentSize} font-normal text-black dark:text-[#e8eaeb] whitespace-normal wrap-break-word my-1`}
          >
            {post.content}
          </p>

          {!isAncestor && (
            <div onClick={(e) => e.stopPropagation()}>
              <PostActions post={post} onCommentClick={onCommentClick} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default PostItem;
