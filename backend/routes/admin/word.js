import express from 'express';
import * as wordController from '../../controllers/WordController.js';

const router = express.Router();

router.get('/', wordController.getAllWords);
router.get('/:id', wordController.getWordById);
router.post('/', wordController.createWord);
router.put('/:id', wordController.updateWord);
router.delete('/:id', wordController.deleteWord);

export default router;