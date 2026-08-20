import { useState } from "react";
import CreatePostInput from "@/layouts/DefaultLayout/components/CreatePostInput";
import CreateThreadModal from "@/layouts/DefaultLayout/components/CreateThreadModal";
import Posts from "@/layouts/DefaultLayout/components/Posts";
import { useCurrentUser } from "@/features/auth/hook";

function Home() {
  const [isOpenCreateModal, setIsOpenCreateModal] = useState(false);
  const currentUser = useCurrentUser();

  return (
    <div className="w-full">
      {currentUser && (
        <CreatePostInput onOpenModal={() => setIsOpenCreateModal(true)} />
      )}
      <Posts />
      <CreateThreadModal
        isOpen={isOpenCreateModal}
        onClose={() => setIsOpenCreateModal(false)}
      />
    </div>
  );
}

export default Home;
