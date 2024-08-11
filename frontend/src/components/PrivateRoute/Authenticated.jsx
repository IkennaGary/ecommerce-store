import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const Authenticated = () => {
  const user = useSelector((state) => state.user);

  if (
    !user?.isLoading &&
    localStorage.getItem("token") &&
    !user?.isAuthenticated
  ) {
    return <div>Loading 123.....</div>;
  }

  if (user?.isLoading) {
    return <div>BaseLoader....</div>;
  } else if (!user?.isAuthenticated) {
    return <Navigate to="/" />;
  } else {
    return <Outlet />;
  }
};

export default Authenticated;
