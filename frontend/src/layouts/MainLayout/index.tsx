import useAuth from "@hooks/useAuth";
import { Navigate, Outlet } from "react-router-dom";

export default function MainLayout() {
  const { token } = useAuth();

  if (!token) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
}
