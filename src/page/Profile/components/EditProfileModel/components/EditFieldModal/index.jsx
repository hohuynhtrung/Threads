import { useState, useEffect } from "react";

function EditFieldModal({ isOpen, fieldConfig, onClose, onSave }) {
  const [value, setValue] = useState("");

  useEffect(() => {
    if (fieldConfig) {
      setValue(fieldConfig.initialValue || "");
    }
  }, [fieldConfig, isOpen]);

  if (!isOpen || !fieldConfig) return null;

  const handleSaveClick = () => {
    onSave(fieldConfig.name, value);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs animate-in fade-in duration-200 p-4"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-lg bg-white dark:bg-[#181818] rounded-3xl shadow-2xl border border-gray-100 dark:border-[#2d2d2d] overflow-hidden flex flex-col animate-in zoom-in-95 duration-150"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-[#2d2d2d]">
          <button
            type="button"
            onClick={onClose}
            className="text-gray-500 hover:text-black dark:hover:text-white transition cursor-pointer text-[15px]"
          >
            Cancel
          </button>
          <span className="font-bold text-[16px] text-black dark:text-white">
            {fieldConfig.title}
          </span>
          <button
            type="button"
            onClick={handleSaveClick}
            className="font-bold text-black dark:text-white hover:opacity-70 transition cursor-pointer text-[15px]"
          >
            Done
          </button>
        </div>

        {/* Content Input - Text to hơn 1px (dùng text-[15px] thay vì text-sm) */}
        <div className="p-6 flex flex-col gap-2">
          <label className="font-semibold text-[15px] text-black dark:text-white">
            {fieldConfig.label}
          </label>
          {fieldConfig.isTextarea ? (
            <textarea
              rows={4}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="w-full bg-transparent text-[15px] text-gray-800 dark:text-gray-200 focus:outline-none resize-none border border-gray-200 dark:border-zinc-700 rounded-xl p-3"
              placeholder={fieldConfig.placeholder}
              autoFocus
            />
          ) : (
            <input
              type="text"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="w-full bg-transparent text-[15px] text-gray-800 dark:text-gray-200 focus:outline-none border border-gray-200 dark:border-zinc-700 rounded-xl p-3"
              placeholder={fieldConfig.placeholder}
              autoFocus
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default EditFieldModal;
