import { useLocation } from "react-router";

// 1. Khai báo tiêu đề tương ứng với từng pathname
const PAGE_TITLES = {
  "/": "Home",
  "/search": "Search",
  "/activity": "Notifications",
  "/profile": "Profile",
};

function HeaderDefault() {
  const location = useLocation();

  const currentTitle = PAGE_TITLES[location.pathname] || "Threads";

  return (
    <div className="h-14 w-full flex items-center justify-center ">
      <h1 className="text-black font-semibold text-[16px]">{currentTitle}</h1>
    </div>
  );
}

export default HeaderDefault;
