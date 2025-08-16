  import Topic from '../models/Topic.js';

  export const getAllTopics = async (_req, res) => {
    try {
      const topics = await Topic.find({}).sort({ createdAt: -1 }).lean();
      res.json(topics);
    } catch (err) {
      res.status(500).json({ message: 'Server error', error: err.message });
    }
  };

  export const getTopicById = async (req, res) => {
    try {
      const topic = await Topic.findById(req.params.id).lean();
      if (!topic) return res.status(404).json({ message: 'Topic not found' });
      res.json(topic);
    } catch (err) {
      res.status(500).json({ message: 'Server error', error: err.message });
    }
  };

  export const createTopic = async (req, res) => {
    try {
      const { name } = req.body;
      if (!name || !name.trim()) return res.status(400).json({ message: 'Name is required' });
      const exist = await Topic.findOne({ name: name.trim() });
      if (exist) return res.status(400).json({ message: 'Topic already exists' });
      const topic = await Topic.create({ name: name.trim() });
      res.status(201).json(topic);
    } catch (err) {
      res.status(400).json({ message: 'Bad request', error: err.message });
    }
  };

  export const updateTopic = async (req, res) => {
    try {
      const { name } = req.body;
      const update = {};
      if (typeof name === 'string' && name.trim()) update.name = name.trim();
      const topic = await Topic.findByIdAndUpdate(req.params.id, update, { new: true });
      if (!topic) return res.status(404).json({ message: 'Topic not found' });
      res.json(topic);
    } catch (err) {
      res.status(400).json({ message: 'Bad request', error: err.message });
    }
  };

  export const deleteTopic = async (req, res) => {
    try {
      const result = await Topic.findByIdAndDelete(req.params.id);
      if (!result) return res.status(404).json({ message: 'Topic not found' });
      res.json({ message: 'Topic deleted' });
    } catch (err) {
      res.status(500).json({ message: 'Server error', error: err.message });
    }
  };
