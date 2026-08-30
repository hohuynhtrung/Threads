import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { usePosts } from "@/features/post/hook";
import PostItem from "@/layouts/DefaultLayout/components/Posts/PostItem";
import { Spinner } from "@/components/ui/spinner";
import Icons from "@/assets/icons";
import Footer from "@/layouts/components/Footer";
import RepilesInput from "@/page/PostDetail/components/RepilesInput";

function PostDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    currentPost,
    replies,
    loading,
    error,
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

  const handleReplySubmit = async (content) => {
    if (!content.trim()) return;
    try {
      await createReply(id, content).unwrap();
      fetchReplies(id);
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

        {!loading && currentPost && (
          <div className="p-4 border-b border-[#00000026] dark:border-[#292a2a]">
            <PostItem post={currentPost} />
          </div>
        )}
        <div className="p-4 border-b border-[#00000026] dark:border-[#292a2a]">
          <RepilesInput
            targetUsername={currentPost?.user?.username || "user"}
            onSubmit={handleReplySubmit}
          />
        </div>
        {!loading && replies && replies.length > 0 && (
          <div className="p-4 pl-8 border-b border-[#00000026] dark:border-[#292a2a]">
            {replies.map((reply) => (
              <PostItem key={reply.id} post={reply} />
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default PostDetail;
