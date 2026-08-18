import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPost } from "@/services/post/postService";
import PostItem from "@/layouts/DefaultLayout/components/Posts/PostItem";

function Posts() {
  const dispatch = useDispatch();
  const { list: posts, loading, error } = useSelector((state) => state.posts);

  useEffect(() => {
    dispatch(getPost());
  }, [dispatch]);

  if (loading)
    return (
      <div className="p-4 text-center text-gray-500 dark:text-gray-500">
        Đang tải bài viết...
      </div>
    );
  if (error)
    return (
      <div className="p-4 text-center text-red-500 dark:text-red-500">
        Có lỗi xảy ra: {typeof error === "string" ? error : "Lỗi hệ thống"}
      </div>
    );
  if (!posts?.length)
    return (
      <div className="p-4 text-center text-gray-400 dark:text-gray-500">
        Chưa có bài viết nào.
      </div>
    );

  return (
    <div className="flex flex-col">
      {posts.map((post) => (
        <PostItem key={post.id} post={post} />
      ))}
    </div>
  );
}

export default Posts;
