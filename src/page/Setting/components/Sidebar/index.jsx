import Icons from "@/assets/icons";

function Sidebar({ activeTab = "privacy", onSelectTab }) {
  const menuItems = [
    {
      id: "meta",
      label: "Meta Account",
      subLabel:
        "Password, security, personal details, cross-profile experiences, ad preferences",
      icon: Icons.iconMetaAcc,
    },
    {
      id: "supervision",
      label: "Supervision for Teen Accounts",
      icon: Icons.iconHomeUser,
    },
    {
      id: "privacy",
      label: "Privacy",
      icon: Icons.iconPrivacy,
    },
    {
      id: "content",
      label: "Content preferences",
      icon: Icons.iconContentPre,
    },
    {
      id: "status",
      label: "Account status",
      icon: Icons.iconProfile,
    },
    {
      id: "more",
      label: "More settings",
      icon: Icons.iconAddOption,
    },
    {
      id: "help",
      label: "Help",
      icon: Icons.iconHelp,
    },
  ];

  return (
    <aside className="w-full md:w-[320px] flex flex-col pr-2">
      {menuItems.map((item) => {
        const isActive = activeTab === item.id;

        return (
          <button
            key={item.id}
            type="button"
            onClick={() => onSelectTab && onSelectTab(item.id)}
            className={`w-full flex items-center gap-3 p-3.5 rounded-2xl transition cursor-pointer text-left ${
              isActive
                ? "bg-gray-100 dark:bg-[#1f1f1f] text-black dark:text-white font-semibold"
                : "hover:bg-gray-50 dark:hover:bg-[#181818] text-gray-700 dark:text-gray-300 font-medium"
            }`}
          >
            {item.icon && (
              <img
                src={item.icon}
                title={item.label}
                className="w-6 h-6 shrink-0 mt-0.5 object-contain opacity-80 dark:invert"
              />
            )}

            <div className="flex flex-col">
              <span className="text-[15px] leading-tight">{item.label}</span>
              {item.subLabel && (
                <span className="text-[12px] text-gray-400 font-normal leading-snug mt-1 max-w-55">
                  {item.subLabel}
                </span>
              )}
            </div>
          </button>
        );
      })}
    </aside>
  );
}

export default Sidebar;
