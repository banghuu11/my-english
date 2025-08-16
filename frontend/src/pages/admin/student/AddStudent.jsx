import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext.jsx';
import { createStudent } from '../../../api/StudentApi.js';

export default function AddStudent() {
  const { token } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ full_name: { first: '', last: '' }, email: '', password: '', role: 'student' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createStudent(form, token);
    navigate('/admin/student');
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-xl font-bold mb-4">Thêm học viên</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input className="border p-2" placeholder="Họ" value={form.full_name.first}
               onChange={e => setForm({ ...form, full_name: { ...form.full_name, first: e.target.value } })} />
        <input className="border p-2" placeholder="Tên" value={form.full_name.last}
               onChange={e => setForm({ ...form, full_name: { ...form.full_name, last: e.target.value } })} />
        <input className="border p-2" placeholder="Email" value={form.email}
               onChange={e => setForm({ ...form, email: e.target.value })} />
        <input className="border p-2" placeholder="Mật khẩu" type="password" value={form.password}
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


