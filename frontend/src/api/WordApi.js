import { buildUrl } from './config.js';

export async function listWords(params = {}) {
  const query = new URLSearchParams(params).toString();
  const url = buildUrl(`/api/words${query ? `?${query}` : ''}`);
  const res = await fetch(url);
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Không thể tải danh sách từ');
  return data;
}

export async function getWord(id) {
  const res = await fetch(buildUrl(`/api/words/${id}`));
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Không thể tải từ vựng');
  return data;
}

export async function createWord(payload) {
  const res = await fetch(buildUrl('/api/words'), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Không thể tạo từ vựng');
  return data;
}

export async function updateWord(id, payload) {
  const res = await fetch(buildUrl(`/api/words/${id}`), {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Không thể cập nhật từ vựng');
  return data;
}

export async function deleteWord(id) {
  const res = await fetch(buildUrl(`/api/words/${id}`), { method: 'DELETE' });
  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.message || 'Không thể xoá từ vựng');
  }
} 