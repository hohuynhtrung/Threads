import Icons from "@/assets/icons";

export const MAIN_NAV_ITEMS = [
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
    path: "/login",
  },
];

export const AUTH_MAIN_NAV_ITEMS_TOP = [
  {
    id: "home",
    label: "For you",
    icon: Icons.iconHome,
    iconActive: Icons.iconHomeActive,
    path: "/",
  },
  { id: "create", label: "New thread", icon: Icons.iconPlus, path: "/create" },
  { id: "search", label: "Search", icon: Icons.iconSearch, path: "/search" },
];

export const AUTH_MAIN_NAV_ITEMS_BOTTOM = (username) => [
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
    path: username && `/@${username}`,
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

export const BOTTOM_NAV_ITEMS = [
  { id: "pin", label: "Pin", icon: Icons.iconPin, path: "/pinned" },
  { id: "more", label: "More", icon: Icons.iconMore, path: "#" },
];

export const AUTH_BOTTOM_NAV_ITEMS = [
  { id: "more", label: "More", icon: Icons.iconMore, path: "#" },
];
