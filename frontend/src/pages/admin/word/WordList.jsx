  import { useEffect, useState } from 'react';
  import { Link } from 'react-router-dom';
  import { listWords, deleteWord } from '../../../api/WordApi.js';
  import TTSButton from '../../../Components/TTSButton.jsx';

  export default function WordList() {
    const [words, setWords] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const fetchData = async () => {
      setLoading(true);
      setError('');
      try {
        const data = await listWords();
        setWords(data);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    useEffect(() => { fetchData(); }, []);

    const handleDelete = async (id) => {
      if (!window.confirm('Xoá từ vựng này?')) return;
      await deleteWord(id);
      fetchData();
    };

    return (
      <div className="max-w-6xl mx-auto p-4 md:p-6">
        <div className="flex flex-col md:flex-row items-center justify-between mb-4 gap-3">
          <h1 className="text-2xl font-bold">Từ vựng</h1>
          <Link to="/admin/word/add" className="bg-blue-600 text-white px-4 py-2 rounded whitespace-nowrap">Thêm</Link>
        </div>
        {loading ? (
          <div className="text-gray-600">Đang tải...</div>
        ) : error ? (
          <div className="text-red-600">{error}</div>
        ) : (
          <div className="overflow-x-auto rounded shadow">
            <table className="min-w-full bg-white">
              <thead>
                <tr className="bg-gray-100 text-left">
                  <th className="p-2">Từ</th>
                  <th className="p-2 hidden sm:table-cell">Phiên âm</th>
                  <th className="p-2 hidden sm:table-cell">Định nghĩa</th>
                  <th className="p-2 hidden md:table-cell">Chủ đề</th>
                  <th className="p-2">Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {words.map(w => (
                  <tr key={w._id} className="border-t">
                    <td className="p-2 flex items-center gap-2">
                      <span className="block">{w.word}</span>
                      <TTSButton text={w.word} />
                    </td>
                    <td className="p-2 hidden sm:table-cell">{w.phonetic || '-'}</td>
                    <td className="p-2 hidden sm:table-cell">{w.definition || '-'}</td>
                    <td className="p-2 hidden md:table-cell">{w.topic_id?.name || '-'}</td>
                    <td className="p-2 flex flex-col gap-1 sm:flex-row sm:items-center sm:space-x-3">
                      <Link to={`/admin/word/${w._id}`} className="text-green-600 whitespace-nowrap">Xem</Link>
                      <Link to={`/admin/word/${w._id}/edit`} className="text-blue-600 whitespace-nowrap">Sửa</Link>
                      <button
                        className="text-red-600 whitespace-nowrap"
                        onClick={() => handleDelete(w._id)}
                      >
                        Xoá
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    );
  }