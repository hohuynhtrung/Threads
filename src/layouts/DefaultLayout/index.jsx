import { Outlet } from "react-router";

import SideBar from "@/layouts/DefaultLayout/components/SideBar";
import CardAuth from "@/layouts/DefaultLayout/components/CardAuth";
import { useCurrentUser } from "@/features/auth/hook";
import Footer from "@/layouts/components/Footer";

function DefaultLayout() {
  const currentUser = useCurrentUser();

  return (
    <div className="min-h-screen w-full bg-white dark:bg-[#101010] flex justify-center">
      <aside className="fixed left-0 top-0 h-screen z-30 flex flex-col justify-between  bg-white dark:bg-[#101010] border-r border-gray-100 dark:border-zinc-800 sm:bg-transparent sm:border-none sm:dark:bg-transparent">
        <SideBar />
      </aside>
      <div className="flex flex-col justify-center w-full max-w-307.5">
        <main
          className={`${currentUser ? "ml-0" : "ml-20"} flex-1 min-h-screen w-full flex flex-col`}
        >
          <div className="flex-1 flex justify-center bg-white dark:bg-[#101010]">
            <Outlet />
          </div>
        </main>
        {!currentUser && (
          <aside className=" h-screen sticky top-0">
            <CardAuth />
          </aside>
        )}
      </div>
    </div>
  );
}

export default DefaultLayout;
