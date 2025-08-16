import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext.jsx';
import { getStudent, updateStudent } from '../../../api/StudentApi.js';

export default function EditStudent() {
  const { id } = useParams();
  const { token } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ full_name: { first: '', last: '' }, email: '', role: 'student' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const user = await getStudent(id, token);
      setForm({ ...user, password: '' });
      setLoading(false);
    })();
  }, [id, token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { ...form };
    if (!payload.password) delete payload.password;
    await updateStudent(id, payload, token);
    navigate('/admin/student');
  };

  if (loading) return null;

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-xl font-bold mb-4">Sửa học viên</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input className="border p-2" placeholder="Họ" value={form.full_name.first}
               onChange={e => setForm({ ...form, full_name: { ...form.full_name, first: e.target.value } })} />
        <input className="border p-2" placeholder="Tên" value={form.full_name.last}
               onChange={e => setForm({ ...form, full_name: { ...form.full_name, last: e.target.value } })} />
        <input className="border p-2" placeholder="Email" value={form.email} disabled />
        <input className="border p-2" placeholder="Mật khẩu (để trống nếu không đổi)" type="password" value={form.password || ''}
               onChange={e => setForm({ ...form, password: e.target.value })} />
        <select className="border p-2" value={form.role}
                onChange={e => setForm({ ...form, role: e.target.value })}>
          <option value="student">Student</option>
          <option value="Admin">Admin</option>
        </select>
        <button className="bg-blue-600 text-white px-4 py-2 rounded">Lưu</button>
      </form>
    </div>
  );
}


