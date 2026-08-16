import React from "react";
import { Link } from "react-router";

import Images from "@/assets/images";

function CardAuth({ onContinueInstagram }) {
  return (
    <div className="hidden xl:flex flex-col justify-start w-95 bg-[#F5F5F5] p-4 mt-14 ml-5 rounded-[28px] items-center text-center border border-gray-200/60 shadow-sm select-none mx-auto">
      <h1 className="text-lg font-bold text-black tracking-tight">
        Log in or sign up for Threads
      </h1>
      <p className="text-sm text-gray-400 leading-relaxed mt-1 mb-6">
        See what people are talking about and join the conversation.
      </p>

      <button
        onClick={onContinueInstagram}
        className="w-full py-4 px-5 bg-white border border-gray-200/80 rounded-2xl flex items-center justify-center gap-3 hover:bg-gray-50 active:scale-[0.99] transition-all cursor-pointer shadow-[0_2px_6px_rgba(0,0,0,0.02)]"
      >
        <img src={Images.imgInstagram} alt="Instagram" className="w-10 h-10" />
        <span className="text-sm font-semibold text-black">
          Continue with Instagram
        </span>
      </button>

      <Link
        to="/login"
        className="mt-6 text-sm text-gray-600 font-normal transition-colors cursor-pointer"
      >
        Log in with username instead
      </Link>
    </div>
  );
}

export default CardAuth;
