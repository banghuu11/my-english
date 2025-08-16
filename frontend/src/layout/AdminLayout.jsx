import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext.jsx';

export default function AdminLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/'); // Chuyển về trang chủ
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-row">
      {/* Sidebar dọc bên trái */}
      <aside className="bg-slate-800 text-white flex flex-col py-6 px-3 min-h-screen min-w-[210px]">
        <div className="mb-8 flex flex-col items-center">
          <span className="font-bold text-xl mb-1">Admin Dashboard</span>
          <span className="text-sm text-slate-300">{user?.full_name?.first} {user?.full_name?.last}</span>
        </div>
        <nav className="flex flex-col gap-2 flex-1">
          <AdminNavLink to="/admin" label="Trang chủ" />
          <AdminNavLink to="/admin/student" label="Học viên" />
          <AdminNavLink to="/admin/topic" label="Chủ đề" />
          <AdminNavLink to="/admin/word" label="Từ vựng" />
        </nav>
        <button
          onClick={handleLogout}
          className="mt-8 px-3 py-2 rounded bg-red-500 hover:bg-red-600 w-full text-center"
        >
          Đăng xuất
        </button>
      </aside>

      {/* Nội dung chính */}
      <main className="flex-1 max-w-7xl mx-auto p-4">
        <Outlet />
      </main>
    </div>
  );
}

function AdminNavLink({ to, label }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `block px-4 py-2 rounded transition-colors ${
          isActive
            ? 'bg-slate-700 text-white font-semibold'
            : 'text-slate-200 hover:bg-slate-700 hover:text-white'
        }`
      }
    >
      {label}
    </NavLink>
  );
}