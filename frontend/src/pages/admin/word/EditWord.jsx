import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getWord, updateWord } from '../../../api/WordApi.js';
import { listTopics } from '../../../api/TopicsApi.js';

export default function EditWord() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ topic_id: '', word: '', phonetic: '', definition: '', example: '' });
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const [w, ts] = await Promise.all([getWord(id), listTopics()]);
        setTopics(ts);
        setForm({
          topic_id: w.topic_id?._id || w.topic_id || '',
          word: w.word || '',
          phonetic: w.phonetic || '',
          definition: w.definition || '',
          example: w.example || ''
        });
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateWord(id, form); // gửi JSON object, không FormData
      navigate('/admin/word');
    } catch (e) {
      setError(e.message);
    }
  };

  if (loading) return null;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Sửa từ vựng</h1>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <select name="topic_id" className="border p-2" value={form.topic_id} onChange={handleChange}>
          {topics.map(t => <option key={t._id} value={t._id}>{t.name}</option>)}
        </select>
        <input name="word" className="border p-2" placeholder="Từ" value={form.word} onChange={handleChange} />
        <input name="phonetic" className="border p-2" placeholder="Phiên âm" value={form.phonetic} onChange={handleChange} />
        <input name="definition" className="border p-2" placeholder="Định nghĩa" value={form.definition} onChange={handleChange} />
        <input name="example" className="border p-2" placeholder="Ví dụ" value={form.example} onChange={handleChange} />
        <div className="md:col-span-2">
          <button className="bg-blue-600 text-white px-4 py-2 rounded">Lưu</button>
        </div>
      </form>
      {error && <div className="text-red-600 mt-3">{error}</div>}
    </div>
  );
}