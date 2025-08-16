import express from 'express';
import * as dictionaryController from '../controllers/DictionaryController.js';

const router = express.Router();

// Tìm kiếm theo mode (vi | en | all)
router.get('/search', dictionaryController.searchWords);

// Gợi ý (autocomplete) – phải trước '/:id'
router.get('/suggest', dictionaryController.suggestWords);

// Debug / trạng thái (tùy chọn)
router.get('/status', dictionaryController.status);

// Lấy chi tiết 1 từ
router.get('/:id', dictionaryController.getWordById);

// Tạo mới (nếu cần cho admin)
router.post('/', dictionaryController.createWord);

export default router;