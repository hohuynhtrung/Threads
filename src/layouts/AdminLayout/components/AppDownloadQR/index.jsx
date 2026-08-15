import { useState, useEffect } from "react";
import { X } from "lucide-react";

function AppDownloadQR({ qrUrl = "https://threads.net" }) {
  const [isOpen, setIsOpen] = useState(false);

  // Tạo URL mã QR
  const qrApiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(
    qrUrl,
  )}`;

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      <div className="flex flex-col items-center gap-4">
        <span className="text-xs text-gray-400 font-normal">
          Scan to get the app
        </span>

        <div
          onClick={() => setIsOpen(true)}
          className="p-4 bg-white border border-gray-200 rounded-[28px] cursor-pointer shadow-[0_2px_8px_rgba(0,0,0,0.04)] flex items-center justify-center transition-all duration-300 ease-out hover:scale-105 hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)]"
        >
          <img
            src={qrApiUrl}
            alt="Scan QR"
            className="w-32 h-32 object-contain select-none"
          />
        </div>
      </div>

      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-white/90 backdrop-blur-md animate-in fade-in duration-200 cursor-pointer"
        >
          <button
            onClick={() => setIsOpen(false)}
            aria-label="Close modal"
            className="absolute top-6 left-6 p-2.5 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 transition-colors active:scale-95 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
          <div
            onClick={(e) => e.stopPropagation()}
            className="flex flex-col items-center gap-4 animate-in zoom-in-95 duration-200 cursor-default"
          >
            <div className="p-8 bg-white border border-gray-100 rounded-[36px] shadow-[0_10px_40px_rgba(0,0,0,0.08)] flex items-center justify-center">
              <img
                src={qrApiUrl}
                alt="Get the app QR"
                className="w-64 h-64 object-contain select-none"
              />
            </div>

            <span className="text-base font-bold text-black tracking-tight">
              Get the app
            </span>
          </div>
        </div>
      )}
    </>
  );
}

export default AppDownloadQR;
