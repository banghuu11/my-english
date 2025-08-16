import Word from '../models/Word.js';

// Get all words
export const getAllWords = async (req, res) => {
  try {
    const filter = {};
    if (req.query.topic_id) filter.topic_id = req.query.topic_id;
    const words = await Word.find(filter).populate('topic_id', 'name');
    res.json(words);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Get one word by id
export const getWordById = async (req, res) => {
  try {
    const word = await Word.findById(req.params.id).populate('topic_id', 'name');
    if (!word) return res.status(404).json({ message: 'Word not found' });
    res.json(word);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Create new word
export const createWord = async (req, res) => {
  try {
    const payload = { ...req.body };
    if (!payload.word || !payload.topic_id) {
      return res.status(400).json({ message: 'Thiếu dữ liệu: cần có word và topic_id' });
    }
    const word = new Word(payload);
    await word.save();
    res.status(201).json(word);
  } catch (err) {
    res.status(400).json({ message: 'Bad request', error: err.message });
  }
};

// Update word
export const updateWord = async (req, res) => {
  try {
    const payload = { ...req.body };
    const word = await Word.findByIdAndUpdate(req.params.id, payload, { new: true });
    if (!word) return res.status(404).json({ message: 'Word not found' });
    res.json(word);
  } catch (err) {
    res.status(400).json({ message: 'Bad request', error: err.message });
  }
};

// Delete word
export const deleteWord = async (req, res) => {
  try {
    const word = await Word.findByIdAndDelete(req.params.id);
    if (!word) return res.status(404).json({ message: 'Word not found' });
    res.json({ message: 'Word deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};