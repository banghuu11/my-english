import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { listTopics, deleteTopic } from '../../../api/TopicsApi.js';

export default function TopicList() {
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchData = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await listTopics();
      setTopics(data);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const handleDelete = async (id) => {
    if (!confirm('Xoá chủ đề này?')) return;
    await deleteTopic(id);
    fetchData();
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Chủ đề</h1>
        <Link to="/admin/topic/add" className="bg-blue-600 text-white px-4 py-2 rounded">Thêm</Link>
      </div>
      {loading ? 'Đang tải...' : error ? (
        <div className="text-red-600">{error}</div>
      ) : (
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-2">Tên chủ đề</th>
              <th className="p-2">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {topics.map(t => (
              <tr key={t._id} className="border-t">
                <td className="p-2">{t.name}</td>
                <td className="p-2 space-x-3">
                  <Link to={`/admin/topic/${t._id}`} className="text-green-600">Xem</Link>
                  <Link to={`/admin/topic/${t._id}/edit`} className="text-blue-600">Sửa</Link>
                  <button className="text-red-600" onClick={() => handleDelete(t._id)}>Xoá</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}