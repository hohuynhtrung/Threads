import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import DefaultLayout from "@/layouts/DefaultLayout";
import AdminLayout from "@/layouts/AdminLayout";

import Home from "@/page/Home";
import Search from "@/page/Search";
import Messages from "@/page/Messages";
import Activity from "@/page/Activity";
import Profile from "@/page/Profile";
import Insights from "@/page/Insights";
import Saved from "@/page/Saved";
import PostDetail from "@/page/PostDetail";

import Login from "@/page/Auth/Login";
import Register from "@/page/Auth/Register";
import ForgotPassword from "@/page/Auth/ForgotPassword";
import ResetPassword from "@/page/Auth/ResetPassword";
import VerifyEmail from "@/page/Auth/VerifyEmail";

import { useAuthFetching } from "@/features/auth/hook";
import Loading from "@/components/Loading";
import GuestRoute from "@/components/GuestRoute";

function AppRoutes() {
  const fetching = useAuthFetching();

  if (fetching) {
    return <Loading />;
  }

  return (
    <Router basename="/Threads/">
      <Routes>
        {/* Main Routes */}
        <Route element={<DefaultLayout />}>
          <Route index element={<Home />} />
          <Route path="post/:id" element={<PostDetail />} />
          <Route path="search" element={<Search />} />
          <Route path="messages" element={<Messages />} />
          <Route path="activity" element={<Activity />} />
          <Route path=":username" element={<Profile />} />
          <Route path="insights" element={<Insights />} />
          <Route path="saved" element={<Saved />} />
        </Route>

        {/* Auth Routes */}
        <Route element={<GuestRoute />}>
          <Route element={<AdminLayout />}>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="forgot-password" element={<ForgotPassword />} />
            <Route path="reset-password" element={<ResetPassword />} />
          </Route>
        </Route>

        <Route element={<AdminLayout />}>
          <Route path="verify-email" element={<VerifyEmail />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default AppRoutes;
