import jwt from 'jsonwebtoken';
import Student from '../models/Student.js';

export async function auth(req, res, next) {
  try {
    const authHeader = req.headers.authorization || '';
    const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;
    if (!token) return res.status(401).json({ message: 'Missing token' });

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'dev-secret');
    const student = await Student.findById(decoded.id).lean();
    if (!student) return res.status(401).json({ message: 'Invalid token' });
    req.user = { id: student._id.toString(), role: student.role };
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Unauthorized', error: err.message });
  }
}

export function requireAdmin(req, res, next) {
  if (req.user?.role === 'Admin') return next();
  return res.status(403).json({ message: 'Forbidden: Admin only' });
}
