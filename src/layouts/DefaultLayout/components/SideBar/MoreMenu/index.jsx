import { useState } from "react";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Icons from "@/assets/icons";
import { useTheme } from "@/context/ThemeContext";
import { logoutUser } from "@/services/auth";

import MainMenu from "./MainMenu";
import AppearanceMenu from "./AppearanceMenu";

function MoreMenu() {
  const { theme, setTheme } = useTheme();
  const [view, setView] = useState("main");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    await dispatch(logoutUser());
    navigate("/");
  };

  return (
    <DropdownMenu
      modal={false}
      onOpenChange={(open) => !open && setView("main")}
    >
      <DropdownMenuTrigger asChild>
        <button className="flex w-full items-center gap-3 rounded-xl p-2 duration-200 hover:bg-gray-500/10 dark:hover:bg-gray-700/50">
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
        className="w-72 rounded-2xl border border-gray-100 bg-white p-2 shadow-xl dark:border-zinc-800 dark:bg-zinc-900"
        onCloseAutoFocus={(e) => e.preventDefault()}
      >
        {view === "main" ? (
          <MainMenu
            theme={theme}
            onOpenAppearance={() => setView("appearance")}
            onLogout={handleLogout}
          />
        ) : (
          <AppearanceMenu
            theme={theme}
            setTheme={setTheme}
            onBack={() => setView("main")}
          />
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default MoreMenu;
