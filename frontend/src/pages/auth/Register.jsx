import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext.jsx';
import { registerStudent } from '../../api/AuthApi.js';

export default function Register() {
  const [form, setForm] = useState({
    full_name: { first: '', last: '' },
    email: '',
    phone: '',
    date_birth: '',
    address: { street: '', city: '', state: '', zip_code: '' },
    password: '',
    avatar: ''
  });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = e => {
    const { name, value, files } = e.target;
    if (name === "avatar") {
      setForm({ ...form, avatar: files[0] }); // lưu file object
    } else if (name.startsWith('full_name.')) {
      setForm({ ...form, full_name: { ...form.full_name, [name.split('.')[1]]: value } });
    } else if (name.startsWith('address.')) {
      setForm({ ...form, address: { ...form.address, [name.split('.')[1]]: value } });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setMessage('');
    try {
      const formData = new FormData();
      formData.append('full_name', JSON.stringify(form.full_name));
      formData.append('email', form.email);
      if (form.phone) formData.append('phone', form.phone);
      if (form.date_birth) formData.append('date_birth', new Date(form.date_birth).toISOString());
      formData.append('address', JSON.stringify(form.address));
      formData.append('password', form.password);
      if (form.avatar) formData.append('avatar', form.avatar);

      const data = await registerStudent(formData);
      if (data) {
        setMessage('Đăng ký học viên thành công!');
        if (data.token && data.student) {
          login(data.token, data.student);
        }
        navigate('/');
      } else setMessage('Đăng ký thất bại');
    } catch (e) {
      setMessage(e.message || 'Lỗi kết nối server');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4 text-center">Đăng ký </h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex gap-2">
          <input
            name="full_name.first"
            placeholder="Họ"
            value={form.full_name.first}
            onChange={handleChange}
            className="border p-2 rounded w-1/2"
            required
          />
          <input
            name="full_name.last"
            placeholder="Tên"
            value={form.full_name.last}
            onChange={handleChange}
            className="border p-2 rounded w-1/2"
            required
          />
        </div>
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />
        <input
          name="avatar"
          type="file"
          accept="image/*"
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <input
          name="password"
          type="password"
          placeholder="Mật khẩu"
          value={form.password}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />
        <button className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700">Đăng ký</button>
      </form>
      {message && <div className="mt-4 text-center text-red-600">{message}</div>}
    </div>
  );
}