import { useState } from "react";
import Sidebar from "@/page/Setting/components/Sidebar";
import Privacy from "@/page/Setting/components/Privacy";
import ContentPreferences from "@/page/Setting/components/ContentPreferences";
import AccountStatus from "@/page/Setting/components/AccountStatus";
import MoreSetting from "@/page/Setting/components/MoreSetting";
import Help from "@/page/Setting/components/Help";

function Setting() {
  const [activeTab, setActiveTab] = useState("privacy");

  return (
    <div className="w-full ml-37.5">
      {/* Page Header */}
      <h1 className="text-2xl font-bold text-black dark:text-white my-6">
        Privacy
      </h1>

      {/* Main Settings Content */}
      <div className="flex flex-col md:flex-row gap-6 items-start">
        {/* Left Sidebar */}
        <Sidebar activeTab={activeTab} onSelectTab={setActiveTab} />

        {/* Right Content View */}
        {activeTab === "meta" && (
          <div className="flex-1 min-h-75 bg-white dark:bg-[#101010] border border-gray-100 dark:border-[#262626] rounded-3xl p-6 flex items-center justify-center text-gray-400">
            Nội dung tab {activeTab} đang được phát triển...
          </div>
        )}
        {activeTab === "supervision" && (
          <div className="flex-1 min-h-75 bg-white dark:bg-[#101010] border border-gray-100 dark:border-[#262626] rounded-3xl p-6 flex items-center justify-center text-gray-400">
            Nội dung tab {activeTab} đang được phát triển...
          </div>
        )}
        {activeTab === "privacy" && <Privacy />}
        {activeTab === "content" && <ContentPreferences />}
        {activeTab === "status" && <AccountStatus />}
        {activeTab === "more" && <MoreSetting />}
        {activeTab === "help" && <Help />}
      </div>
    </div>
  );
}

export default Setting;
