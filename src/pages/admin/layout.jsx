import { Outlet } from "react-router-dom";
import Sidebar from "../../composants/admin/sidebar";

const AdminLayout = () => {
  return (
    <div className="flex h-screen w-full overflow-hidden bg-gray-50">
      <Sidebar />
      <main className="flex-1 min-w-0 h-screen overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
