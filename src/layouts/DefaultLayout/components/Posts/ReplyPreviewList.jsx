import { useEffect, useState } from "react";
import { fetchRepliesPreview } from "@/services/post/postService";
import PostItem from "@/layouts/DefaultLayout/components/Posts/PostItem";
import { Spinner } from "@/components/ui/spinner";

const INITIAL_LIMIT = 1;

function ReplyPreviewList({ postId, repliesCount }) {
  const [previewReplies, setPreviewReplies] = useState([]);
  const [loadedKey, setLoadedKey] = useState(null);
  const [loadingMore, setLoadingMore] = useState(false);
  const [expandedKey, setExpandedKey] = useState(null);
  const requestKey = `${postId}:${repliesCount}`;

  useEffect(() => {
    if (!repliesCount) return undefined;

    let ignore = false;

    fetchRepliesPreview(postId, { page: 1, per_page: INITIAL_LIMIT })
      .then((res) => {
        if (!ignore) {
          setPreviewReplies(res.data || []);
          setLoadedKey(requestKey);
        }
      })
      .catch((err) => console.error("Không tải được preview reply:", err))
      .finally(() => !ignore && setLoadedKey(requestKey));

    return () => {
      ignore = true;
    };
  }, [postId, repliesCount, requestKey]);

  const handleShowAllReplies = async (e) => {
    e.stopPropagation();
    if (loadingMore) return;

    setLoadingMore(true);
    try {
      const res = await fetchRepliesPreview(postId, {
        page: 1,
        per_page: repliesCount,
      });
      setPreviewReplies(res.data || []);
      setExpandedKey(requestKey);
    } catch (err) {
      console.error("Không tải được tất cả reply:", err);
    } finally {
      setLoadingMore(false);
    }
  };

  const isLoaded = loadedKey === requestKey;
  const isExpanded = expandedKey === requestKey;

  if (!repliesCount || !isLoaded || previewReplies.length === 0) return null;

  const showMoreButton = !isExpanded && repliesCount > previewReplies.length;

  return (
    <div className="flex flex-col gap-3 w-full relative">
      {previewReplies.map((reply) => {
        return (
          <div key={reply.id} className="flex items-start w-full">
            <div className="w-full">
              <PostItem post={reply} renderReplies={false} />
            </div>
          </div>
        );
      })}

      {/* Nút Xem thêm phản hồi */}
      {showMoreButton && (
        <div className="flex items-center w-full my-1">
          <button
            type="button"
            onClick={handleShowAllReplies}
            disabled={loadingMore}
            className="text-[13px] font-semibold text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white pl-2 text-left cursor-pointer flex items-center gap-2 py-0.5 transition"
          >
            {loadingMore ? (
              <div className="flex items-center gap-1.5">
                <Spinner className="w-3 h-3" />
                <span>Đang tải...</span>
              </div>
            ) : (
              <span>Xem {repliesCount - 1} câu trả lời</span>
            )}
          </button>
        </div>
      )}
    </div>
  );
}

export default ReplyPreviewList;
