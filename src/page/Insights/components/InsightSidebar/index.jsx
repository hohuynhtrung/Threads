import { useState } from "react";
import Icons from "@/assets/icons";

function InsightSidebar() {
  const [selectedFilter, setSelectedFilter] = useState("Threads");
  const [sortOption, setSortOption] = useState("Latest posts");

  return (
    <aside className="w-full border-l border-l-gray-300 dark:border-neutral-800 h-full flex flex-col bg-white dark:bg-[#101010]">
      {/* Header */}
      <div className="flex items-center justify-between p-4 pb-3">
        <h1 className="text-xl font-medium text-black dark:text-white">
          Insights
        </h1>
      </div>

      {/* Search Bar */}
      <div className="px-4 pb-3">
        <div className="flex items-center gap-2 px-3 py-2 bg-gray-100 dark:bg-neutral-900 rounded-2xl text-gray-500">
          <img
            src={Icons.iconSearch}
            className="w-5 h-5 opacity-30 dark:invert"
          />
          <input
            type="text"
            placeholder="Search"
            className="w-full bg-transparent text-sm focus:outline-none text-black dark:text-white placeholder-gray-400"
          />
        </div>
      </div>

      <div className="flex items-center gap-3 px-6 py-3 bg-[#f5f5f5] dark:bg-[#1e1e1e] cursor-pointer mb-6">
        <div className="p-4 rounded-[10px] bg-[#e7e7e7] dark:bg-[#2e2e2e] flex items-center justify-center">
          <img src={Icons.iconProfile} className="w-5 h-5" />
        </div>
        <div className="flex flex-col">
          <span className="font-semibold dark:text-white">Overview</span>
          <span className=" text-gray-500">
            Profile, viewer, and follower insights
          </span>
        </div>
      </div>

      <div className="flex items-center gap-2 px-6 mb-8">
        <button className="flex items-center gap-1.5 px-3 py-1.5 border border-gray-300 dark:border-[#333] rounded-xl text-xs font-medium dark:text-white hover:bg-gray-50 dark:hover:bg-[#1a1a1a] cursor-pointer">
          <span className="text-sm">
            <img
              src={Icons.iconFilterPosts}
              alt="Filter posts"
              title="Filter posts"
              className="w-4 h-4"
            />
          </span>{" "}
          Threads
        </button>
        <button className="flex items-center gap-1.5 px-3 py-1.5 border border-gray-300 dark:border-[#333] rounded-xl text-xs font-medium dark:text-white hover:bg-gray-50 dark:hover:bg-[#1a1a1a] cursor-pointer">
          {sortOption}{" "}
          <img
            src={Icons.iconChevronRight}
            alt="Sort posts"
            title="Sort posts"
            className="w-3 h-3"
          />
        </button>
      </div>

      {/* Empty State / List Area */}
      <div className="flex-1 flex items-center justify-center p-4">
        <p className="text-gray-400 text-base font-semibold">No threads yet</p>
      </div>
    </aside>
  );
}

export default InsightSidebar;
