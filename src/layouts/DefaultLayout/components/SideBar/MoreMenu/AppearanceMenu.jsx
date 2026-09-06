import Icons from "@/assets/icons";
import { cn } from "@/lib/utils";

const THEME_OPTIONS = [
  { value: "light", icon: Icons.iconLightMode, isImage: true },
  { value: "dark", icon: Icons.iconDarkMode, isImage: true },
  { value: "system", label: "Auto", isImage: false },
];

function ThemeButton({ option, isActive, onSelect }) {
  return (
    <button
      type="button"
      onClick={() => onSelect(option.value)}
      className={cn(
        "flex flex-1 items-center justify-center rounded-lg py-2 transition-all",
        isActive
          ? "bg-white font-medium shadow-sm dark:bg-zinc-700"
          : "text-gray-500 hover:bg-gray-200/50 dark:text-gray-400 dark:hover:bg-zinc-700/50",
        !option.isImage &&
          isActive &&
          "text-sm font-semibold text-black dark:text-white",
      )}
    >
      {option.isImage ? (
        <img
          src={option.icon}
          alt={option.value}
          className="h-5 w-5 object-contain dark:invert"
        />
      ) : (
        option.label
      )}
    </button>
  );
}

function BackIcon() {
  return (
    <svg
      className="h-5 w-5 text-gray-700 dark:text-gray-200"
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
  );
}

function AppearanceMenu({ theme, setTheme, onBack }) {
  return (
    <div className="p-1">
      <div className="mb-2 flex items-center justify-between border-b border-gray-100 pb-3 dark:border-zinc-800">
        <button
          type="button"
          onClick={onBack}
          className="rounded-full p-1 transition-colors hover:bg-gray-100 dark:hover:bg-zinc-800"
        >
          <BackIcon />
        </button>
        <span className="pr-6 text-sm font-semibold text-gray-900 dark:text-white">
          Appearance
        </span>
        <div />
      </div>

      <div className="flex items-center justify-between rounded-xl bg-gray-100/80 p-1 dark:bg-zinc-800">
        {THEME_OPTIONS.map((option) => (
          <ThemeButton
            key={option.value}
            option={option}
            isActive={theme === option.value}
            onSelect={setTheme}
          />
        ))}
      </div>
    </div>
  );
}

export default AppearanceMenu;
