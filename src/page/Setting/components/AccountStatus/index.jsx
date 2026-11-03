import { useSelector } from "react-redux";
import { Check, ChevronRight } from "lucide-react";
import Images from "@/assets/images";

function AccountStatus() {
  // Lấy thông tin user đang đăng nhập từ Redux store
  const currentUser = useSelector((state) => state.auth?.currentUser);

  const statusItems = [
    { id: "removed-content", label: "Removed content and messaging issues" },
    { id: "lowered-content", label: "Content lowered in feed" },
    { id: "features-unavailable", label: "Features you can't use" },
  ];

  return (
    <div className="flex-1 bg-white dark:bg-[#101010] border border-gray-100 dark:border-[#262626] rounded-3xl p-6 shadow-sm flex flex-col gap-6">
      {/* User Info Card - Lấy dữ liệu thật từ currentUser */}
      <div className="flex items-center gap-4 p-4 border border-gray-200 dark:border-[#2d2d2d] rounded-2xl">
        <img
          src={currentUser?.avatar_url || Images.imgDefaultAvatar}
          alt={currentUser?.name || "Avatar"}
          className="w-12 h-12 rounded-full object-cover"
        />
        <div className="flex flex-col">
          <span className="font-semibold text-black dark:text-[#e8eaeb] text-[15px]">
            {currentUser?.username
              ? `@${currentUser.username}`
              : currentUser?.name
                ? `@${currentUser.name}`
                : "@username"}
          </span>
          <span className="text-gray-400 text-[14px]">
            {currentUser?.name || "User Name"}
          </span>
        </div>
      </div>

      {/* Actions We've Taken Section */}
      <div className="flex flex-col gap-2">
        <h3 className="font-semibold text-black dark:text-white text-[16px]">
          Actions we've taken
        </h3>
        <p className="text-[13px] text-gray-400 leading-snug">
          See any actions Threads has taken when your profile or content doesn't
          follow our guidelines.{" "}
          <span className="text-black dark:text-white underline cursor-pointer font-medium">
            Learn more
          </span>
        </p>
      </div>

      {/* Status List */}
      <div className="flex flex-col">
        {statusItems.map((item) => (
          <button
            key={item.id}
            type="button"
            className="w-full flex items-center justify-between py-4 border-b border-gray-100 dark:border-[#1f1f1f] hover:bg-gray-50 dark:hover:bg-[#181818] transition cursor-pointer text-left group px-2 rounded-xl"
          >
            <span className="text-[15px] font-medium text-black dark:text-[#e8eaeb]">
              {item.label}
            </span>

            <div className="flex items-center gap-3">
              <div className="w-5 h-5 rounded-full bg-black dark:bg-white text-white dark:text-black flex items-center justify-center shrink-0">
                <Check className="w-3 h-3 stroke-3" />
              </div>
              <ChevronRight className="w-4 h-4 text-gray-400 dark:text-gray-500 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

export default AccountStatus;
