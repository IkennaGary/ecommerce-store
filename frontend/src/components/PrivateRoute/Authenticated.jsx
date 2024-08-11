import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import BaseLoader from "../Loaders/BaseLoader";

const Authenticated = () => {
  const user = useSelector((state) => state.user);

  if (
    !user?.isLoading &&
    localStorage.getItem("token") &&
    !user?.isAuthenticated
  ) {
    return <BaseLoader />;
  }

  if (user?.isLoading) {
    return <BaseLoader />;
  } else if (!user?.isAuthenticated) {
    return <Navigate to="/" />;
  } else {
    return <Outlet />;
  }
};

export default Authenticated;
