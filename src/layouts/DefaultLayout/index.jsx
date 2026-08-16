import { Outlet } from "react-router";

import SideBar from "@/layouts/DefaultLayout/components/SideBar";
import HeaderDefault from "@/layouts/DefaultLayout/components/HeaderDefault";
import CardAuth from "@/layouts/DefaultLayout/components/CardAuth";
import { useCurrentUser } from "@/features/auth/hook";

function DefaultLayout() {
  const currentUser = useCurrentUser();

  return (
    <div className="min-h-screen w-full bg-[#fafafa] flex justify-center">
      <aside className="fixed left-0 top-0 h-screen z-30 flex flex-col justify-between  bg-white border-r border-gray-100 sm:bg-transparent sm:border-none">
        <SideBar />
      </aside>
      <div className="flex justify-center w-full max-w-307.5">
        <main
          className={`${currentUser ? "ml-0" : "ml-20"} flex-1 min-h-screen max-w-160 w-full flex flex-col`}
        >
          <div className="bg-[#fafafa] border-none">
            <HeaderDefault />
          </div>

          <div className="flex-1 bg-white border-[#00000026] border rounded-3xl">
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
