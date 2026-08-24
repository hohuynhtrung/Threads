import React from "react";
import Icons from "@/assets/icons";

export default function MessageChatArea() {
  return (
    <section className="flex-1 h-full flex flex-col items-center justify-center border-l border-l-gray-300 p-6 bg-white dark:bg-[#101010] text-center">
      <div className="flex flex-col items-center max-w-sm">
        <div className="w-20 h-20 rounded-full bg-gray-100 dark:bg-neutral-800 flex items-center justify-center mb-4 opacity-50">
          <img
            src={Icons.iconMessage}
            alt="Message"
            className="w-10 h-10 dark:invert"
          />
        </div>

        <h2 className="text-xl font-bold text-black dark:text-white mb-1">
          Keep it real in direct messages
        </h2>

        <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
          Start a side conversation, send threads and more.
        </p>

        <button className="px-5 py-2.5 bg-black hover:bg-neutral-800 text-white dark:bg-white dark:text-black dark:hover:bg-gray-200 font-semibold rounded-xl text-sm transition">
          New message
        </button>
      </div>
    </section>
  );
}
