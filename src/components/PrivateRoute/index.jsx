import Loading from "@/components/Loading";
import { useAuthFetching, useCurrentUser } from "@/features/auth/hook";
import { Navigate } from "react-router";

function PrivateRoute({ children }) {
  const currentUser = useCurrentUser();
  const fetching = useAuthFetching();

  if (fetching) {
    return <Loading />;
  }

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
export default PrivateRoute;
