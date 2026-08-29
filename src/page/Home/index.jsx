import { useState } from "react";

import { useCurrentUser } from "@/features/auth/hook";
import CreatePostInput from "@/layouts/DefaultLayout/components/CreatePostInput";

import Posts from "@/layouts/DefaultLayout/components/Posts";
import Icons from "@/assets/icons";
import Footer from "@/layouts/components/Footer";

function Home() {
  const currentUser = useCurrentUser();
  const isLoggedIn = Boolean(currentUser);

  return (
    <div className="flex flex-col w-160 mt-5">
      <div className="flex max-w-160 items-center justify-between w-full px-4">
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
      <div className="w-full h-full max-w-160 mt-5 border-[#00000026] dark:border-[#2d2d2d] border rounded-3xl mb-14">
        {currentUser && <CreatePostInput />}
        <Posts />
      </div>
      <Footer />
    </div>
  );
}

export default Home;
