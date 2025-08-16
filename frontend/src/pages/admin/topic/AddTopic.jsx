import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createTopic } from '../../../api/TopicsApi.js';

export default function AddTopic() {
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const value = name.trim();
      if (!value) return;
      await createTopic({ name: value });
      navigate('/admin/topic');
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Thêm chủ đề</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input className="border p-2" placeholder="Tên chủ đề" value={name} onChange={e => setName(e.target.value)} />
        <button className="bg-blue-600 text-white px-4 py-2 rounded">Lưu</button>
      </form>
      {error && <div className="text-red-600 mt-3">{error}</div>}
    </div>
  );
}