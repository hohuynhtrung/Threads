import MessageChatArea from "@/page/Messages/component/MessageChatArea";
import MessageSidebar from "@/page/Messages/component/MessageSidebar";

function Messages() {
  return (
    <div className="w-full flex ml-37.5">
      <div className="w-[40%]">
        <MessageSidebar />
      </div>
      <div className="w-[60%]">
        <MessageChatArea />
      </div>
    </div>
  );
}

export default Messages;
