import { useState } from 'react';

export default function TTSButton({ text, phonetic, title = 'Phát âm' }) {
  const [loading, setLoading] = useState(false);

  const speak = () => {
    if (!text) return;
    try {
      setLoading(true);
      const utter = new SpeechSynthesisUtterance(text);
      utter.lang = 'en-US';
      utter.rate = 1;
      utter.pitch = 1;
      utter.onend = () => setLoading(false);
      speechSynthesis.speak(utter);
    } catch {
      setLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={speak}
      disabled={loading}
      className="flex items-center gap-1 text-sm px-2 py-1 rounded bg-slate-200 hover:bg-slate-300 transition"
      title={title}
    >
      {loading ? '...' : '🔊'} {phonetic && <span className="text-xs text-gray-500">{`/${phonetic}/`}</span>}
    </button>
  );
}