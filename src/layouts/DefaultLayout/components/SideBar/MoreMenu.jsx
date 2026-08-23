import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Icons from "@/assets/icons";
import { useTheme } from "@/context/ThemeContext";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { logoutUser } from "@/services/auth";

function MoreMenu() {
  const { theme, setTheme } = useTheme();
  const [currentView, setCurrentView] = useState("main");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    await dispatch(logoutUser());
    navigate("/login");
  };

  return (
    <DropdownMenu
      modal={false}
      onOpenChange={(open) => {
        if (!open) setCurrentView("main");
      }}
    >
      <DropdownMenuTrigger asChild>
        <button className="flex items-center gap-3 p-2 rounded-xl cursor-pointer hover:bg-gray-500/10 duration-200 w-full dark:hover:bg-gray-700/50">
          <img
            src={Icons.iconMore}
            alt="More"
            className="h-6 w-6 object-contain dark:invert"
          />
          <span className="text-sm text-black dark:text-white">More</span>
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        side="right"
        align="end"
        sideOffset={12}
        className="w-72 rounded-2xl p-2 bg-white dark:bg-zinc-900 shadow-xl border border-gray-100 dark:border-zinc-800"
        onCloseAutoFocus={(e) => e.preventDefault()}
      >
        {currentView === "main" && (
          <>
            <DropdownMenuItem
              onClick={(e) => {
                e.preventDefault();
                setCurrentView("appearance");
              }}
              className="flex items-center justify-between text-sm font-medium py-2.5 px-3 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-zinc-800 dark:text-white"
            >
              <span>Appearance</span>
              <span className="text-xs text-gray-400 capitalize">{theme}</span>
            </DropdownMenuItem>

            <DropdownMenuItem className="text-sm font-medium py-2.5 px-3 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-zinc-800 dark:text-white">
              Settings
            </DropdownMenuItem>

            <DropdownMenuSeparator className="my-1 dark:bg-zinc-800" />

            <DropdownMenuItem className="text-sm font-medium py-2.5 px-3 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-zinc-800 dark:text-white">
              Liked
            </DropdownMenuItem>

            <DropdownMenuItem className="text-sm font-medium py-2.5 px-3 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-zinc-800 dark:text-white">
              Archive
            </DropdownMenuItem>

            <DropdownMenuSeparator className="my-1 dark:bg-zinc-800" />

            <DropdownMenuItem className="text-sm font-medium py-2.5 px-3 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-zinc-800 dark:text-white">
              Report a problem
            </DropdownMenuItem>

            <DropdownMenuItem
              onClick={handleLogout}
              className="text-sm font-medium py-2.5 px-3 rounded-lg cursor-pointer text-red-500 focus:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30"
            >
              Log out
            </DropdownMenuItem>
          </>
        )}

        {currentView === "appearance" && (
          <div className="p-1">
            <div className="flex items-center justify-between pb-3 mb-2 border-b border-gray-100 dark:border-zinc-800">
              <button
                type="button"
                onClick={() => setCurrentView("main")}
                className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors"
              >
                <svg
                  className="w-5 h-5 text-gray-700 dark:text-gray-200"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  />
                </svg>
              </button>
              <span className="font-semibold text-sm text-gray-900 dark:text-white pr-6">
                Appearance
              </span>
              <div />
            </div>

            <div className="flex items-center justify-between bg-gray-100/80 dark:bg-zinc-800 p-1 rounded-xl">
              <button
                type="button"
                onClick={() => setTheme("light")}
                className={`flex-1 flex items-center justify-center py-2 rounded-lg transition-all ${
                  theme === "light"
                    ? "bg-white dark:bg-zinc-700 shadow-sm font-medium"
                    : "hover:bg-gray-200/50 dark:hover:bg-zinc-700/50 text-gray-500 dark:text-gray-400"
                }`}
              >
                <img
                  src={Icons.iconLightMode}
                  alt="Light"
                  className="h-5 w-5 object-contain dark:invert"
                />
              </button>

              <button
                type="button"
                onClick={() => setTheme("dark")}
                className={`flex-1 flex items-center justify-center py-2 rounded-lg transition-all ${
                  theme === "dark"
                    ? "bg-white dark:bg-zinc-700 shadow-sm font-medium"
                    : "hover:bg-gray-200/50 dark:hover:bg-zinc-700/50 text-gray-500 dark:text-gray-400"
                }`}
              >
                <img
                  src={Icons.iconDarkMode}
                  alt="Dark"
                  className="h-5 w-5 object-contain dark:invert"
                />
              </button>

              <button
                type="button"
                onClick={() => setTheme("system")}
                className={`flex-1 flex items-center justify-center py-2 text-sm transition-all ${
                  theme === "system"
                    ? "bg-white dark:bg-zinc-700 shadow-sm font-semibold text-black dark:text-white"
                    : "hover:bg-gray-200/50 dark:hover:bg-zinc-700/50 text-gray-500 dark:text-gray-400"
                }`}
              >
                Auto
              </button>
            </div>
          </div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default MoreMenu;
