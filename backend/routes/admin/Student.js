import { Router } from 'express';
import { auth, requireAdmin } from '../../middleware/auth.js';
import {
  listStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent
} from '../../controllers/StudentController.js';

const router = Router();

router.get('/', auth, requireAdmin, listStudents);
router.get('/:id', auth, requireAdmin, getStudentById);
router.post('/', auth, requireAdmin, createStudent);
router.put('/:id', auth, requireAdmin, updateStudent);
router.delete('/:id', auth, requireAdmin, deleteStudent);



export default router;
