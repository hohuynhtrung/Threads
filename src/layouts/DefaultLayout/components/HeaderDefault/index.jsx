import { useLocation } from "react-router";
import { useCurrentUser } from "@/features/auth/hook";
import Icons from "@/assets/icons";
import Search from "@/layouts/DefaultLayout/components/Search";

function HeaderDefault() {
  const { pathname } = useLocation();
  const currentUser = useCurrentUser();
  const isLoggedIn = Boolean(currentUser);

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
        return <Search />;

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
    <div className="h-16 w-full flex items-center justify-center bg-white dark:border-zinc-800 dark:bg-[#101010]">
      {renderHeaderContent()}
    </div>
  );
}

export default HeaderDefault;
