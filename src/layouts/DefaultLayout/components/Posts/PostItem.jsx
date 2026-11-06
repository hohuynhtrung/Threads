import { useNavigate, useParams } from "react-router";
import { useSelector } from "react-redux";
import { useEffect } from "react";

import { formatTimeAgo } from "@/layouts/DefaultLayout/helper/formatTimeAgo";
import PostActions from "@/layouts/DefaultLayout/components/Posts/PostActions";
import ReplyPreviewList from "@/layouts/DefaultLayout/components/Posts/ReplyPreviewList";
import MorePostMenu from "@/layouts/DefaultLayout/components/Posts/MorePostMenu";
import { usePosts } from "@/features/post/hook";
import { useUserMute } from "@/features/action/hook";
import PostMedia from "@/layouts/DefaultLayout/components/Posts/PostMedia";
import Images from "@/assets/images";

import QuotedPostItem from "@/layouts/DefaultLayout/components/Posts/QuotePostItem";

function PostItem({
  post,
  variant = "feed",
  renderReplies = true,
  onCommentClick,
}) {
  const navigate = useNavigate();
  const params = useParams();

  const currentUser = useSelector((state) => state.auth?.currentUser);
  const isOwnPost =
    currentUser?.id && post?.user?.id && currentUser.id === post.user.id;

  const { deletePost } = usePosts(currentUser);

  const isMain = variant === "main";
  const isAncestor = variant === "ancestor";

  const userId = post?.user?.id ? String(post.user.id) : null;
  const username = post?.user?.username || post?.user?.name;

  const { isMuted, toggleMute, initMuteStatus } = useUserMute(userId);

  useEffect(() => {
    const muteStatus = post?.user?.is_muted_by_auth;
    if (typeof muteStatus === "boolean" && userId) {
      initMuteStatus(muteStatus);
    }
  }, [post?.user?.is_muted_by_auth, userId, initMuteStatus]);

  if (isMuted) {
    return (
      <div className="flex items-center justify-between px-4 py-3 bg-gray-50 dark:bg-[#1a1a1a] border border-gray-100 dark:border-[#2d2d2d] rounded-2xl text-sm text-gray-500 dark:text-gray-400 my-2">
        <span>
          Posts from <span className="font-semibold">{username}</span> are
          muted. You can manage who you mute in settings.
        </span>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            toggleMute();
          }}
          className="font-semibold text-black dark:text-white hover:opacity-70 transition cursor-pointer ml-4 shrink-0"
        >
          Undo
        </button>
      </div>
    );
  }

  const handlePostDetail = () => {
    if (params.id === String(post.id)) return;
    navigate(`/post/${post.id}`);
  };

  const handleUserProfile = (event) => {
    event.stopPropagation();

    const postUsername = post?.user?.username;
    if (!postUsername) return;

    navigate(`/@${postUsername}`, { state: { user: post.user } });
  };

  const avatarSize = isMain ? "w-12 h-12" : "w-10 h-10";
  const nameSize = isMain ? "text-[17px]" : "text-[16px]";
  const contentSize = isMain ? "text-[18px]" : "text-[16px]";

  const repliesCount = Number(post?.replies_count || 0);

  return (
    <div
      onClick={handlePostDetail}
      className={`relative flex flex-col gap-2 cursor-pointer w-full ${isAncestor ? "opacity-70" : ""}`}
    >
      {renderReplies && !isAncestor && repliesCount > 0 && (
        <div
          className={`absolute left-4.75 ${isMain ? "top-12" : "top-10"} bottom-0 w-0.5 bg-gray-300 dark:bg-[#2d2d2d] pointer-events-none`}
        />
      )}

      <div className="flex items-start gap-3 w-full">
        <div className="flex flex-col items-center shrink-0">
          <button
            type="button"
            onClick={handleUserProfile}
            className={`${avatarSize} rounded-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center font-bold text-gray-700 dark:text-gray-300 overflow-hidden transition-transform hover:scale-[1.02] cursor-pointer`}
            aria-label={`View ${post?.user?.name || "user"} profile`}
          >
            <img
              src={post?.user?.avatar_url || Images.imgDefaultAvatar}
              className="rounded-[50%] w-full h-full object-cover"
              alt={post?.user?.name || "avatar"}
            />
          </button>
        </div>

        <div className="w-full min-w-0">
          <div className="flex justify-between items-center">
            <button
              type="button"
              onClick={handleUserProfile}
              className={`font-semibold text-black dark:text-[#e8eaeb] ${nameSize} leading-tight text-left cursor-pointer hover:underline`}
            >
              {post?.user?.name}
              <span className="text-[14px] font-normal text-gray-400 dark:text-[#cccccc] ml-2">
                {formatTimeAgo(post?.created_at)}
              </span>
            </button>

            <MorePostMenu
              post={post}
              isOwnPost={isOwnPost}
              onDelete={deletePost}
            />
          </div>

          {!isAncestor && post?.reply_to_username && (
            <p className="text-[13px] text-gray-400 dark:text-gray-500">
              Trả lời{" "}
              <span className="text-gray-500 dark:text-gray-400">
                @{post.reply_to_username}
              </span>
            </p>
          )}

          <p
            className={`w-full max-w-138.5 ${contentSize} font-normal text-black dark:text-[#e8eaeb] whitespace-normal wrap-break-word my-1`}
          >
            {post?.content}
          </p>

          <PostMedia urls={post?.media_urls} />

          {(post?.is_quote || post?.original_post) && post?.original_post && (
            <QuotedPostItem originalPost={post.original_post} />
          )}

          {!isAncestor && (
            <div onClick={(e) => e.stopPropagation()}>
              <PostActions post={post} onCommentClick={onCommentClick} />
            </div>
          )}

          {renderReplies && !isAncestor && repliesCount > 0 && (
            <div className="mt-3 w-full" onClick={(e) => e.stopPropagation()}>
              <ReplyPreviewList postId={post.id} repliesCount={repliesCount} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default PostItem;
