import { Spinner } from "@/components/ui/spinner";
import { useCurrentUser } from "@/features/auth/hook";
import { usePosts } from "@/features/post/hook";
import PostItem from "@/layouts/DefaultLayout/components/Posts/PostItem";
import { useEffect } from "react";
import { useLocation } from "react-router";

function ProfileRepost() {
  const currentUser = useCurrentUser();
  const location = useLocation();
  const profileUser = location.state?.user || currentUser;
  const profileUserId = profileUser?.id;

  const { reposts, loadingReposts, fetchUserReposts } = usePosts(profileUserId);

  useEffect(() => {
    if (profileUserId) {
      fetchUserReposts(profileUserId);
    }
  }, [profileUserId]);

  if (loadingReposts && reposts.length === 0) {
    return (
      <div className="flex justify-center py-8">
        <Spinner />
      </div>
    );
  }

  if (reposts.length === 0) {
    return <p className="text-center py-8">No reposts yet.</p>;
  }

  return (
    <div className="w-full">
      {reposts.map((repost) => {
        const postToRender = repost.original_post || repost;
        return (
          <div
            key={repost.id}
            className="p-4 border-b border-[#00000026] dark:border-[#292a2a]"
          >
            <PostItem post={postToRender} />
          </div>
        );
      })}
    </div>
  );
}

export default ProfileRepost;
