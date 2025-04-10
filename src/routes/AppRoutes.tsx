import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

import Home from "../pages/Home";
import Login from "../pages/Login";
import Admin from "../pages/Admin";
import DocsList from "../pages/DocsList";

const AppRoutes = () => {
  const { user } = useAuth();

  return (
    <Routes>
      <Route path="/" element={<Home />}/>
      <Route path="/admin" element={user ? <Admin /> : <Navigate to="/" replace />} />
      <Route path="/login" element={user ? <Navigate to="/" replace /> : <Login />} />
      <Route path="/docslist" element={user ? <Navigate to="/" replace /> : <DocsList />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default AppRoutes;