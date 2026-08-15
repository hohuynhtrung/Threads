import Icons from "@/assets/icons";
import Images from "@/assets/images";
import React from "react";

export default function InstagramLoginButton() {
  return (
    <div className="w-full max-w-sm flex flex-col items-center gap-3 mt-4">
      {/* Divider: Line - OR - Line */}
      <div className="flex items-center justify-center w-full">
        <div className="h-px w-12 bg-gray-200" />
        <span className="px-3 text-sm text-gray-400 font-normal">or</span>
        <div className="h-px w-12 bg-gray-200" />
      </div>

      {/* Button Continue with Instagram */}
      <button
        type="button"
        className="w-full flex items-center justify-between p-4 bg-white border border-gray-200 rounded-2xl shadow-sm hover:bg-gray-50 transition-colors duration-200 group cursor-pointer"
      >
        <div className="flex items-center gap-3.5">
          <img
            src={Images.imgInstagram}
            alt="Instagram"
            className="w-13 h-13 object-contain"
          />

          <div className="flex flex-col items-start text-left">
            <span className="text-gray-500 text-sm font-medium ">
              Continue with Instagram
            </span>
          </div>
        </div>

        <img src={Icons.iconChevronRight} className="w-6 h-6 object-contain" />
      </button>
    </div>
  );
}
