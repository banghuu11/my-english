import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getTopic, updateTopic } from '../../../api/TopicsApi.js';

export default function EditTopic() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const topic = await getTopic(id);
        setName(topic.name || '');
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const value = name.trim();
      if (!value) return;
      await updateTopic(id, { name: value });
      navigate('/admin/topic');
    } catch (e) {
      setError(e.message);
    }
  };

  if (loading) return null;

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Sửa chủ đề</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input className="border p-2" placeholder="Tên chủ đề" value={name} onChange={e => setName(e.target.value)} />
        <button className="bg-blue-600 text-white px-4 py-2 rounded">Lưu</button>
      </form>
      {error && <div className="text-red-600 mt-3">{error}</div>}
    </div>
  );
}