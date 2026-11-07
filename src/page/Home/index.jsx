import { useCurrentUser } from "@/features/auth/hook";

import CreatePostInput from "@/layouts/DefaultLayout/components/CreatePostInput";
import Posts from "@/layouts/DefaultLayout/components/Posts";
import Icons from "@/assets/icons";

function Home() {
  const currentUser = useCurrentUser();
  const isLoggedIn = Boolean(currentUser);

  return (
    <div className="w-160">
      <div className="sticky top-0 z-20 w-160 h-17.5 flex items-center justify-between px-4 bg-white dark:bg-black">
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

      <div className="w-full border border-[#00000026] dark:border-[#2d2d2d] rounded-t-3xl">
        {currentUser && <CreatePostInput />}
        <Posts />
      </div>
    </div>
  );
}

export default Home;
