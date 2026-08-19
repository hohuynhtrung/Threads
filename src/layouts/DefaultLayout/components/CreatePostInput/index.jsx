import Images from "@/assets/images";

function CreatePostInput({ onOpenModal }) {
  return (
    <div className="flex items-center justify-between p-4 border-b border-[#00000026] dark:border-[#292a2a]">
      <div className="flex items-center gap-3 flex-1">
        <img
          src={Images.imgDefaultAvatar}
          alt="User Avatar"
          className="w-9 h-9 rounded-[50%] cursor-pointer"
        />
        <span
          onClick={onOpenModal}
          className="w-full text-gray-400 text-sm cursor-text mx-1"
        >
          What's new?
        </span>
      </div>

      <button
        onClick={onOpenModal}
        className="px-4 py-2 bg-white dark:bg-zinc-800 text-black dark:text-white font-semibold text-[16px] rounded-[10px] border border-gray-200 dark:border-zinc-700 hover:opacity-80 transition cursor-pointer"
      >
        Post
      </button>
    </div>
  );
}

export default CreatePostInput;
