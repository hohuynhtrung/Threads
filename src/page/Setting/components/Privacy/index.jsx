import Icons from "@/assets/icons";
import { ChevronRight } from "lucide-react";

function Privacy() {
  const privacyItems = [
    {
      id: "private-profile",
      label: "Private profile",
      badge: "Public",
      icon: Icons.iconPrivacy,
    },
    {
      id: "tags-mentions",
      label: "Tags and mentions",
      icon: Icons.iconTagMen,
    },
    {
      id: "online-status",
      label: "Online status",
      icon: Icons.iconUserOnl,
    },
    {
      id: "messages",
      label: "Messages",
      icon: Icons.iconMessage,
    },
    {
      id: "restricted-profiles",
      label: "Restricted profiles",
      icon: Icons.iconRestrict,
    },
    {
      id: "blocked-profiles",
      label: "Blocked profiles",
      icon: Icons.iconBlock,
    },
    {
      id: "private-likes",
      label: "Private likes",
      icon: Icons.iconHideLike,
    },
  ];

  return (
    <div className="flex-1 bg-white dark:bg-[#101010] border border-gray-100 dark:border-[#262626] rounded-3xl p-2 shadow-sm">
      <div className="flex flex-col">
        {privacyItems.map((item) => {
          return (
            <button
              key={item.id}
              type="button"
              className="w-full flex items-center justify-between p-4 rounded-2xl hover:bg-gray-50 dark:hover:bg-[#181818] transition cursor-pointer text-left group"
            >
              <div className="flex items-center gap-3.5">
                {item.icon && (
                  <img
                    src={item.icon}
                    alt={item.label}
                    className="w-6 h-6 shrink-0 object-contain opacity-80 dark:invert"
                  />
                )}
                <span className="text-[15px] font-medium text-black dark:text-[#e8eaeb]">
                  {item.label}
                </span>
              </div>

              <div className="flex items-center gap-2">
                {item.badge && (
                  <span className="text-[14px] text-gray-400 dark:text-gray-500 font-normal">
                    {item.badge}
                  </span>
                )}
                <ChevronRight className="w-4 h-4 text-gray-400 dark:text-gray-500 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default Privacy;
