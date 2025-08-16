import { buildUrl } from './config.js';

export async function loginStudent({ email, password }) {
  const res = await fetch(buildUrl('/api/auth/login-student'), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data?.message || 'Không thể đăng nhập');
  return data;
}

export async function registerStudent(formData) {
  const res = await fetch(buildUrl('/api/auth/register-student'), {
    method: 'POST',
    body: formData
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data?.message || 'Đăng ký thất bại');
  return data;
}


