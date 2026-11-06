import { useNavigate } from "react-router";
import { formatTimeAgo } from "@/layouts/DefaultLayout/helper/formatTimeAgo";
import PostMedia from "@/layouts/DefaultLayout/components/Posts/PostMedia";
import Images from "@/assets/images";

function QuotedPostItem({ originalPost }) {
  const navigate = useNavigate();

  if (!originalPost) return null;

  const handleQuoteClick = (e) => {
    e.stopPropagation();
    navigate(`/post/${originalPost.id}`);
  };

  return (
    <div
      onClick={handleQuoteClick}
      className="mt-2.5 p-3.5 border border-gray-200 dark:border-[#2d2d2d] rounded-2xl hover:bg-gray-50/50 dark:hover:bg-[#1a1a1a]/50 transition cursor-pointer flex flex-col gap-2 w-full max-w-138.5"
    >
      {/* Tác giả bài gốc */}
      <div className="flex items-center gap-2">
        <img
          src={originalPost.user?.avatar_url || Images.imgDefaultAvatar}
          alt={originalPost.user?.name || "avatar"}
          className="w-5 h-5 rounded-full object-cover shrink-0"
        />
        <span className="font-semibold text-[14px] text-black dark:text-[#e8eaeb] truncate">
          {originalPost.user?.name || originalPost.user?.username}
        </span>
        <span className="text-[12px] text-gray-400 dark:text-[#8e8e8e] shrink-0">
          {formatTimeAgo(originalPost.created_at)}
        </span>
      </div>

      {/* Nội dung bài gốc */}
      {originalPost.content && (
        <p className="text-[14px] font-normal text-black dark:text-[#e8eaeb] line-clamp-3 wrap-break-word">
          {originalPost.content}
        </p>
      )}

      {/* Media bài gốc (nếu có) */}
      {originalPost.media_urls && originalPost.media_urls.length > 0 && (
        <div className="mt-1" onClick={(e) => e.stopPropagation()}>
          <PostMedia urls={originalPost.media_urls} />
        </div>
      )}
    </div>
  );
}

export default QuotedPostItem;
