import { useState } from "react";

export default function SearchStudent({ onSearch }) {
  const [q, setQ] = useState("");

  const handleSubmit = e => {
    e.preventDefault();
    // Gửi object chỉ có trường q nếu không rỗng
    const params = q.trim() ? { q } : {};
    onSearch(params);
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-4 bg-gray-50 p-4 rounded">
      <input
        type="text"
        placeholder="Tìm kiếm học viên..."
        name="q"
        value={q}
        onChange={e => setQ(e.target.value)}
        className="border p-2 rounded flex-1"
      />
      <button
        type="submit"
        className="bg-blue-600 text-white rounded p-2 font-bold hover:bg-blue-700"
      >
        Tìm kiếm
      </button>
    </form>
  );
}