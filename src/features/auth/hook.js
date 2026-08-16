import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearLoginError, logout } from "@/features/auth/authSlice";
import { getCurrentUser, login } from "@/services/auth";

export const useFetchCurrentUser = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch]);
};

export const useCurrentUser = () => {
  const currentUser = useSelector((state) => state.auth.currentUser);
  return currentUser;
};

export const useAuthFetching = () => {
  const fetching = useSelector((state) => state.auth.fetching);
  return fetching;
};

export const useLogin = () => {
  const dispatch = useDispatch();
  const loggingIn = useSelector((state) => state.auth.loggingIn);
  const loginError = useSelector((state) => state.auth.loginError);

  const handleLogin = (data) => dispatch(login(data));
  const resetError = () => dispatch(clearLoginError());

  return { login: handleLogin, loggingIn, loginError, resetError };
};

export const useLogout = () => {
  const dispatch = useDispatch();
  return () => dispatch(logout());
};
