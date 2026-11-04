import { useRef } from "react";

import { useCurrentUser } from "@/features/auth/hook";

import CreatePostInput from "@/layouts/DefaultLayout/components/CreatePostInput";
import Posts from "@/layouts/DefaultLayout/components/Posts";
import Icons from "@/assets/icons";
import CustomScrollbar from "@/components/CustomScrollbar";

function Home() {
  const currentUser = useCurrentUser();
  const isLoggedIn = Boolean(currentUser);

  const scrollRef = useRef(null);

  return (
    <div className="w-160">
      {/* Header */}
      <div className="fixed top-0 z-20 w-160 flex items-center justify-between px-4 py-5 bg-white dark:bg-black">
        <h1 className="text-black dark:text-white font-semibold text-[20px]">
          {isLoggedIn ? "For you" : "Home"}
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

      {/* Main content */}
      <div className="pt-17.5">
        <div className="w-full h-[calc(100vh-71px)] border border-[#00000026] dark:border-[#2d2d2d] rounded-t-3xl overflow-hidden">
          <div
            ref={scrollRef}
            className="h-full overflow-y-auto scrollbar-none"
          >
            {currentUser && <CreatePostInput />}
            <Posts scrollRef={scrollRef} />
          </div>
        </div>
      </div>

      {/* Custom scrollbar */}
      <CustomScrollbar scrollRef={scrollRef} />
    </div>
  );
}

export default Home;
