import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext.jsx';
import { listStudents, deleteStudent } from '../../../api/StudentApi.js';
import SearchStudent from '../../../Components/SreachStudent.jsx'; // Đổi tên đúng & import đúng path

export default function StudentList() {
  const { token } = useAuth();
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  // Cho phép truyền params để tìm kiếm
  const fetchStudents = async (params = {}) => {
    setLoading(true);
    try {
      const users = await listStudents(token, params);
      setStudents(users);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchStudents(); }, []);

  const handleDelete = async (id) => {
    if (!confirm('Xoá học viên này?')) return;
    await deleteStudent(id, token);
    fetchStudents();
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Nhúng component search và truyền props onSearch */}
      <div className="mb-4">
        <SearchStudent onSearch={fetchStudents} />
      </div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Quản lý học viên</h1>
        <Link to="/admin/student/add" className="bg-blue-600 text-white px-4 py-2 rounded">Thêm học viên</Link>
      </div>
      {loading ? 'Đang tải...' : (
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-2">Tên</th>
              <th className="p-2">Email</th>
              <th className="p-2">Vai trò</th>
              <th className="p-2">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {students.map(s => (
              <tr key={s._id} className="border-t">
                <td className="p-2">{s.full_name?.first} {s.full_name?.last}</td>
                <td className="p-2">{s.email}</td>
                <td className="p-2">{s.role}</td>
                <td className="p-2 space-x-3">
                  <Link to={`/admin/student/${s._id}`} className="text-green-600 hover:underline">Xem</Link>
                  <Link to={`/admin/student/${s._id}/edit`} className="text-blue-600 hover:underline">Sửa</Link>
                  <button onClick={() => handleDelete(s._id)} className="text-red-600 hover:underline">Xoá</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}