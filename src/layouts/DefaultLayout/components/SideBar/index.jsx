import { useState } from "react";
import { Link, useLocation } from "react-router";

import Icons from "@/assets/icons";
import { useCurrentUser } from "@/features/auth/hook";
import NavItem from "./NavItem";
import FeedsSection from "./FeedsSection";
import {
  MAIN_NAV_ITEMS,
  AUTH_MAIN_NAV_ITEMS_TOP,
  AUTH_MAIN_NAV_ITEMS_BOTTOM,
  BOTTOM_NAV_ITEMS,
  AUTH_BOTTOM_NAV_ITEMS,
} from "./navConfig";
import MoreMenu from "@/layouts/DefaultLayout/components/SideBar/MoreMenu";
import CreateThreadModal from "@/layouts/DefaultLayout/components/CreateThreadModal";
import { useDispatch } from "react-redux";
import { getPost } from "@/services/post/postService";

function SideBar() {
  const { pathname } = useLocation();
  const currentUser = useCurrentUser();
  const isLoggedIn = Boolean(currentUser);
  const [isOpenCreateModal, setIsOpenCreateModal] = useState(false);

  const navBottomItems = isLoggedIn ? AUTH_BOTTOM_NAV_ITEMS : BOTTOM_NAV_ITEMS;

  const dispatch = useDispatch();

  const handleItemClick = (e, item) => {
    if (item.id === "create") {
      e.preventDefault();
      setIsOpenCreateModal(true);
    } else if (item.id === "home") {
      dispatch(getPost());
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <>
      <aside
        className={`h-screen flex flex-col justify-between transition-all duration-300 py-3 ${
          isLoggedIn
            ? "w-56 items-start gap-3 px-4"
            : "w-16 sm:w-20 items-center"
        }`}
      >
        {/* Logo */}
        <div
          className={`w-full flex ${
            isLoggedIn
              ? "items-start justify-start px-1 mt-2"
              : "justify-center"
          } mb-2`}
        >
          <Link
            to="/"
            className="transition-transform duration-200 hover:scale-105"
          >
            <img
              src={isLoggedIn ? Icons.iconThreadsText : Icons.iconThread}
              alt="Threads Logo"
              className="h-6 object-contain dark:invert"
            />
          </Link>
        </div>

        {/* Nav chính */}
        <nav
          className={`flex-1 flex flex-col ${
            isLoggedIn ? "w-full gap-1" : "w-fit gap-3 flex justify-center"
          }`}
        >
          {isLoggedIn ? (
            <>
              {AUTH_MAIN_NAV_ITEMS_TOP.map((item) => (
                <NavItem
                  key={item.id}
                  item={item}
                  isActive={pathname === item.path}
                  isLoggedIn={isLoggedIn}
                  onClick={handleItemClick}
                />
              ))}

              <div className="mt-4 flex flex-col gap-1">
                {AUTH_MAIN_NAV_ITEMS_BOTTOM.map((item) => (
                  <NavItem
                    key={item.id}
                    item={item}
                    isActive={pathname === item.path}
                    isLoggedIn={isLoggedIn}
                    onClick={handleItemClick}
                  />
                ))}
              </div>

              <FeedsSection />
            </>
          ) : (
            MAIN_NAV_ITEMS.map((item) => (
              <NavItem
                key={item.id}
                item={item}
                isActive={pathname === item.path}
                isLoggedIn={isLoggedIn}
                onClick={handleItemClick}
              />
            ))
          )}
        </nav>

        {/* Nav dưới cùng (More / Pin) */}
        <div
          className={`flex flex-col gap-2 ${isLoggedIn ? "w-full" : "w-fit"}`}
        >
          {isLoggedIn ? (
            <MoreMenu />
          ) : (
            navBottomItems.map((item) => (
              <NavItem
                key={item.id}
                item={item}
                isActive={pathname === item.path}
                isLoggedIn={isLoggedIn}
                onClick={handleItemClick}
              />
            ))
          )}
        </div>
      </aside>

      {/* Render Modal */}
      <CreateThreadModal
        isOpen={isOpenCreateModal}
        onClose={() => setIsOpenCreateModal(false)}
      />
    </>
  );
}

export default SideBar;
