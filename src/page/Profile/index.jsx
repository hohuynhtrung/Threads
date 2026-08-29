import Icons from "@/assets/icons";
import { useCurrentUser, useFetchCurrentUser } from "@/features/auth/hook";
import CreatePostInput from "@/layouts/DefaultLayout/components/CreatePostInput";
import ProfileInfo from "@/page/Profile/ProfileInfo";
import ProfileTabs from "@/page/Profile/ProfileTabs";
import { useState } from "react";

function Profile() {
  // Gọi hook tự động fetch thông tin user khi component mount
  useFetchCurrentUser();

  const currentUser = useCurrentUser();
  const [activeTab, setActiveTab] = useState("threads");

  if (!currentUser) return;

  return (
    <div className="flex flex-col w-160 mt-5">
      <div className="flex max-w-160 items-center justify-between w-full px-4">
        <h1 className="text-black dark:text-white font-semibold text-[20px]">
          {currentUser.name}
        </h1>
        {currentUser ? (
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
        <ProfileInfo user={currentUser} />
        <ProfileTabs activeTab={activeTab} onTabChange={setActiveTab} />
        <CreatePostInput />
        <div className="flex flex-col items-center justify-center py-12 text-gray-400 text-sm">
          {activeTab === "threads" && <p>No threads posted yet.</p>}
          {activeTab === "replies" && <p>No replies yet.</p>}
          {activeTab === "media" && <p>No media posts yet.</p>}
          {activeTab === "reposts" && <p>No reposts yet.</p>}
        </div>
      </div>
    </div>
  );
}

export default Profile;
