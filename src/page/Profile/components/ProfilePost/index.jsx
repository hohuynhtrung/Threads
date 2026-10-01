import { Spinner } from "@/components/ui/spinner";
import { useCurrentUser } from "@/features/auth/hook";
import { usePosts } from "@/features/post/hook";
import CreatePostInput from "@/layouts/DefaultLayout/components/CreatePostInput";
import PostItem from "@/layouts/DefaultLayout/components/Posts/PostItem";
import { useLocation } from "react-router";

function ProfilePost() {
  const currentUser = useCurrentUser();
  const location = useLocation();
  const profileUser = location.state?.user || currentUser;

  const profileUserId = profileUser?.id;
  const { myPosts, loading } = usePosts(profileUserId);
  const isOwnProfile = currentUser && profileUser?.id === currentUser.id;

  return (
    <div className="w-full">
      {isOwnProfile && <CreatePostInput />}

      {loading && myPosts.length === 0 ? (
        <div className="flex justify-center py-8">
          <Spinner />
        </div>
      ) : myPosts.length > 0 ? (
        myPosts.map((post) => (
          <div
            key={post.id}
            className="p-4 border-b border-[#00000026] dark:border-[#292a2a]"
          >
            <PostItem post={post} />
          </div>
        ))
      ) : (
        <p className="text-center py-8">No posts yet.</p>
      )}
    </div>
  );
}

export default ProfilePost;
