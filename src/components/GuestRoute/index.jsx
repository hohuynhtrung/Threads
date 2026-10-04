import Loading from "@/components/Loading";
import { useAuthFetching, useCurrentUser } from "@/features/auth/hook";
import { Navigate, Outlet } from "react-router";

function GuestRoute() {
  const currentUser = useCurrentUser();
  const fetching = useAuthFetching();

  if (fetching) {
    return <Loading />;
  }

  if (currentUser) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}

export default GuestRoute;
