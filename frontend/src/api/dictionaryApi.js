const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

function buildQuery(params = {}) {
  const qs = new URLSearchParams();
  Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined && v !== null && v !== '') qs.append(k, v);
  });
  return qs.toString();
}

export async function searchWords({ q, mode = 'vi', topic_id, limit } = {}) {
  const query = buildQuery({ q, mode, topic_id, limit });
  const res = await fetch(`${API_BASE}/api/dictionary/search?${query}`);
  const text = await res.text();
  let data;
  try {
    data = JSON.parse(text);
  } catch {
    throw new Error('Phản hồi không hợp lệ');
  }
  if (!res.ok) throw new Error(data.message || 'Lỗi tìm kiếm');
  return data;
}

export async function suggestWords(q) {
  if (!q) return [];
  const res = await fetch(`${API_BASE}/api/dictionary/suggest?q=${encodeURIComponent(q)}`);
  try {
    return await res.json();
  } catch {
    return [];
  }
}

export async function getWord(id) {
  const res = await fetch(`${API_BASE}/api/dictionary/${id}`);
  if (!res.ok) throw new Error('Không lấy được từ');
  return res.json();
}

export async function createWord(payload) {
  const res = await fetch(`${API_BASE}/api/dictionary`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Tạo từ thất bại');
  return data;
}

export async function statusDictionary() {
  const res = await fetch(`${API_BASE}/api/dictionary/status`);
  return res.json();
}