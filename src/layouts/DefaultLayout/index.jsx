import { Outlet } from "react-router";

import SideBar from "@/layouts/DefaultLayout/components/SideBar";
import HeaderDefault from "@/layouts/DefaultLayout/components/HeaderDefault";
import CardAuth from "@/layouts/DefaultLayout/components/CardAuth";

function DefaultLayout() {
  return (
    <div className="min-h-screen w-full bg-[#fafafa] flex justify-center">
      <aside className="fixed left-0 top-0 h-screen z-30 flex flex-col justify-between  bg-white border-r border-gray-100 sm:bg-transparent sm:border-none">
        <SideBar />
      </aside>
      <div className="flex w-full max-w-307.5 pl-14 sm:pl-20 lg:pl-24">
        <div className="w-20"></div>
        <main className="flex-1 min-h-screen max-w-160 w-full flex flex-col">
          <div className="bg-[#fafafa] border-none">
            <HeaderDefault />
          </div>

          <div className="flex-1 bg-white border-[#00000026] border rounded-3xl">
            <Outlet />
          </div>
        </main>

        <aside className="hidden xl:flex flex-col w-95 h-screen sticky top-0 p-8 justify-center items-center">
          <CardAuth />
        </aside>
      </div>
    </div>
  );
}

export default DefaultLayout;
