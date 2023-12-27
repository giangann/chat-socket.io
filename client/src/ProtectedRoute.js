import { Navigate } from "react-router-dom";
import { useAuth } from "./hooks/useAuth";

export const ProtectedRoute = ({ children }) => {
  // call useAuth() => check local state if user status is authenticated
  const { user } = useAuth();

  console.log(user);

  // return children if auth status is true
  if (user) {
    return children;
  } else {
    return <Navigate to={"/login"} replace />;
  }

  // navigate to login when auth status is false
};
