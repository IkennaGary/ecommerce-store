import Sidebar from "../components/Sidebar";
import Headerbar from "../components/Headerbar";
import { Outlet } from "react-router-dom";

const DashboardLayout = ({ toggleDarkMode, darkMode }) => {
  return (
    <div>
      <aside>
        <Sidebar toggleDarkMode={toggleDarkMode} darkMode={darkMode} />
      </aside>
      <header>
        <Headerbar toggleDarkMode={toggleDarkMode} darkMode={darkMode} />
      </header>
      <main className="w-[calc(100%-250px)] ml-[250px] mt-[60px] h-screen bg-background dark:bg-darkBackground">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
