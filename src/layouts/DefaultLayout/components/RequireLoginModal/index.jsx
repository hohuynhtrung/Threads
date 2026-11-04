import { useEffect, useState } from "react";
import Icons from "@/assets/icons";
import Images from "@/assets/images";
import { Link } from "react-router";

function RequireLoginModal({ isOpen, onClose, onInstagramLogin }) {
  const [render, setRender] = useState(isOpen);
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setRender(true);
      const timer = setTimeout(() => setActive(true), 10);
      return () => clearTimeout(timer);
    } else {
      setActive(false);
      const timer = setTimeout(() => setRender(false), 200);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!render) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className={`fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity duration-200 ease-out ${
          active ? "opacity-100" : "opacity-0"
        }`}
        onClick={onClose}
      />

      <div
        className={`relative z-10 w-full max-w-130 max-h-82.5 bg-white dark:bg-[#181818] rounded-[28px] px-14 py-12 text-center shadow-2xl border border-gray-100 dark:border-[#262626] transform transition-all duration-200 ease-out ${
          active
            ? "opacity-100 scale-100 translate-y-0"
            : "opacity-0 scale-95 translate-y-2"
        }`}
      >
        <h2 className="text-[28px] font-bold text-black dark:text-white tracking-tight leading-tight mb-3">
          Say more with Threads
        </h2>

        <p className="text-[15px] text-gray-500 dark:text-gray-400 leading-snug px-2 mb-8">
          Join Threads to share thoughts, find out what's going on, follow your
          people and more.
        </p>

        <Link
          to="/login"
          onClick={onInstagramLogin}
          className="w-full flex items-center justify-between p-4 border border-gray-200 dark:border-[#2d2d2d] rounded-2xl hover:bg-gray-50 dark:hover:bg-[#202020] transition active:scale-[0.98] cursor-pointer group"
        >
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0">
              <img
                src={Images.imgInstagram}
                alt="Instagram"
                className="w-12 h-12 object-contain"
              />
            </div>

            <div className="flex flex-col items-start text-left">
              <span className="text-[13px] text-gray-500 dark:text-gray-400 leading-none mb-1">
                Continue with Instagram
              </span>
            </div>
          </div>

          <img
            src={Icons.iconChevronRight}
            alt="Next"
            className="w-4 h-4 text-gray-400 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 transition dark:invert"
          />
        </Link>
      </div>
    </div>
  );
}

export default RequireLoginModal;
