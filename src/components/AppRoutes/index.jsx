import { BrowserRouter as Router, Routes, Route } from "react-router";

import DefaultLayout from "@/layouts/DefaultLayout";
import Home from "@/page/Home";
import AdminLayout from "@/layouts/AdminLayout";
import Login from "@/page/Auth/Login";
import Register from "@/page/Auth/Register";
import Search from "@/page/Search";

function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route element={<DefaultLayout />}>
          <Route index element={<Home />} />
          <Route path="search" element={<Search />} />
        </Route>
        <Route element={<AdminLayout />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default AppRoutes;
