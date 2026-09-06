import Icons from "@/assets/icons";

function StatCard({ title, value, percentage }) {
  return (
    <div className="bg-[#f5f5f5] dark:bg-[#181818] p-4 rounded-2xl flex flex-col justify-between border border-gray-100 dark:border-[#262626]">
      <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
        {title}
      </span>
      <div className="mt-2">
        <div className="text-xl font-bold dark:text-white">{value}</div>
        <div className="text-xs text-gray-400 mt-0.5">{percentage}</div>
      </div>
    </div>
  );
}

function InsightOverview() {
  return (
    <div className="w-full border-l border-l-gray-300 dark:border-neutral-800 h-full px-4 flex flex-col bg-white dark:bg-[#101010]">
      {/* Header */}
      <div className="flex items-center justify-between p-4 pb-3">
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-medium text-black dark:text-white">
            Overview
          </h1>
          <button className="flex items-center text-gray-500 text-lg hover:text-gray-700 dark:hover:text-gray-300">
            Last 30 days{" "}
            <img src={Icons.iconChevronDown} className="w-4 h-4 ml-2" />
          </button>
        </div>
        <button className="p-2 hover:bg-gray-100 dark:hover:bg-[#262626] rounded-full transition">
          <img
            src={Icons.iconMorePost}
            alt="More"
            title="More"
            className="w-5 h-5"
          />
        </button>
      </div>

      {/* Section 1: Summary */}
      <div className="border border-gray-200 dark:border-[#2d2d2d] rounded-t-3xl p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-lg dark:text-white">Summary</h3>
          <img
            src={Icons.iconInformation}
            alt="Info"
            title="Info"
            className="w-4 h-4"
          />
        </div>
        <div className="grid grid-cols-4 gap-3">
          <StatCard title="Views" value="0" percentage="0.0%" />
          <StatCard title="Viewers" value="0" percentage="0.0%" />
          <StatCard title="Net followers" value="+0" percentage="0.0%" />
          <StatCard title="Interactions" value="0" percentage="0.0%" />
        </div>
      </div>

      {/* Section 2: Viewers */}
      <div className="border border-gray-200 dark:border-[#2d2d2d] rounded-b-3xl p-5">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-bold text-lg dark:text-white">Viewers</h3>
          <img
            src={Icons.iconInformation}
            alt="Info"
            title="Info"
            className="w-4 h-4"
          />
        </div>

        <div className="mb-6">
          <div className="text-3xl font-bold dark:text-white">0</div>
          <div className="text-xs text-gray-400 mt-1">0.0%</div>
        </div>

        <h4 className="font-semibold text-sm dark:text-white mb-3">
          Viewer types
        </h4>
        <div className="grid grid-cols-2 gap-3">
          <StatCard title="Followers" value="0" percentage="0.0%" />
          <StatCard title="Non-followers" value="0" percentage="0.0%" />
        </div>
      </div>
    </div>
  );
}

export default InsightOverview;
