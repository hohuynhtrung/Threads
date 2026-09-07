import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { cn } from "@/lib/utils";

import { getPost } from "@/services/post/postService";
import { useCurrentUser } from "@/features/auth/hook";
import CreateThreadModal from "@/layouts/DefaultLayout/components/CreateThreadModal";
import RequireLoginModal from "@/layouts/DefaultLayout/components/RequireLoginModel";
import Icons from "@/assets/icons";

import NavItem from "./NavItem";
import FeedsSection from "./FeedsSection";
import MoreMenu from "./MoreMenu";
import {
  MAIN_NAV_ITEMS,
  AUTH_MAIN_NAV_ITEMS_TOP,
  AUTH_MAIN_NAV_ITEMS_BOTTOM,
  BOTTOM_NAV_ITEMS,
  AUTH_BOTTOM_NAV_ITEMS,
} from "./navConfig";

function SideBar() {
  const { pathname } = useLocation();
  const currentUser = useCurrentUser();
  const isLoggedIn = Boolean(currentUser);
  const dispatch = useDispatch();

  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isRequireLoginOpen, setIsRequireLoginOpen] = useState(false);

  const navBottomItems = isLoggedIn ? AUTH_BOTTOM_NAV_ITEMS : BOTTOM_NAV_ITEMS;
  const navAuthBottomItems = AUTH_MAIN_NAV_ITEMS_BOTTOM(currentUser?.username);

  const handleItemClick = (e, item) => {
    if (!isLoggedIn) {
      if (item.id !== "home" && item.id !== "more" && item.id !== "search") {
        e.preventDefault();
        setIsRequireLoginOpen(true);
      }
      return;
    }

    if (item.id === "create") {
      e.preventDefault();
      setIsCreateOpen(true);
    } else if (item.id === "home") {
      dispatch(getPost());
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const renderNavItem = (item) => (
    <NavItem
      key={item.id}
      item={item}
      isActive={pathname === item.path}
      isLoggedIn={isLoggedIn}
      onClick={handleItemClick}
    />
  );

  return (
    <>
      <aside
        className={cn(
          "flex h-screen flex-col justify-between py-3 transition-all duration-300",
          isLoggedIn
            ? "w-56 items-start gap-3 px-4"
            : "w-16 items-center sm:w-20",
        )}
      >
        <div
          className={cn(
            "mb-2 flex w-full",
            isLoggedIn
              ? "mt-2 items-start justify-start px-1"
              : "justify-center",
          )}
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

        <nav
          className={cn(
            "flex flex-1 flex-col",
            isLoggedIn ? "w-full gap-1" : "flex w-fit justify-center gap-3",
          )}
        >
          {isLoggedIn ? (
            <>
              {AUTH_MAIN_NAV_ITEMS_TOP.map(renderNavItem)}
              <div className="mt-4 flex flex-col gap-1">
                {navAuthBottomItems.map(renderNavItem)}
              </div>
              <FeedsSection />
            </>
          ) : (
            MAIN_NAV_ITEMS.map(renderNavItem)
          )}
        </nav>

        <div
          className={cn("flex flex-col gap-2", isLoggedIn ? "w-full" : "w-fit")}
        >
          {isLoggedIn ? <MoreMenu /> : navBottomItems.map(renderNavItem)}
        </div>
      </aside>

      <CreateThreadModal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
      />
      <RequireLoginModal
        isOpen={isRequireLoginOpen}
        onClose={() => setIsRequireLoginOpen(false)}
      />
    </>
  );
}

export default SideBar;
