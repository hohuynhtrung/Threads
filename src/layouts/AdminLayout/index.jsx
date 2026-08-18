import { Outlet } from "react-router";

import AppDownloadQR from "./components/AppDownloadQR";
import Images from "@/assets/images";
import HeaderAdmin from "./components/HeaderAdmin";
import InstagramLogin from "./components/InstagramLogin";
import Footer from "../components/Footer";

function AdminLayout() {
  return (
    <div className="relative min-h-screen w-full bg-white dark:bg-zinc-900 flex flex-col justify-between overflow-hidden">
      <div
        className={
          "absolute inset-0 hidden sm:block pointer-events-none bg-no-repeat md:bg-top lg:bg-size-[125%_auto] lg:bg-position-[center_bottom_350px]"
        }
        style={{ backgroundImage: `url(${Images.imgBgAdmin})` }}
      />
      <HeaderAdmin />
      <main className="relative z-10 my-auto flex flex-col items-center justify-center">
        <Outlet />
        <InstagramLogin />
      </main>
      <Footer />

      <div className="hidden md:block absolute right-10 bottom-10 z-20">
        <AppDownloadQR />
      </div>
    </div>
  );
}

export default AdminLayout;
