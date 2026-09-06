import {
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

const menuItemClass =
  "text-sm font-medium py-2.5 px-3 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-zinc-800 dark:text-white";

function MainMenu({ theme, onOpenAppearance, onLogout }) {
  return (
    <>
      <DropdownMenuItem
        onClick={(e) => {
          e.preventDefault();
          onOpenAppearance();
        }}
        className={`flex items-center justify-between ${menuItemClass}`}
      >
        <span>Appearance</span>
        <span className="text-xs capitalize text-gray-400">{theme}</span>
      </DropdownMenuItem>

      <DropdownMenuItem className={menuItemClass}>Settings</DropdownMenuItem>

      <DropdownMenuSeparator className="my-1 dark:bg-zinc-800" />

      <DropdownMenuItem className={menuItemClass}>Liked</DropdownMenuItem>
      <DropdownMenuItem className={menuItemClass}>Archive</DropdownMenuItem>

      <DropdownMenuSeparator className="my-1 dark:bg-zinc-800" />

      <DropdownMenuItem className={menuItemClass}>
        Report a problem
      </DropdownMenuItem>

      <DropdownMenuItem
        onClick={onLogout}
        className={`${menuItemClass} text-red-500 hover:bg-red-50 focus:text-red-500 dark:hover:bg-red-950/30`}
      >
        Log out
      </DropdownMenuItem>
    </>
  );
}

export default MainMenu;
