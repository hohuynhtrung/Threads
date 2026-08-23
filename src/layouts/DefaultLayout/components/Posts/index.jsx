import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPost } from "@/services/post/postService";
import PostItem from "@/layouts/DefaultLayout/components/Posts/PostItem";
import { Spinner } from "@/components/ui/spinner";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";

function Posts() {
  const dispatch = useDispatch();
  const {
    list: posts,
    loading,
    pagination,
  } = useSelector((state) => state.posts);

  useEffect(() => {
    if (posts.length === 0) {
      dispatch(getPost({ type: "for_you", page: 1 }));
    }
  }, [dispatch, posts.length]);

  const hasMore = pagination
    ? pagination.current_page < pagination.last_page
    : false;

  const handleLoadMore = () => {
    if (hasMore && !loading && pagination) {
      const nextPage = pagination.current_page + 1;

      dispatch(
        getPost({
          type: "for_you",
          page: nextPage,
          per_page: pagination.per_page,
        }),
      );
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
