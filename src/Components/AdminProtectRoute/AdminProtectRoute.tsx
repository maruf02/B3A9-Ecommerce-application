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

const AdminProtectRoute = ({ children }: { children: ReactNode }) => {
  //   const dispatch = useAppDispatch();
  const token = useAppSelector(useCurrentToken);
  const admin = useAppSelector(useCurrentUser) as User;

  if (!token) {
    return <Navigate to="/login" replace={true} />;
  }
  if (admin.role != "ADMIN") {
    // dispatch(logout());
    return <Navigate to="/login" replace={true} />;
  }

  return children;
};

export default AdminProtectRoute;
