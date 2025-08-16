    import express from 'express';
    import bcrypt from 'bcrypt';
    import jwt from 'jsonwebtoken';
    import Student from '../../models/Student.js';

    const router = express.Router();

    // Đăng nhập student
    router.post('/login-student', async (req, res) => {
        try {
            const { email, password } = req.body;
            console.log('[AUTH] Incoming login-student body:', req.body);

            // Kiểm tra tồn tại email
            const student = await Student.findOne({ email });
            if (!student) return res.status(400).json({ message: 'Email not found' });

            // So sánh password
            const isMatch = await bcrypt.compare(password, student.password);
            if (!isMatch) return res.status(400).json({ message: 'Password incorrect' });

            // Tạo JWT token
            const token = jwt.sign(
                { id: student._id },
                process.env.JWT_SECRET || 'dev-secret',
                { expiresIn: '1d' }
            );

            res.status(200).json({
                token,
                student: {
                    id: student._id,
                    full_name: student.full_name,
                    email: student.email,
                    role: student.role || 'student',
                    avatar: student.avatar || null
                }
            });
        } catch (error) {
            console.error('[AUTH] Error:', error);
            res.status(500).json({ message: 'Server error' });
        }
    });

    export default router;