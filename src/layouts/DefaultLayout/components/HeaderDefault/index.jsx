import { useLocation } from "react-router";
import { useCurrentUser } from "@/features/auth/hook";
import Icons from "@/assets/icons";

function HeaderDefault() {
  const { pathname } = useLocation();
  const currentUser = useCurrentUser();
  const isLoggedIn = Boolean(currentUser);

  // Hàm render tiêu đề và icon theo từng trang + trạng thái đăng nhập
  const renderHeaderContent = () => {
    switch (pathname) {
      case "/":
        return (
          <div className="flex items-center justify-between w-full px-4">
            <h1 className="text-black dark:text-white font-semibold text-[20px]">
              {isLoggedIn ? "For you" : "Home"}
            </h1>

            {isLoggedIn ? (
              <button className="hover:opacity-70 transition cursor-pointer">
                <img
                  src={Icons.iconMorePost}
                  alt="More"
                  className="w-6 h-6 dark:invert"
                />
              </button>
            ) : (
              <div className="w-6" />
            )}
          </div>
        );

      case "/search":
        return (
          <div className="flex items-center justify-between gap-3 w-full pr-4">
            <div className="flex-1 flex items-center gap-2 px-3 py-3 bg-gray-100 dark:bg-zinc-800 rounded-[25px] focus-within:border-gray-300 dark:focus-within:border-zinc-700 transition">
              <img
                src={Icons.iconSearch}
                alt="Search"
                className="w-4 h-4 opacity-40 dark:invert"
              />
              <input
                type="text"
                placeholder="Search"
                className="w-full bg-transparent text-sm border-none outline-none placeholder-gray-400 dark:placeholder-zinc-500 text-black dark:text-white p-0 focus:ring-0"
              />
            </div>

            <button className="hover:opacity-70 transition cursor-pointer p-1">
              <img
                src={Icons.iconMorePost}
                alt="More"
                className="w-6 h-6 dark:invert"
              />
            </button>
          </div>
        );

      case "/activity":
        return (
          <h1 className="text-black dark:text-white font-semibold text-[16px]">
            Notifications
          </h1>
        );

      case "/profile":
        return (
          <h1 className="text-black dark:text-white font-semibold text-[16px]">
            Profile
          </h1>
        );

      default:
        return (
          <h1 className="text-black dark:text-white font-semibold text-[16px]">
            Threads
          </h1>
        );
    }
  };

  return (
    <div className="h-16 w-full flex items-center justify-center bg-white dark:border-zinc-800">
      {renderHeaderContent()}
    </div>
  );
}

export default HeaderDefault;
