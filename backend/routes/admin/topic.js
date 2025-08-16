import express from 'express';
import {
  getAllTopics,
  getTopicById,
  createTopic,
  updateTopic,
  deleteTopic
} from '../../controllers/TopicController.js';

const router = express.Router();

// Lấy tất cả chủ đề
router.get('/', getAllTopics);

// Lấy một chủ đề theo id
router.get('/:id', getTopicById);

// Thêm mới chủ đề
router.post('/', createTopic);

// Sửa chủ đề
router.put('/:id', updateTopic);

// Xóa chủ đề
router.delete('/:id', deleteTopic);

export default router;