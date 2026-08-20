import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPost } from "@/services/post/postService";
import PostItem from "@/layouts/DefaultLayout/components/Posts/PostItem";
import { Spinner } from "@/components/ui/spinner";

function Posts() {
  const dispatch = useDispatch();
  const { list: posts, loading, error } = useSelector((state) => state.posts);

  useEffect(() => {
    dispatch(getPost());
  }, [dispatch]);

  return (
    <div className="flex flex-col">
      {loading && (
        <div className="w-full flex items-center justify-center my-5">
          <Spinner />
        </div>
      )}
      {!posts.length && (
        <div className="p-4 text-center text-gray-400 dark:text-gray-500">
          Chưa có bài viết nào.
        </div>
      )}
      {posts.map((post) => (
        <PostItem key={post.id} post={post} />
      ))}
    </div>
  );
}

export default Posts;
