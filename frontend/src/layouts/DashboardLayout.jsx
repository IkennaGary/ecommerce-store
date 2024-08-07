import Sidebar from "../components/Sidebar";

const DashboardLayout = ({ toggleDarkMode, darkMode }) => {
  return (
    <div>
      <Sidebar toggleDarkMode={toggleDarkMode} darkMode={darkMode} />
    </div>
  );
};

export default DashboardLayout;
