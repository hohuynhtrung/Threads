import Icons from "@/assets/icons";
import { useCurrentUser, useFetchCurrentUser } from "@/features/auth/hook";
import { usePosts } from "@/features/post/hook";
import CreatePostInput from "@/layouts/DefaultLayout/components/CreatePostInput";
import ProfileInfo from "@/page/Profile/components/ProfileInfo";
import ProfilePost from "@/page/Profile/components/ProfilePost";
import ProfileReposts from "@/page/Profile/components/ProfileReposts";
import ProfileTabs from "@/page/Profile/components/ProfileTabs";
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";

function Profile() {
  useFetchCurrentUser();

  const currentUser = useCurrentUser();
  const location = useLocation();
  const { username } = useParams();
  const [activeTab, setActiveTab] = useState("threads");

  const profileUser = location.state?.user || currentUser;
  const profileUserId = profileUser?.id;
  const { posts, myPosts, loading, fetchPosts } = usePosts(profileUserId);

  useEffect(() => {
    if (posts.length === 0) {
      fetchPosts({ type: "for_you", page: 1 });
    }
  }, [fetchPosts, posts.length]);

  if (!profileUser) return null;

  const isOwnProfile = currentUser && profileUser?.id === currentUser.id;

  return (
    <div className="flex flex-col w-160 mt-5">
      <div className="flex max-w-160 items-center justify-between w-full px-4">
        <h1 className="text-black dark:text-white font-semibold text-[20px]">
          {profileUser.name}
        </h1>
        {isOwnProfile ? (
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
      <div className="w-full h-full max-w-160 mt-5 border-[#00000026] dark:border-[#2d2d2d] border rounded-3xl">
        <ProfileInfo user={profileUser} />
        <ProfileTabs activeTab={activeTab} onTabChange={setActiveTab} />
        <div className="flex flex-col items-center justify-center text-gray-400 text-sm">
          {activeTab === "threads" && <ProfilePost />}
          {activeTab === "replies" && <p>No replies yet.</p>}
          {activeTab === "media" && <p>No media posts yet.</p>}
          {activeTab === "reposts" && <ProfileReposts />}
        </div>
      </div>
    </div>
  );
}

export default Profile;
