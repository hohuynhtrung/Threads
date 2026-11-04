import { useState, useEffect, useRef, useMemo } from "react";
import { useParams, useNavigate, useLocation } from "react-router";
import { usePosts } from "@/features/post/hook";
import PostItem from "@/layouts/DefaultLayout/components/Posts/PostItem";
import { Spinner } from "@/components/ui/spinner";
import Icons from "@/assets/icons";
import Footer from "@/layouts/components/Footer";
import RepliesInput from "@/page/PostDetail/components/RepilesInput";

function PostDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const replyInputRef = useRef(null);

  const [sortBy, setSortBy] = useState("top");

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
  }, [id, fetchPostById, clearCurrentPost, clearReplies]);

  useEffect(() => {
    if (location.state?.focusReply) {
      replyInputRef.current?.focus?.();
    }
  }, [location.state, currentPost]);

  const ancestors = useMemo(() => {
    const chain = [];
    let node = currentPost?.parent;
    while (node) {
      chain.unshift(node);
      node = node.parent;
    }
    return chain;
  }, [currentPost]);

  const sortedReplies = useMemo(() => {
    if (!replies || replies.length === 0) return [];
    const list = [...replies];

    if (sortBy === "recent") {
      return list.sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at),
      );
    }

    return list.sort((a, b) => {
      const scoreA = (a.likes_count || 0) * 2 + (a.replies_count || 0);
      const scoreB = (b.likes_count || 0) * 2 + (b.replies_count || 0);
      return scoreB - scoreA;
    });
  }, [replies, sortBy]);

  const handleReplySubmit = async (content, mediaFiles = []) => {
    if (!content && mediaFiles.length === 0) return false;
    try {
      await createReply(id, content, mediaFiles).unwrap();
      fetchReplies(id);
      return true;
    } catch (error) {
      console.error("Error send reply", error);
      return false;
    }
  };

  return (
    <div className="flex flex-col w-160 mt-5 mx-auto">
      <div className="flex items-center gap-4 px-4 mb-4">
        <button
          type="button"
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
            <PostItem post={currentPost} variant="main" renderReplies={false} />
          </div>
        )}

        <div className="p-4 border-b border-[#00000026] dark:border-[#292a2a]">
          <RepliesInput
            ref={replyInputRef}
            targetUsername={currentPost?.user?.username || "user"}
            onSubmit={handleReplySubmit}
            onSortChange={(type) => setSortBy(type)}
          />
        </div>

        {!loading && sortedReplies.length > 0 && (
          <div className="w-full">
            {sortedReplies.map((reply) => (
              <div
                key={reply.id}
                className="p-4 border-b border-[#00000026] dark:border-[#292a2a]"
              >
                <PostItem post={reply} />
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
