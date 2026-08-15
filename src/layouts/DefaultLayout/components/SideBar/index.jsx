import Icons from "@/assets/icons";
import { Link, useLocation } from "react-router";

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

const BOTTOM_NAV_ITEMS = [
  { id: "pin", label: "Pin", icon: Icons.iconPin, path: "/pinned" },
  { id: "more", label: "More", icon: Icons.iconMore, path: "#" },
];

function SideBar({ isLoggedIn = false }) {
  const location = useLocation();

  const renderNavItem = (item) => {
    const isActive = location.pathname === item.path;

    const currentIcon =
      isActive && item.iconActive ? item.iconActive : item.icon;

    return (
      <Link
        key={item.id}
        to={item.path}
        title={!isLoggedIn ? item.label : undefined}
        className={`flex items-center p-3 rounded-xl hover:bg-gray-500/10 active:scale-95 transition-all duration-200 group ${
          isLoggedIn ? "justify-start w-full" : "justify-center"
        }`}
      >
        <img
          src={currentIcon}
          alt={item.label}
          className={`h-5 w-5 object-contain transition-all duration-200  ${
            isActive ? "opacity-100" : "opacity-40 group-hover:opacity-70"
          }`}
        />

        {isLoggedIn && (
          <span
            className={`text-base leading-none select-none transition-colors ${
              isActive
                ? "font-bold text-black"
                : "font-normal text-gray-500 group-hover:text-gray-900"
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
        isLoggedIn ? "w-56 items-start px-2" : "w-16 sm:w-20 items-center"
      }`}
    >
      <div
        className={`w-full flex ${
          isLoggedIn ? "justify-start px-1" : "justify-center"
        } mb-2`}
      >
        <Link
          to="/"
          className="p-2 transition-transform duration-200 hover:scale-105"
        >
          <img
            src={Icons.iconThread}
            alt="Threads Logo"
            className="h-8 w-8 object-contain"
          />
        </Link>
      </div>

      <nav className="flex flex-col gap-4 w-fit">
        {MAIN_NAV_ITEMS.map(renderNavItem)}
      </nav>

      <div className="flex flex-col gap-4 w-fit">
        {BOTTOM_NAV_ITEMS.map(renderNavItem)}
      </div>
    </aside>
  );
}

export default SideBar;
