import { useEffect, useRef, useMemo } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { usePosts } from "@/features/post/hook";
import PostItem from "@/layouts/DefaultLayout/components/Posts/PostItem";
import { Spinner } from "@/components/ui/spinner";
import Icons from "@/assets/icons";
import Footer from "@/layouts/components/Footer";
import RepilesInput from "@/page/PostDetail/components/RepilesInput";
import ReplyPreviewList from "@/layouts/DefaultLayout/components/Posts/ReplyPreviewList";

function PostDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const replyInputRef = useRef(null);

  const {
    currentPost,
    replies,
    loading,
    fetchPostById,
    clearCurrentPost,
    fetchReplies,
    clearReplies,
    createReply,
  } = usePosts();

  useEffect(() => {
    if (id) {
      fetchPostById(id);
      fetchReplies(id);
    }
    return () => {
      clearCurrentPost();
      clearReplies();
    };
  }, [id, fetchPostById, clearCurrentPost]);

  // Nếu điều hướng tới đây từ nút "Comment" (PostActions) -> focus ô nhập
  useEffect(() => {
    if (location.state?.focusReply) {
      replyInputRef.current?.focus?.();
    }
  }, [location.state, currentPost]);

  // Chuỗi cha (ancestors) từ gốc -> ngay trên currentPost.
  // Giả định API trả currentPost.parent (1 cấp), lồng nhau nếu backend include đệ quy.
  // Nếu backend trả sẵn mảng currentPost.ancestors thì dùng thẳng mảng đó thay đoạn này.
  const ancestors = useMemo(() => {
    const chain = [];
    let node = currentPost?.parent;
    while (node) {
      chain.unshift(node);
      node = node.parent;
    }
    return chain;
  }, [currentPost]);

  const handleReplySubmit = async (content) => {
    if (!content.trim()) return;
    try {
      const newReply = await createReply(id, content).unwrap();
      // Optimistic: chèn ngay reply mới thay vì fetch lại toàn bộ
      if (newReply) {
        fetchReplies(id); // giữ lại fetch để đồng bộ replies_count/pagination;
        // nếu usePosts có action prependReply, thay dòng trên bằng dispatch prependReply(newReply)
      }
    } catch (error) {
      console.error("Error send reply", error);
    }
  };

  return (
    <div className="flex flex-col w-160 mt-5 mx-auto">
      <div className="flex items-center gap-4 px-4 mb-4">
        <button
          onClick={() => navigate(-1)}
          className="p-2 hover:bg-gray-100 dark:hover:bg-[#292a2a] rounded-full transition cursor-pointer"
        >
          <img
            src={Icons.iconBack}
            alt="Back"
            className="w-5 h-5 dark:invert"
          />
        </button>
        <h1 className="text-black dark:text-white font-semibold text-[20px]">
          Thread
        </h1>
      </div>

      <div className="w-full h-full border-[#00000026] dark:border-[#2d2d2d] border rounded-3xl mb-14">
        {loading && (
          <div className="w-full flex items-center justify-center my-10">
            <Spinner />
          </div>
        )}

        {/* Chuỗi bài cha, mờ hơn, có đường nối xuống */}
        {!loading &&
          ancestors.map((ancestor) => (
            <div
              key={ancestor.id}
              className="px-4 pt-3 border-b-0 border-[#00000026] dark:border-[#292a2a]"
            >
              <PostItem post={ancestor} variant="ancestor" />
            </div>
          ))}

        {!loading && currentPost && (
          <div className="p-4 border-b border-[#00000026] dark:border-[#292a2a]">
            <PostItem post={currentPost} variant="main" />
          </div>
        )}

        <div className="p-4 border-b border-[#00000026] dark:border-[#292a2a]">
          <RepilesInput
            ref={replyInputRef}
            targetUsername={currentPost?.user?.username || "user"}
            onSubmit={handleReplySubmit}
          />
        </div>

        {!loading && replies?.length > 0 && (
          <div>
            {replies.map((reply) => (
              <div
                key={reply.id}
                className="p-4 border-b border-[#00000026] dark:border-[#292a2a]"
              >
                <PostItem
                  post={reply}
                  hasBottomConnector={reply.replies_count > 0}
                />
                {reply.replies_count > 0 && (
                  <div className="pl-13">
                    <ReplyPreviewList
                      postId={reply.id}
                      repliesCount={reply.replies_count}
                      hasLeftConnector={reply.replies_count > 0}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default PostDetail;
