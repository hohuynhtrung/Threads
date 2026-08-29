import { useEffect } from "react";
import { getPost } from "@/services/post/postService";
import PostItem from "@/layouts/DefaultLayout/components/Posts/PostItem";
import { Spinner } from "@/components/ui/spinner";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import { usePosts } from "@/features/post/hook";

function Posts() {
  const { posts, loading, pagination, hasMore, fetchPosts } = usePosts();

  useEffect(() => {
    if (posts.length === 0) {
      fetchPosts({ type: "for_you", page: 1 });
    }
  }, [fetchPosts, posts.length]);

  const handleLoadMore = () => {
    if (hasMore && !loading && pagination) {
      fetchPosts({
        type: "for_you",
        page: nextPage,
        per_page: pagination.per_page,
      });
    }
  };

  useInfiniteScroll(handleLoadMore, hasMore, loading);
  return (
    <div className="flex flex-col">
      {loading && (
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
        <PostItem key={post.id} post={post} />
      ))}

      {loading && posts.length > 0 && (
        <div className="w-full flex items-center justify-center my-5">
          <Spinner />
        </div>
      )}
    </div>
  );
}

export default Posts;
