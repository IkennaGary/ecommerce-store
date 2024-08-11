import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { Suspense, lazy, useState, useEffect } from "react";
import DashboardLayout from "./layouts/DashboardLayout";
import LoginPage from "./pages/auth/signin";
import ForgotPassword from "./pages/auth/forgotPassword/ForgotPassword";
import VerifyCode from "./pages/auth/forgotPassword/VerifyCode";
import ChangePassword from "./pages/auth/forgotPassword/ChangePassword";
import RecoverySuccess from "./pages/auth/forgotPassword/RecoverySuccess";
import Authenticated from "./components/PrivateRoute/Authenticated";
import UserService from "./services/UserService";
import { useSelector, useDispatch } from "react-redux";

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle("dark", darkMode);
    // localStorage.setItem('darkMode', darkMode)
  };

  useEffect(() => {
    const fetch = async () => {
      const { data } = await UserService.getCurrentUser();
      console.log("{{}{}DATA", data);
    };
    fetch();
  }, []);

  useEffect(() => {
    console.log("////USEFFECTV", user);
  }, [user]);
  return (
    <>
      <Suspense>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/verify-code/:email" element={<VerifyCode />} />
          <Route path="/change-password/:email" element={<ChangePassword />} />
          <Route path="/recovery-success" element={<RecoverySuccess />} />
          <Route element={<Authenticated />}>
            <Route
              element={
                <DashboardLayout
                  toggleDarkMode={toggleDarkMode}
                  darkMode={darkMode}
                />
              }
            >
              <Route
                exact
                path="/dashboard"
                element={<Navigate to="/dashboard" />}
              />
              {/* <Route path="/dashboard" element={lazy(() => import("./pages/Dashboard"))} />
            <Route path="/products" element={lazy(() => import("./pages/Products"))} />
            <Route path="/posts" element={lazy(() => import("./pages/Posts"))} />
            <Route path="/customers" element={lazy(() => import("./pages/Customers"))} /> */}
              <Route path="*" element={<Navigate to="/dashboard" />} />
            </Route>
          </Route>
        </Routes>
      </Suspense>
      <Toaster />
    </>
  );
}

export default App;
