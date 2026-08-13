import { Outlet } from "react-router-dom";
import Sidebar from "../../composants/admin/sidebar";

const AdminLayout = () => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 overflow-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
