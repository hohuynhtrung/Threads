import { useEffect } from "react";
import PostItem from "@/layouts/DefaultLayout/components/Posts/PostItem";
import { Spinner } from "@/components/ui/spinner";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import { usePosts } from "@/features/post/hook";

function Posts() {
  const { posts, loading, pagination, hasMore, fetchPosts } = usePosts();

  const currentPage = pagination?.current_page || 1;
  const nextPage = currentPage + 1;

  useEffect(() => {
    if (posts.length === 0) {
      fetchPosts({ type: "for_you", page: 1 });
    }
  }, [fetchPosts, posts.length]);

  const handleLoadMore = () => {
    if (hasMore && !loading) {
      fetchPosts({
        type: "for_you",
        page: nextPage,
        per_page: pagination?.per_page || 15,
      });
    }
  };

  const observerRef = useInfiniteScroll(handleLoadMore, hasMore, loading);

  return (
    <div className="flex flex-col">
      {loading && posts.length === 0 && (
        <div className="w-full flex items-center justify-center my-5">
          <Spinner />
        </div>
      )}

      {!loading && posts.length === 0 && (
        <div className="p-4 text-center text-gray-400 dark:text-gray-500">
          Chưa có bài viết nào.
        </div>
      )}

      {posts.map((post) => (
        <div className="p-4 border-b border-[#00000026] dark:border-[#292a2a] ">
          <PostItem key={post.id} post={post} />
        </div>
      ))}

      {loading && posts.length > 0 && (
        <div className="w-full flex items-center justify-center my-5">
          <Spinner />
        </div>
      )}

      {hasMore && <div ref={observerRef} className="h-10 w-full" />}
    </div>
  );
}

export default Posts;
