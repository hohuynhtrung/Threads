import { ChevronRight } from "lucide-react";

function MoreSetting() {
  const moreSettingsItems = [
    {
      id: "fediverse",
      label: "Fediverse sharing",
      badge: "BETA",
      trailingText: "Off",
    },
    { id: "website-permissions", label: "Website permissions" },
    { id: "threads-friends", label: "Threads Friends" },
  ];

  return (
    <div className="flex-1 bg-white dark:bg-[#101010] border border-gray-100 dark:border-[#262626] rounded-3xl p-2 shadow-sm">
      <div className="flex flex-col">
        {moreSettingsItems.map((item) => (
          <button
            key={item.id}
            type="button"
            className="w-full flex items-center justify-between p-4 rounded-2xl hover:bg-gray-50 dark:hover:bg-[#181818] transition cursor-pointer text-left group"
          >
            <div className="flex items-center gap-3">
              <span className="text-[15px] font-medium text-black dark:text-[#e8eaeb]">
                {item.label}
              </span>
              {item.badge && (
                <span className="text-[11px] font-semibold bg-gray-100 dark:bg-zinc-800 text-gray-600 dark:text-gray-300 px-2 py-0.5 rounded-md">
                  {item.badge}
                </span>
              )}
            </div>

            <div className="flex items-center gap-2">
              {item.trailingText && (
                <span className="text-[14px] text-gray-400 dark:text-gray-500 font-normal">
                  {item.trailingText}
                </span>
              )}
              <ChevronRight className="w-4 h-4 text-gray-400 dark:text-gray-500 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

export default MoreSetting;
