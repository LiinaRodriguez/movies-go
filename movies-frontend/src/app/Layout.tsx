import Sidebar from "../components/navigation/Sidebar";
import Navbar from "../components/navigation/navbar";
import { Outlet } from "react-router-dom";
const Layout = () => {
  return (
    <div className="min-h-screen flex bg-mine-shaft-950">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <Navbar />

        {/* Outlet for nested routes */}
        <div className="flex-grow p-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
export default Layout