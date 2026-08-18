import { Link, useLocation } from "react-router";
import Icons from "@/assets/icons";
import { useCurrentUser } from "@/features/auth/hook";

const MAIN_NAV_ITEMS = [
  {
    id: "home",
    label: "Home",
    icon: Icons.iconHome,
    iconActive: Icons.iconHomeActive,
    path: "/",
  },
  { id: "search", label: "Search", icon: Icons.iconSearch, path: "/search" },
  { id: "create", label: "Create", icon: Icons.iconPlus, path: "/create" },
  {
    id: "activity",
    label: "Notifications",
    icon: Icons.iconHeart,
    path: "/activity",
  },
  {
    id: "profile",
    label: "Profile",
    icon: Icons.iconProfile,
    path: "/profile",
  },
];

const AUTH_MAIN_NAV_ITEMS = [
  {
    id: "home",
    label: "For you",
    icon: Icons.iconHome,
    iconActive: Icons.iconHomeActive,
    path: "/",
  },
  { id: "create", label: "New thread", icon: Icons.iconPlus, path: "/create" },
  { id: "search", label: "Search", icon: Icons.iconSearch, path: "/search" },
  {
    id: "messages",
    label: "Messages",
    icon: Icons.iconMessage,
    path: "/messages",
  },
  {
    id: "activity",
    label: "Activity",
    icon: Icons.iconHeart,
    path: "/activity",
  },
  {
    id: "profile",
    label: "Profile",
    icon: Icons.iconProfile,
    path: "/profile",
  },
  {
    id: "insights",
    label: "Insights",
    icon: Icons.iconInsights,
    path: "/insights",
  },
  {
    id: "saved",
    label: "Saved",
    icon: Icons.iconSaved,
    path: "/saved",
  },
];

const BOTTOM_NAV_ITEMS = [
  { id: "pin", label: "Pin", icon: Icons.iconPin, path: "/pinned" },
  { id: "more", label: "More", icon: Icons.iconMore, path: "#" },
];

const AUTH_BOTTOM_NAV_ITEMS = [
  { id: "more", label: "More", icon: Icons.iconMore, path: "#" },
];

function SideBar() {
  const { pathname } = useLocation();
  const currentUser = useCurrentUser();
  const isLoggedIn = Boolean(currentUser);

  const navMainItems = isLoggedIn ? AUTH_MAIN_NAV_ITEMS : MAIN_NAV_ITEMS;
  const navBottomItems = isLoggedIn ? AUTH_BOTTOM_NAV_ITEMS : BOTTOM_NAV_ITEMS;

  const renderNavItem = (item) => {
    const isActive = pathname === item.path;
    const currentIcon =
      isActive && item.iconActive ? item.iconActive : item.icon;

    return (
      <Link
        key={item.id}
        to={item.path}
        title={!isLoggedIn ? item.label : undefined}
        className={`flex items-center gap-3 p-2 rounded-xl hover:bg-gray-500/10 active:scale-95 transition-all duration-200 group ${
          isLoggedIn
            ? `justify-start w-full ${isActive ? "bg-gray-500/10" : ""}`
            : "justify-center"
        }`}
      >
        <img
          src={currentIcon}
          alt={item.label}
          className={`h-6 w-6 object-contain transition-all duration-200 ${
            isActive || isLoggedIn
              ? "opacity-100"
              : "opacity-40 group-hover:opacity-70"
          }`}
        />

        {isLoggedIn && (
          <span
            className={`text-sm leading-none select-none transition-colors text-black ${
              isActive ? "font-semibold" : "font-normal"
            }`}
          >
            {item.label}
          </span>
        )}
      </Link>
    );
  };

  return (
    <aside
      className={`h-screen flex flex-col justify-between transition-all duration-300 py-3 ${
        isLoggedIn ? "w-56 items-start px-4" : "w-16 sm:w-20 items-center"
      }`}
    >
      <div
        className={`w-full flex ${
          isLoggedIn ? "items-start justify-start px-1" : "justify-center"
        } mb-2`}
      >
        <Link
          to="/"
          className="transition-transform duration-200 hover:scale-105"
        >
          <img
            src={isLoggedIn ? Icons.iconThreadsText : Icons.iconThread}
            alt="Threads Logo"
            className="h-8 object-contain"
          />
        </Link>
      </div>

      <nav
        className={`flex flex-col ${isLoggedIn ? "w-full gap-1" : "w-fit gap-7"}`}
      >
        {navMainItems.map(renderNavItem)}

        {isLoggedIn && (
          <div className="flex flex-col mt-6 gap-1">
            <div className="flex justify-between px-2 mb-1">
              <span className="text-xs text-gray-500 font-medium">Feeds</span>
              <span className="text-xs text-gray-500 font-medium cursor-pointer hover:underline">
                Edit
              </span>
            </div>

            <Link
              to="/following"
              className="flex items-center text-sm p-2 rounded-xl text-black hover:bg-gray-500/10 active:scale-95 transition-all duration-200 justify-start w-full"
            >
              <span>Following</span>
            </Link>

            <Link
              to="/ghost-posts"
              className="flex items-center justify-between text-sm p-2 rounded-xl text-black hover:bg-gray-500/10 active:scale-95 transition-all duration-200 w-full"
            >
              <span>Ghost posts</span>
              <img
                src={Icons.iconGhost}
                alt="Ghost"
                className="w-5 h-5 object-contain"
              />
            </Link>
          </div>
        )}
      </nav>

      <div className={`flex flex-col gap-2 ${isLoggedIn ? "w-full" : "w-fit"}`}>
        {navBottomItems.map(renderNavItem)}
      </div>
    </aside>
  );
}

export default SideBar;
