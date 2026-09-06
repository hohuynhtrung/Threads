import { Link } from "react-router";
import { cn } from "@/lib/utils";

function NavItem({ item, isActive, isLoggedIn, onClick }) {
  const currentIcon = isActive && item.iconActive ? item.iconActive : item.icon;

  return (
    <Link
      to={item.path}
      onClick={(e) => onClick?.(e, item)}
      title={!isLoggedIn ? item.label : undefined}
      className={cn(
        "group flex items-center gap-3 p-2 rounded-xl transition-all duration-200 active:scale-95",
        "hover:bg-gray-500/10 dark:hover:bg-[#292a2a]",
        isLoggedIn
          ? cn(
              "w-full justify-start",
              isActive && "bg-gray-500/10 dark:bg-[#292a2a]",
            )
          : "justify-center",
      )}
    >
      <img
        src={currentIcon}
        alt={item.label}
        className={cn(
          "h-5 w-5 object-contain transition-all duration-200 dark:invert",
          isActive || isLoggedIn
            ? "opacity-100"
            : "opacity-40 group-hover:opacity-70",
        )}
      />

      {isLoggedIn && (
        <span
          className={cn(
            "select-none text-sm leading-none text-black transition-colors dark:text-white",
            isActive ? "font-semibold" : "font-normal",
          )}
        >
          {item.label}
        </span>
      )}
    </Link>
  );
}

export default NavItem;
