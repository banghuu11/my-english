  import { useState } from 'react';
  import { useNavigate } from 'react-router-dom';
  import { useAuth } from '../../contexts/AuthContext.jsx';
  import { loginStudent } from '../../api/AuthApi.js';

  export default function Login() {
    const [form, setForm] = useState({ email: '', password: '' });
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleChange = e => {
      const { name, value } = e.target;
      setForm({ ...form, [name]: value });
    };

    const handleSubmit = async e => {
      e.preventDefault();
      setMessage('');
      try {
        const data = await loginStudent({ email: form.email, password: form.password });
        login(data.token, data.student);
        setMessage('Đăng nhập thành công!');
        setForm({ email: '', password: '' });
        setTimeout(() => {
          navigate(data?.student?.role === 'Admin' ? '/admin' : '/');
        }, 300);
      } catch (error) {
        setMessage(error.message || 'Lỗi kết nối server');
      }
    };

    return (
      <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
        <h2 className="text-2xl font-bold mb-4 text-center">Đăng nhập</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
            name="password"
            type="password"
            placeholder="Mật khẩu"
            value={form.password}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />
          <button className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700">Đăng nhập</button>
        </form>
        {message && <div className={`mt-4 text-center ${message.includes('thành công') ? 'text-green-600' : 'text-red-600'}`}>{message}</div>}
      </div>
    );
  }