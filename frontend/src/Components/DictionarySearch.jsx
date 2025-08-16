import { useState, useEffect, useRef } from 'react';
import { searchWords, suggestWords } from '../api/dictionaryApi.js';
import TTSButton from './TTSButton.jsx';

export default function DictionarySearch() {
  const [query, setQuery] = useState('');
  const [mode, setMode] = useState('vi'); // vi | en | all
  const [suggestions, setSuggestions] = useState([]);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const debounceRef = useRef(null);

  useEffect(() => {
    if (!query.trim()) {
      setSuggestions([]);
      return;
    }
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(async () => {
      try {
        const data = await suggestWords(query);
        setSuggestions(Array.isArray(data) ? data : []);
      } catch {
        setSuggestions([]);
      }
    }, 300);
    return () => clearTimeout(debounceRef.current);
  }, [query]);

  const doSearch = async (q) => {
    setLoading(true);
    setError('');
    try {
      const data = await searchWords({ q, mode, limit: 200 });
      setResults(Array.isArray(data) ? data : []);
    } catch (e) {
      setResults([]);
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    doSearch(query);
    setSuggestions([]);
  };

  const handleSuggestionClick = (s) => {
    setQuery(s.word); // Có thể gán luôn definition tùy ý
    setSuggestions([]);
    doSearch(s.word);
  };

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-4">
      <form onSubmit={handleSubmit} className="flex gap-2">
        <div className="flex-1 relative">
          <input
            className="border p-2 w-full rounded"
            placeholder={
              mode === 'vi'
                ? 'Nhập nghĩa tiếng Việt (ví dụ: du lịch, xin chào...)'
                : mode === 'en'
                  ? 'Nhập từ tiếng Anh (travel, hello...)'
                  : 'Nhập từ hoặc nghĩa...'
            }
            value={query}
            onChange={e => setQuery(e.target.value)}
            autoComplete="off"
          />
          {suggestions.length > 0 && (
            <ul className="absolute z-20 bg-white border w-full mt-1 max-h-72 overflow-y-auto rounded shadow">
              {suggestions.map((s, idx) => {
                const isVN = s.definition && s.definition.toLowerCase().includes(query.toLowerCase());
                return (
                  <li
                    key={s._id + idx}
                    onClick={() => handleSuggestionClick(s)}
                    className="px-3 py-2 cursor-pointer hover:bg-blue-50 flex flex-col gap-1"
                  >
                    <div className="flex items-center justify-between">
                      <div className="font-semibold text-blue-700">{s.word}</div>
                      <div className="flex items-center gap-2">
                        {s.phonetic && <span className="text-xs text-gray-500">/{s.phonetic}/</span>}
                        <span className={`text-xs px-2 py-1 rounded-full ${isVN ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>
                          {isVN ? '🇻🇳 match nghĩa' : '🇺🇸 match từ'}
                        </span>
                        <TTSButton text={s.word} phonetic={s.phonetic} />
                      </div>
                    </div>
                    {s.definition && (
                      <div className="text-xs text-gray-600 line-clamp-2">
                        {s.definition.length > 100 ? s.definition.slice(0,100)+'…' : s.definition}
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          )}
        </div>
        <select value={mode} onChange={e => setMode(e.target.value)} className="border p-2 rounded">
          <option value="vi">VI</option>
          <option value="en">EN</option>
          <option value="all">ALL</option>
        </select>
        <button type="submit" className="bg-blue-600 text-white px-4 rounded">
          Tìm
        </button>
      </form>

      {loading && <div className="text-center text-sm">Đang tìm...</div>}
      {error && <div className="text-red-600">{error}</div>}

      {!loading && !error && results.length === 0 && query && (
        <div className="text-gray-500">Không có kết quả</div>
      )}

      <div className="space-y-4">
        {results.map(r => (
          <div key={r._id} className="border rounded p-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-bold text-lg text-blue-700">{r.word}</h3>
              <TTSButton text={r.word} phonetic={r.phonetic} />
            </div>
            {r.phonetic && <div className="text-gray-500 mb-2 text-sm">/{r.phonetic}/</div>}
            {r.definition && (
              <div className="mb-2">
                <span className="font-semibold text-sm text-blue-600">Nghĩa: </span>{r.definition}
              </div>
            )}
            {r.example && (
              <div className="text-sm italic bg-yellow-50 p-2 rounded">
                {r.example}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}