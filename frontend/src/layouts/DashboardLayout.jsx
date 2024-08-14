import Sidebar from "../components/Sidebar";
import Headerbar from "../components/Headerbar";
import { Outlet } from "react-router-dom";
import { useState } from "react";

const DashboardLayout = ({ toggleDarkMode, darkMode }) => {
  const [mobSidebarOpen, setMobSidebarOpen] = useState(false);

  const toggleMobSidebar = () => {
    setMobSidebarOpen(!mobSidebarOpen);
  };

  return (
    <div>
      <aside>
        <Sidebar
          toggleDarkMode={toggleDarkMode}
          darkMode={darkMode}
          toggleMobSidebar={toggleMobSidebar}
          mobSidebarOpen={mobSidebarOpen}
        />
      </aside>
      <header>
        <Headerbar
          toggleDarkMode={toggleDarkMode}
          darkMode={darkMode}
          toggleMobSidebar={toggleMobSidebar}
        />
      </header>
      <main className="w-full mt-[60px] h-screen bg-background dark:bg-darkBackground md:w-[calc(100%-250px)] md:ml-[250px]">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
