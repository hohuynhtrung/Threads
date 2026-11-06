import { useEffect, useRef } from "react";
import { useCurrentUser } from "@/features/auth/hook";
import { usePosts } from "@/features/post/hook";
import Icons from "@/assets/icons";
import Footer from "@/layouts/components/Footer";
import PostItem from "@/layouts/DefaultLayout/components/Posts/PostItem";
import { Spinner } from "@/components/ui/spinner";

function Saved() {
  const currentUser = useCurrentUser();
  const isLoggedIn = Boolean(currentUser);
  const { posts, savedPosts, loading, fetchPosts } = usePosts();
  const hasRequestedFeed = useRef(false);

  useEffect(() => {
    if (hasRequestedFeed.current || posts.length > 0) return;

    hasRequestedFeed.current = true;
    fetchPosts({ type: "for_you", page: 1 });
  }, [fetchPosts, posts.length]);

  return (
    <div className="flex flex-col w-160 mt-5">
      <div className="flex max-w-160 items-center justify-between w-full px-4">
        <h1 className="text-black dark:text-white font-semibold text-[20px]">
          Saved
        </h1>
        {isLoggedIn ? (
          <button className="hover:opacity-70 transition cursor-pointer">
            <img
              src={Icons.iconMorePost}
              alt="More"
              className="w-6 h-6 dark:invert"
            />
          </button>
        ) : (
          <div className="w-6" />
        )}
      </div>

      <div className="w-full max-w-160 mt-5 border-[#00000026] dark:border-[#2d2d2d] border rounded-3xl mb-14 overflow-hidden">
        {savedPosts.length > 0 ? (
          <div className="flex flex-col divide-y divide-gray-100 dark:divide-[#2d2d2d]">
            {savedPosts.map((post) => (
              <div key={post.id} className="p-4">
                <PostItem post={post} />
              </div>
            ))}
          </div>
        ) : loading ? (
          <div className="w-full h-40 flex items-center justify-center">
            <Spinner />
          </div>
        ) : (
          <div className="w-full h-40 flex items-center justify-center">
            <p className="text-gray-500 dark:text-gray-400">
              Không có hoạt động nào
            </p>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default Saved;
