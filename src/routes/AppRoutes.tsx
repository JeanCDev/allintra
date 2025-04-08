import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

import Home from "../pages/Home";
import Login from "../pages/Login";
import Admin from "../pages/Admin";

export default function AppRoutes() {
  const { user } = useAuth();

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/admin" element={user ? <Admin /> : <Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}
