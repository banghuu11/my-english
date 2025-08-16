import { buildUrl } from './config.js';

function authHeaders(token) {
  return { Authorization: `Bearer ${token}` };
}

export async function listStudents(token) {
  const res = await fetch(buildUrl('/api/admin/users'), { headers: authHeaders(token) });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Không thể tải danh sách');
  return data.users;
}

export async function getStudent(id, token) {
  const res = await fetch(buildUrl(`/api/admin/users/${id}`), { headers: authHeaders(token) });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Không thể tải chi tiết');
  return data.user;
}

export async function createStudent(payload, token) {
  const res = await fetch(buildUrl('/api/admin/users'), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...authHeaders(token) },
    body: JSON.stringify(payload)
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.message || 'Không thể tạo học viên');
  return data.user;
}

export async function updateStudent(id, payload, token) {
  const res = await fetch(buildUrl(`/api/admin/users/${id}`), {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', ...authHeaders(token) },
    body: JSON.stringify(payload)
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.message || 'Không thể cập nhật');
  return data.user;
}

export async function deleteStudent(id, token) {
  const res = await fetch(buildUrl(`/api/admin/users/${id}`), {
    method: 'DELETE',
    headers: authHeaders(token)
  });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.message || 'Không thể xoá');
  }
}