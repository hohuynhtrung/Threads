import { formatTimeAgo } from "@/layouts/DefaultLayout/helper/formatTimeAgo";
import PostActions from "@/layouts/DefaultLayout/components/Posts/PostActions";
import { useNavigate, useParams } from "react-router-dom";
import Images from "@/assets/images";

function PostItem({ post }) {
  const navigate = useNavigate();
  const params = useParams();

  const handlePostDetail = (e) => {
    if (params.id === String(post.id)) return;
    navigate(`/post/${post.id}`);
  };

  return (
    <div
      onClick={handlePostDetail}
      className="flex flex-col gap-2 cursor-pointer"
    >
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center font-bold text-gray-700 dark:text-gray-300 shrink-0">
          <img
            src={post.user.avatar_url || Images.imgDefaultAvatar}
            className="rounded-[50%]"
          />
        </div>
        <div className="w-full">
          <h4 className="font-semibold text-black dark:text-[#e8eaeb] text-[16px] leading-tight">
            {post.user?.name || "Người dùng"}
            <span className="text-[14px] font-normal text-gray-400 dark:text-[#cccccc] ml-2">
              {formatTimeAgo(post.created_at)}
            </span>
          </h4>
          <p className="w-138.5 text-[16px] font-normal text-black dark:text-[#e8eaeb] whitespace-normal wrap-break-word my-1">
            {post.content}
          </p>
          <PostActions post={post} />
        </div>
      </div>
    </div>
  );
}

export default PostItem;
