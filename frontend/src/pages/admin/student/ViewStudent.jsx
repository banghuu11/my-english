import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext.jsx';
import { getStudent } from '../../../api/StudentApi.js';

export default function ViewStudent() {
  const { id } = useParams();
  const { token } = useAuth();
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

  useEffect(() => {
    let isMounted = true;
    const fetchDetail = async () => {
      setLoading(true);
      setError('');
      try {
        const user = await getStudent(id, token);
        if (isMounted) setStudent(user);
      } catch (e) {
        if (isMounted) setError(e.message);
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    fetchDetail();
    return () => { isMounted = false; };
  }, [id, apiBaseUrl, token]);

  const formatDate = (iso) => {
    if (!iso) return '';
    try { return new Date(iso).toLocaleDateString(); } catch { return ''; }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Chi tiết học viên</h1>
        <div className="space-x-2">
          <Link to="/admin/student" className="px-3 py-2 rounded border">Quay lại</Link>
          {student && (
            <Link to={`/admin/student/${student._id}/edit`} className="px-3 py-2 rounded bg-blue-600 text-white">Sửa</Link>
          )}
        </div>
      </div>

      {loading && <div>Đang tải...</div>}
      {error && <div className="text-red-600">{error}</div>}
      {!loading && !error && student && (
        <div className="bg-white rounded shadow p-5 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <div className="text-sm text-gray-500">Họ và tên</div>
            <div className="font-medium">{student.full_name?.first} {student.full_name?.last}</div>
          </div>
          <div>
            <div className="text-sm text-gray-500">Email</div>
            <div className="font-medium">{student.email}</div>
          </div>
          <div>
            <div className="text-sm text-gray-500">Vai trò</div>
            <div className="font-medium">{student.role}</div>
          </div>
          <div>
            <div className="text-sm text-gray-500">Điện thoại</div>
            <div className="font-medium">{student.phone || '-'}</div>
          </div>
          <div>
            <div className="text-sm text-gray-500">Ngày sinh</div>
            <div className="font-medium">{formatDate(student.date_birth)}</div>
          </div>
          <div className="md:col-span-2">
            <div className="text-sm text-gray-500">Địa chỉ</div>
            <div className="font-medium">
              {[
                student.address?.street,
                student.address?.city,
                student.address?.state,
                student.address?.zip_code,
              ].filter(Boolean).join(', ') || '-'}
            </div>
          </div>
          <div className="md:col-span-2">
            <div className="text-sm text-gray-500">Ảnh đại diện</div>
            {student.avatar ? (
              <img
                alt="avatar"
                className="h-32 w-32 object-cover rounded"
                src={student.avatar.startsWith('http') ? student.avatar : `${apiBaseUrl}${student.avatar}`}
              />
            ) : (
              <div className="text-gray-500">-</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}


