import { ReactNode } from "react";
import { useAppSelector } from "../../Redux/hooks";
import {
  useCurrentToken,
  useCurrentUser,
} from "../../Redux/features/auth/authSlice";
import { Navigate } from "react-router-dom";

type User = {
  role?: string;
};

const UserProtectRoute = ({ children }: { children: ReactNode }) => {
  const token = useAppSelector(useCurrentToken);
  const user = useAppSelector(useCurrentUser) as User;

  if (!token) {
    return <Navigate to="/login" replace={true} />;
  }
  if (user?.role != "USER") {
    return <Navigate to="/login" replace={true} />;
  }

  return children;
};

export default UserProtectRoute;
