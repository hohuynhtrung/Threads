import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import { muteUser, unMuteUser } from "@/services/actions/actionService";
import { setMuteStatus } from "@/features/action/actionSlice";

export const useUserMute = (userId) => {
  const dispatch = useDispatch();
  const stringId =
    userId !== undefined && userId !== null ? String(userId) : null;

  const isMuted = useSelector(
    (state) => (stringId ? state.action?.muteMap?.[stringId] : false) ?? false,
  );
  const error = useSelector((state) => state.action?.error);

  const toggleMute = useCallback(() => {
    if (!stringId) return;

    if (isMuted) {
      dispatch(unMuteUser(stringId));
    } else {
      dispatch(muteUser(stringId));
    }
  }, [dispatch, stringId, isMuted]);

  const initMuteStatus = useCallback(
    (status) => {
      if (stringId && typeof status === "boolean") {
        dispatch(setMuteStatus({ userId: stringId, isMuted: status }));
      }
    },
    [dispatch, stringId],
  );

  return { isMuted, toggleMute, initMuteStatus, error };
};
