import Images from "@/assets/images";
import { useState } from "react";
import { Link } from "react-router";

import { useCurrentUser } from "@/features/auth/hook";
import CreateThreadModal from "@/layouts/DefaultLayout/components/CreateThreadModal";

function CreatePostInput() {
  const [isOpenCreateModal, setIsOpenCreateModal] = useState(false);
  const handleOpenCreateThreadModal = () => {
    setIsOpenCreateModal(true);
  };
  const currentUser = useCurrentUser();

  return (
    <div className="flex items-center justify-between p-4 border-b border-[#00000026] dark:border-[#292a2a]">
      <div className="flex items-center gap-3 flex-1">
        <Link to={`/@${currentUser.username}`} className="w-9 h-9">
          <img
            src={Images.imgDefaultAvatar}
            alt="User Avatar"
            className="w-full rounded-[50%] object-cover cursor-pointer"
          />
        </Link>
        <span
          onClick={handleOpenCreateThreadModal}
          className="w-full text-gray-400 text-sm cursor-text mx-1"
        >
          What's new?
        </span>
      </div>

      <button
        onClick={handleOpenCreateThreadModal}
        className="px-4 py-2 bg-white dark:bg-zinc-800 text-black dark:text-white font-semibold text-[16px] rounded-[10px] border border-gray-200 dark:border-zinc-700 hover:opacity-80 transition cursor-pointer"
      >
        Post
      </button>
      <CreateThreadModal
        isOpen={isOpenCreateModal}
        onClose={() => setIsOpenCreateModal(false)}
      />
    </div>
  );
}

export default CreatePostInput;
