import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/UserContext";

export default function PrivateRoute() {
  const { user } = useAuth();

  return user ? <Outlet /> : <Navigate to="/entrar"/>;
}