function DeleteConfirmModal({ isOpen, onClose, onConfirm }) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={(e) => {
        e.stopPropagation();
        onClose();
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-sm bg-white dark:bg-[#181818] rounded-3xl shadow-2xl border border-gray-100 dark:border-[#2d2d2d] overflow-hidden flex flex-col text-center pt-6 animate-in zoom-in-95 duration-150"
      >
        {/* Tiêu đề & Nội dung */}
        <div className="px-6 pb-6 border-b border-gray-200 dark:border-[#2d2d2d]">
          <h3 className="text-lg font-bold text-black dark:text-white mb-2">
            Delete post?
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            If you delete this post, all connected posts will also be hidden.
          </p>
        </div>
        <div className="flex">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-3.5 text-sm font-semibold text-black dark:text-white hover:bg-gray-50 dark:hover:bg-[#262626] transition cursor-pointer border-r border-gray-200 dark:border-[#2d2d2d]"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="flex-1 py-3.5 text-sm font-semibold text-red-500 hover:bg-gray-50 dark:hover:bg-[#262626] transition cursor-pointer"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteConfirmModal;
