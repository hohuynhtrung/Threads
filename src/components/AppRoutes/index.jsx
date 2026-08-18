import { BrowserRouter as Router, Routes, Route } from "react-router";

import DefaultLayout from "@/layouts/DefaultLayout";
import Home from "@/page/Home";
import AdminLayout from "@/layouts/AdminLayout";
import Login from "@/page/Auth/Login";
import Register from "@/page/Auth/Register";
import Search from "@/page/Search";
import { useAuthFetching } from "@/features/auth/hook";
import Loading from "@/components/Loading";
import GuestRoute from "@/components/GuestRoute";

function AppRoutes() {
  const fetching = useAuthFetching();

  if (fetching) {
    return <Loading />;
  }
  return (
    <Router>
      <Routes>
        <Route element={<DefaultLayout />}>
          <Route index element={<Home />} />
          <Route path="search" element={<Search />} />
        </Route>
        <Route element={<AdminLayout />}>
          <Route
            path="login"
            element={
              <GuestRoute>
                <Login />
              </GuestRoute>
            }
          />
          <Route
            path="register"
            element={
              <GuestRoute>
                <Register />
              </GuestRoute>
            }
          />
        </Route>
      </Routes>
    </Router>
  );
}

export default AppRoutes;
