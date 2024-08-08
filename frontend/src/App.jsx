import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { Suspense, lazy, useState } from "react";
import DashboardLayout from "./layouts/DashboardLayout";
import SignUpPage from "./pages/auth/signup";
import LoginPage from "./pages/auth/signin";
import ForgotPassword from "./pages/auth/forgotPassword/ForgotPassword";
import VerifyCode from "./pages/auth/forgotPassword/VerifyCode";

function App() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle("dark", darkMode);
    // localStorage.setItem('darkMode', darkMode)
  };
  return (
    <>
      <Suspense>
        <Routes>
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/verify-code" element={<VerifyCode />} />
          <Route
            element={
              <DashboardLayout
                toggleDarkMode={toggleDarkMode}
                darkMode={darkMode}
              />
            }
          >
            <Route exact path="/" element={<Navigate to="/dashboard" />} />
            {/* <Route path="/dashboard" element={lazy(() => import("./pages/Dashboard"))} />
            <Route path="/products" element={lazy(() => import("./pages/Products"))} />
            <Route path="/posts" element={lazy(() => import("./pages/Posts"))} />
            <Route path="/customers" element={lazy(() => import("./pages/Customers"))} /> */}
            <Route path="*" element={<Navigate to="/dashboard" />} />
          </Route>
        </Routes>
      </Suspense>
      <Toaster />
    </>
  );
}

export default App;
