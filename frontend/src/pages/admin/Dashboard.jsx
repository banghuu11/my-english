import { useEffect, useMemo, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext.jsx';

export default function Dashboard() {
  const { token } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const headers = useMemo(() => ({ Authorization: `Bearer ${token}` }), [token]);
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${apiBaseUrl}/api/admin/users`, { headers });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || 'Lỗi tải danh sách');
        setUsers(data.users || []);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const total = users.length;
  const admins = users.filter(u => u.role === 'Admin').length;
  const students = users.filter(u => u.role === 'student').length;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Tổng quan</h1>
      {loading ? (
        <div>Đang tải...</div>
      ) : error ? (
        <div className="text-red-600">{error}</div>
      ) : (
        <div className="grid grid-cols-3 gap-4">
          <Card title="Tổng người dùng" value={total} color="text-blue-600" />
          <Card title="Số Admin" value={admins} color="text-green-600" />
          <Card title="Số Student" value={students} color="text-indigo-600" />
        </div>
      )}
    </div>
  );
}

function Card({ title, value, color }) {
  return (
    <div className="bg-white rounded shadow p-6 text-center">
      <div className="text-lg font-semibold">{title}</div>
      <div className={`text-2xl ${color}`}>{value}</div>
    </div>
  );
}