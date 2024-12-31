import { Navigate } from "react-router";
import { useUserStore } from "../store/user.store";

const ProtectRoute = ({ auth = true, isBusiness, isAdmin, children }) => {
  const { user, loading } = useUserStore();

  if (auth && !loading) {
    if (!user) {
      return <Navigate to='/' />;
    }

    if (isBusiness && !isAdmin && !user.isBusiness) {
      return <Navigate to='/' />;
    }

    if (isAdmin && !isBusiness && !user.isAdmin) {
      return <Navigate to='/' />;
    }

    if (isBusiness && isAdmin && !user.isBusiness && !user.isAdmin) {
      return <Navigate to='/' />;
    }
  }

  return children;
};

export default ProtectRoute;
