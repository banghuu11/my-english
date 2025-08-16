import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getWord } from '../../../api/WordApi';

export default function ViewWord() {
  const { id } = useParams();
  const [word, setWord] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setLoading(true);
      setWord(await getWord(id));
      setLoading(false);
    })();
  }, [id]);

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Chi tiết từ vựng</h1>
        <div className="space-x-2">
          <Link to="/admin/word" className="px-3 py-2 rounded border">Quay lại</Link>
          {word && (
            <Link to={`/admin/word/${word._id}/edit`} className="px-3 py-2 rounded bg-blue-600 text-white">Sửa</Link>
          )}
        </div>
      </div>

      {loading && <div>Đang tải...</div>}
      {!loading && word && (
        <div className="bg-white rounded shadow p-5 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <div className="text-sm text-gray-500">Từ</div>
            <div className="font-medium">{word.word}</div>
          </div>
          <div>
            <div className="text-sm text-gray-500">Phiên âm</div>
            <div className="font-medium">{word.phonetic || '-'}</div>
          </div>
          <div>
            <div className="text-sm text-gray-500">Nghĩa</div>
            <div className="font-medium">{word.definition}</div>
          </div>
          <div>
            <div className="text-sm text-gray-500">Ví dụ</div>
            <div className="font-medium">{word.example || '-'}</div>
          </div>
          <div>
            <div className="text-sm text-gray-500">Audio URL</div>
            <div className="font-medium">
              {word.audio_url ? <a href={word.audio_url} className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">{word.audio_url}</a> : '-'}
            </div>
          </div>
          <div>
            <div className="text-sm text-gray-500">Chủ đề</div>
            <div className="font-medium">{word.topic_id?.name}</div>
          </div>
        </div>
      )}
    </div>
  );
}