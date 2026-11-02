import { ChevronRight, ExternalLink } from "lucide-react";

function Help() {
  const internalHelpItems = [
    { id: "privacy-security-help", label: "Privacy and security help" },
    { id: "support-requests", label: "Support requests" },
  ];

  const externalHelpItems = [
    { id: "help-center", label: "Help Center" },
    { id: "meta-privacy-policy", label: "Meta Privacy Policy" },
    { id: "meta-terms-of-use", label: "Meta Terms of Use" },
    {
      id: "threads-supplemental-policy",
      label: "Threads Supplemental Privacy Policy",
    },
    { id: "threads-terms-of-use", label: "Threads Terms of Use" },
    { id: "cookies-policy", label: "Cookies Policy" },
  ];

  return (
    <div className="flex-1 bg-white dark:bg-[#101010] border border-gray-100 dark:border-[#262626] rounded-3xl p-2 shadow-sm flex flex-col">
      {/* Nhóm trên */}
      <div className="flex flex-col pb-2 border-b border-gray-100 dark:border-[#1f1f1f]">
        {internalHelpItems.map((item) => (
          <button
            key={item.id}
            type="button"
            className="w-full flex items-center justify-between p-4 rounded-2xl hover:bg-gray-50 dark:hover:bg-[#181818] transition cursor-pointer text-left group"
          >
            <span className="text-[15px] font-medium text-black dark:text-[#e8eaeb]">
              {item.label}
            </span>
            <ChevronRight className="w-4 h-4 text-gray-400 dark:text-gray-500 group-hover:translate-x-0.5 transition-transform" />
          </button>
        ))}
      </div>

      {/* Nhóm dưới (Link mở tab mới) */}
      <div className="flex flex-col pt-2">
        {externalHelpItems.map((item) => (
          <button
            key={item.id}
            type="button"
            className="w-full flex items-center justify-between p-4 rounded-2xl hover:bg-gray-50 dark:hover:bg-[#181818] transition cursor-pointer text-left group"
          >
            <span className="text-[15px] font-medium text-black dark:text-[#e8eaeb]">
              {item.label}
            </span>
            <ExternalLink className="w-4 h-4 text-gray-400 dark:text-gray-500 group-hover:scale-105 transition-transform" />
          </button>
        ))}
      </div>
    </div>
  );
}

export default Help;
