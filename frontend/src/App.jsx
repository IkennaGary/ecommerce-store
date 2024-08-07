import { Routes, Route, Navigate } from "react-router-dom";
import { Suspense, lazy, useState } from "react";
import DashboardLayout from "./layouts/DashboardLayout";

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
    </>
  );
}

export default App;
