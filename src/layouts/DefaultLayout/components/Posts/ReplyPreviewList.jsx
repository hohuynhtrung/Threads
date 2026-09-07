import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchRepliesPreview } from "@/services/post/postService";
import PostItem from "@/layouts/DefaultLayout/components/Posts/PostItem";

const PREVIEW_LIMIT = 1;

function ReplyPreviewList({ postId, repliesCount, hasLeftConnector = false }) {
  const [previewReplies, setPreviewReplies] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!repliesCount) return;
    let ignore = false;

    fetchRepliesPreview(postId, { page: 1, per_page: PREVIEW_LIMIT })
      .then((res) => {
        if (!ignore) setPreviewReplies(res.data || []);
      })
      .catch((err) => console.error("Không tải được preview reply:", err))
      .finally(() => !ignore && setLoaded(true));

    return () => {
      ignore = true;
    };
  }, [postId, repliesCount]);

  if (!repliesCount || !loaded || previewReplies.length === 0) return null;

  return (
    <div className="flex flex-col gap-2">
      {previewReplies.map((reply) => (
        <div
          key={reply.id}
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/post/${reply.id}`);
          }}
          className="relative flex items-start gap-2 cursor-pointer"
        >
          {hasLeftConnector && (
            <div className="absolute top-0 -left-8.25 w-5 h-6 border-l-2 border-b-2 border-[#00000026] dark:border-[#2d2d2d] rounded-bl-2xl pointer-events-none" />
          )}
          <PostItem post={reply} />
        </div>
      ))}

      {repliesCount > PREVIEW_LIMIT && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/post/${postId}`);
          }}
          className="text-[13px] text-gray-400 dark:text-gray-500 pl-8 text-left cursor-pointer"
        >
          Xem tất cả {repliesCount} phản hồi
        </button>
      )}
    </div>
  );
}

export default ReplyPreviewList;
