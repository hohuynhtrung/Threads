import { useState } from "react";
import Images from "@/assets/images";
import Icons from "@/assets/icons";

function EmbedModal({ isOpen, onClose, post }) {
  const [copied, setCopied] = useState(false);

  if (!isOpen || !post) return null;

  const postId = post.id;
  const user = post.user || {};
  const username = user.username || user.name || "user";
  const postUrl = `${window.location.origin}/post/${postId}`;
  const content = post.content || "";

  // Tạo đoạn Embed HTML chuẩn phong cách Threads
  const embedCode = `<blockquote class="text-post-media" data-text-post-permalink="${postUrl}" data-text-post-version="0" id="ig-tp-${postId}" style=" background:#FFF; border-width: 1px; border-style: solid; border-color: #00000026; border-radius: 16px; max-width:650px; margin: 1px; min-width:270px; padding:0; width:99.375%; width:-webkit-calc(100% - 2px); width:calc(100% - 2px);"> <a href="${postUrl}" style=" background:#FFFFFF; line-height:0; padding:0 0; text-align:center; text-decoration:none; width:100%; font-family: -apple-system, BlinkMacSystemFont, sans-serif;" target="_blank"> <div style=" padding: 40px; display: flex; flex-direction: column; align-items: center;"><div style=" display:block; height:32px; width:32px; padding-bottom:20px;"> <svg aria-label="Threads" height="32px" role="img" viewBox="0 0 192 192" width="32px" xmlns="http://www.w3.org/2000/svg"> <path d="M141.537 88.9883C140.71 88.5919 139.87 88.2104 139.019 87.8451C137.537 60.5382 122.616 44.905 97.5619 44.745C97.4484 44.7443 97.3355 44.7443 97.222 44.7443C82.2364 44.7443 69.7731 51.1409 62.102 62.7807L75.881 72.2328C81.6116 63.5383 90.6052 61.6848 97.2286 61.6848C97.3051 61.6848 97.3819 61.6848 97.4576 61.6855C105.707 61.7381 111.932 64.1366 115.961 68.814C118.893 72.2193 120.854 76.925 121.825 82.8638C114.511 81.6207 106.601 81.2385 98.145 81.7233C74.3247 83.0954 59.0111 96.9879 60.0396 116.292C60.5615 126.084 65.4397 134.508 73.775 140.011C80.8224 144.663 89.899 146.938 99.3323 146.423C111.79 145.74 121.563 140.987 128.381 132.296C133.559 125.696 136.834 117.143 138.28 106.366C144.217 109.949 148.617 114.664 151.047 120.332C155.179 129.967 155.42 145.8 142.501 158.708C131.182 170.016 117.576 174.908 97.0135 175.059C74.2042 174.89 56.9538 167.575 45.7381 153.317C35.2355 139.966 29.8077 120.682 29.6052 96C29.8077 71.3178 35.2355 52.0336 45.7381 38.6827C56.9538 24.4249 74.2039 17.11 97.0132 16.9405C119.988 17.1113 137.539 24.4614 149.184 38.788C154.894 45.8136 159.199 54.6488 162.037 64.9503L178.184 60.6422C174.744 47.9622 169.331 37.0357 161.965 27.974C147.036 9.60668 125.202 0.195148 97.0695 0H96.9569C68.8816 0.19447 47.2921 9.6418 32.7883 28.0793C19.8819 44.4864 13.2244 67.3157 13.0007 95.9325L13 96L13.0007 96.0675C13.2244 124.684 19.8819 147.514 32.7883 163.921C47.2921 182.358 68.8816 191.806 96.9569 192H97.0695C122.03 191.827 139.624 185.292 154.118 170.811C173.081 151.866 172.51 128.119 166.26 113.541C161.776 103.087 153.227 94.5962 141.537 88.9883ZM98.4405 129.507C88.0005 130.095 77.1544 125.409 76.6196 115.372C76.2232 107.93 81.9158 99.626 99.0812 98.6368C101.047 98.5234 102.976 98.468 104.871 98.468C111.106 98.468 116.939 99.0737 122.242 100.233C120.264 124.935 108.662 128.946 98.4405 129.507Z" /></svg></div><div style=" font-size: 15px; line-height: 21px; color: #000000; font-weight: 600; "> View on Threads</div></div>$</a></blockquote><script async src="${window.location.origin}/embed.js"></script>`;

  const handleCopyEmbed = () => {
    navigator.clipboard.writeText(embedCode);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

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
        className="w-full max-w-lg bg-white dark:bg-[#181818] rounded-3xl shadow-2xl border border-gray-100 dark:border-[#2d2d2d] overflow-hidden flex flex-col p-6 animate-in zoom-in-95 duration-150"
      >
        <div className="border border-gray-200 dark:border-[#2d2d2d] rounded-2xl p-4 mb-4 bg-white dark:bg-[#181818] text-left">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-800 shrink-0">
                <img
                  src={user.avatar_url || Images.imgDefaultAvatar}
                  alt={username}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex items-center gap-1.5">
                <span className="font-semibold text-sm text-black dark:text-white">
                  {username}
                </span>
                <span className="text-gray-400 text-sm">·</span>
                <span className="text-sm font-semibold text-black dark:text-white cursor-pointer hover:underline">
                  Follow
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-gray-200 dark:border-[#2d2d2d] text-xs font-semibold text-black dark:text-white cursor-pointer hover:bg-gray-50 dark:hover:bg-[#262626]">
              <span>View on Threads</span>
              <img src={Icons.iconThread} title="Threads" className="w-4 h-4" />
            </div>
          </div>

          <p className="text-[15px] text-black dark:text-white mb-3">
            {content}
          </p>

          <div className="text-[15px] text-[#999] mb-3">
            {post.created_at
              ? new Date(post.created_at).toLocaleString()
              : "Just now"}
          </div>

          <div className="flex items-center gap-4 text-gray-400 pt-2 border-t border-gray-100 dark:border-[#2d2d2d]">
            <span className="text-xs flex flex-row items-center text-[14px] text-black">
              <img
                src={Icons.iconLikePost}
                title="Like"
                className="w-4 h-4 pr-0.5"
              />
              {post.likes_count || 0}
            </span>
            <span className="text-xs flex flex-row items-center text-[14px] text-black">
              <img
                src={Icons.iconCommentPost}
                title="Like"
                className="w-4 h-4 pr-0.5"
              />
              {post.replies_count || 0}
            </span>
            <span className="text-xs flex flex-row items-center text-[14px] text-black">
              <img
                src={Icons.iconRepostPost}
                title="Like"
                className="w-4 h-4 pr-0.5"
              />
              {post.reposts_count || 0}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between bg-gray-50 dark:bg-[#262626] border border-gray-200 dark:border-[#333] rounded-2xl px-4 py-3">
          <code className="text-xs text-gray-600 dark:text-gray-300 truncate mr-3 font-mono max-w-85">
            {embedCode}
          </code>
          <button
            type="button"
            onClick={handleCopyEmbed}
            className="px-5 py-2 bg-black dark:bg-white text-white dark:text-black text-sm font-semibold rounded-xl shrink-0 transition hover:opacity-80 cursor-pointer"
          >
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default EmbedModal;
