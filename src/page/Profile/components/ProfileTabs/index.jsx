const TABS = [
  { id: "threads", label: "Threads" },
  { id: "replies", label: "Replies" },
  { id: "media", label: "Media" },
  { id: "reposts", label: "Reposts" },
];

function ProfileTabs({ activeTab, onTabChange }) {
  return (
    <div className="flex border-b border-gray-200 dark:border-[#2d2d2d] mt-6 text-sm font-semibold">
      {TABS.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`flex-1 pb-3 text-center transition border-b-2 cursor-pointer ${
            activeTab === tab.id
              ? "border-black dark:border-white text-black dark:text-white"
              : "border-transparent text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}

export default ProfileTabs;
