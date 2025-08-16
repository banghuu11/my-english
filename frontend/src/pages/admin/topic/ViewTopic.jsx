import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getTopic } from '../../../api/TopicsApi.js';

export default function ViewTopic() {
  const { id } = useParams();
  const [topic, setTopic] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const t = await getTopic(id);
        setTopic(t);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Chi tiết chủ đề</h1>
        <div className="space-x-2">
          <Link to="/admin/topic" className="px-3 py-2 rounded border">Quay lại</Link>
          {topic && (
            <Link to={`/admin/topic/${topic._id}/edit`} className="px-3 py-2 rounded bg-blue-600 text-white">Sửa</Link>
          )}
        </div>
      </div>

      {loading && <div>Đang tải...</div>}
      {error && <div className="text-red-600">{error}</div>}
      {!loading && !error && topic && (
        <div className="bg-white rounded shadow p-5">
          <div className="text-sm text-gray-500 mb-1">Tên chủ đề</div>
          <div className="font-medium">{topic.name}</div>
        </div>
      )}
    </div>
  );
}