import { useState } from "react";
import Icons from "@/assets/icons";

function MessageSidebar() {
  const [tab, setTab] = useState("inbox");

  return (
    <aside className="w-full  border-l border-l-gray-300 dark:border-neutral-800 h-full flex flex-col bg-white dark:bg-[#101010]">
      {/* Header */}
      <div className="flex items-center justify-between p-4 pb-3">
        <h1 className="text-xl font-medium text-black dark:text-white">
          Messages
        </h1>
        <button className="cursor-pointer hover:bg-gray-100 p-2 rounded-[50%]">
          <img
            src={Icons.iconNewMessage}
            alt="New Message"
            className="w-5 h-5 dark:invert"
          />
        </button>
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

      {/* Tabs */}
      <div className="flex gap-2 px-4 pb-4">
        <button
          onClick={() => setTab("inbox")}
          className={`px-4 py-1.5 rounded-full text-sm font-semibold transition ${
            tab === "inbox"
              ? "bg-black text-white dark:bg-white dark:text-black"
              : "border border-gray-300 dark:border-neutral-700 text-black dark:text-white"
          }`}
        >
          Inbox
        </button>
        <button
          onClick={() => setTab("requests")}
          className={`px-4 py-1.5 rounded-full text-sm font-semibold transition ${
            tab === "requests"
              ? "bg-black text-white dark:bg-white dark:text-black"
              : "border border-gray-300 dark:border-neutral-700 text-black dark:text-white"
          }`}
        >
          Requests
        </button>
      </div>

      {/* Empty State / List Area */}
      <div className="flex-1 flex items-center justify-center p-4">
        <p className="text-gray-400 text-base font-semibold">No messages yet</p>
      </div>
    </aside>
  );
}

export default MessageSidebar;
