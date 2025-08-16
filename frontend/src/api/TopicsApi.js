import { buildUrl } from './config.js';

// Helper để parse JSON an toàn
async function safeJson(res) {
  const contentType = res.headers.get('content-type') || '';
  if (contentType.includes('application/json')) {
    return await res.json();
  }
  // Nếu không phải JSON, trả về text để debug lỗi
  const text = await res.text();
  throw new Error(text || 'Server trả về dữ liệu không hợp lệ');
}

export async function listTopics() {
  const res = await fetch(buildUrl('/api/topics'));
  const data = await safeJson(res);
  if (!res.ok) throw new Error(data.message || 'Không thể tải chủ đề');
  return data;
}

export async function getTopic(id) {
  const res = await fetch(buildUrl(`/api/topics/${id}`));
  const data = await safeJson(res);
  if (!res.ok) throw new Error(data.message || 'Không thể tải chủ đề');
  return data;
}

export async function createTopic(payload) {
  const res = await fetch(buildUrl('/api/topics'), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  const data = await safeJson(res).catch(() => ({}));
  if (!res.ok) throw new Error(data.message || 'Không thể tạo chủ đề');
  return data;
}

export async function updateTopic(id, payload) {
  const res = await fetch(buildUrl(`/api/topics/${id}`), {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  const data = await safeJson(res).catch(() => ({}));
  if (!res.ok) throw new Error(data.message || 'Không thể cập nhật chủ đề');
  return data;
}

export async function deleteTopic(id) {
  const res = await fetch(buildUrl(`/api/topics/${id}`), { method: 'DELETE' });
  if (!res.ok) {
    const data = await safeJson(res).catch(() => ({}));
    throw new Error(data.message || 'Không thể xoá chủ đề');
  }
}