import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createWord } from '../../../api/WordApi.js';
import { listTopics } from '../../../api/TopicsApi.js';

export default function AddWord() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ topic_id: '', word: '', phonetic: '', definition: '', example: '', audio: null });
  const [topics, setTopics] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const data = await listTopics();
        setTopics(data);
        if (data.length && !form.topic_id) setForm(f => ({ ...f, topic_id: data[0]._id }));
      } catch (e) {
        // ignore
      }
    })();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'audio') {
      setForm(prev => ({ ...prev, audio: files?.[0] || null  }));
    } else {
      setForm(prev => ({ ...prev, [name]: value }));
    }
  };
const handleSubmit = async (e) => {
  e.preventDefault();
  setError('');
  try {
    // Gửi object thường, không phải FormData
    const payload = {
      topic_id: form.topic_id,
      word: form.word,
      phonetic: form.phonetic,
      definition: form.definition,
      example: form.example
    };
    await createWord(payload); // API sẽ gửi JSON
    navigate('/admin/word');
  } catch (e) {
    setError(e.message);
  }
};

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Thêm từ vựng</h1>
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