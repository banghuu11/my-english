import { stripAccents } from '../utils/vnNormalize.js';

export const suggestWords = async (req, res) => {
  try {
    const { q, limit = 10 } = req.query;
    if (!q || !q.trim()) return res.json([]);
    const raw = q.trim();
    const escaped = raw.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

    const looksVi = /[àáạảãăằắặẳẵâầấậẩẫèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ ]/i.test(raw);

    const cond = [
      { word: { $regex: '^' + escaped, $options: 'i' } }
    ];
    if (looksVi) {
      cond.push({ definition: { $regex: escaped, $options: 'i' } });
      // accent-insensitive fallback
      const norm = stripAccents(raw.toLowerCase());
      cond.push({ definition_norm: { $regex: norm, $options: 'i' } });
    }

    const suggestions = await Word.find({ $or: cond })
      .limit(Math.min(parseInt(limit) || 10, 30))
      .select('word phonetic definition')
      .lean();

    res.json(suggestions);
  } catch (err) {
    res.status(500).json({ message: 'Lỗi server', error: err.message });
  }
};