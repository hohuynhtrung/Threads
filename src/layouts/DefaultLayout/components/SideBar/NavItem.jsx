import { Link } from "react-router";

function NavItem({ item, isActive, isLoggedIn, onClick }) {
  const currentIcon = isActive && item.iconActive ? item.iconActive : item.icon;

  const handleClick = (e) => {
    if (onClick) {
      onClick(e, item);
    }
  };

  return (
    <Link
      to={item.path}
      onClick={handleClick}
      title={!isLoggedIn ? item.label : undefined}
      className={`flex items-center gap-3 p-2 rounded-xl hover:bg-gray-500/10 dark:hover:bg-[#292a2a] active:scale-95 transition-all duration-200 group ${
        isLoggedIn
          ? `justify-start w-full ${isActive ? "bg-gray-500/10 dark:bg-[#292a2a]" : ""}`
          : "justify-center"
      }`}
    >
      <img
        src={currentIcon}
        alt={item.label}
        className={`h-5 w-5 object-contain transition-all duration-200 dark:invert ${
          isActive || isLoggedIn
            ? "opacity-100"
            : "opacity-40 group-hover:opacity-70"
        }`}
      />

      {isLoggedIn && (
        <span
          className={`text-sm leading-none select-none transition-colors text-black dark:text-white ${
            isActive ? "font-semibold" : "font-normal"
          }`}
        >
          {item.label}
        </span>
      )}
    </Link>
  );
}

export default NavItem;
