import { Router } from 'express';
const router = Router();
import { hash } from 'bcrypt';
import jwt from 'jsonwebtoken';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import Student from '../../models/Student.js';

// Ensure uploads dir exists (relative to backend working dir)
const uploadsDir = path.join(process.cwd(), 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (_req, _file, cb) {
    cb(null, uploadsDir);
  },
  filename: function (_req, file, cb) {
    const safeName = file.originalname.replace(/\s+/g, '-');
    cb(null, `${Date.now()}-${safeName}`);
  }
});

const upload = multer({ storage });

// Đăng ký student
router.post('/register-student', upload.single('avatar'), async (req, res) => {
  try {
   let { full_name, email, phone, date_birth, address, password, role } = req.body;
    console.log('[AUTH] Incoming register-student body:', req.body);
    if (typeof full_name === 'string') {
      try { full_name = JSON.parse(full_name); } catch {}
    }
    if (typeof address === 'string') {
      try { address = JSON.parse(address); } catch {}
    }

    // Kiểm tra trùng email
    const exist = await Student.findOne({ email });
    if (exist) return res.status(400).json({ message: 'Email already exists' });

    // Mã hóa mật khẩu
    const hashedPassword = await hash(password, 10);

    const avatarPath = req.file ? `/uploads/${req.file.filename}` : null;

    const student = new Student({
      full_name,
      email,
      phone,
      date_birth: date_birth ? new Date(date_birth) : undefined,
      address,
      role: role || 'student',
      avatar: avatarPath,
      password: hashedPassword
    });

    await student.save();
    console.log('[AUTH] Saved student with _id:', student._id.toString());
    // Create JWT token like login
    const token = jwt.sign(
      { id: student._id },
      process.env.JWT_SECRET || 'dev-secret',
      { expiresIn: '1d' }
    );

    res.status(201).json({
      message: 'Students registered successfully!',
      token,
      student: {
        id: student._id,
        full_name: student.full_name,
        email: student.email,
        role: student.role || 'student',
        avatar: student.avatar || null
      }
    });
  } catch (err) {
    console.error('[AUTH] register-student error:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

export default router;