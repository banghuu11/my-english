import Student from '../models/Student.js';
import { hash } from 'bcrypt';

// List users (exclude password)
export const listStudents = async (_req, res) => {
  try {
    const users = await Student.find({}, { password: 0 }).sort({ created_at: -1 }).lean();
    res.json({ users });
  } catch (e) {
    res.status(500).json({ message: 'Server error', error: e.message });
  }
};

// Get user by id (exclude password)
export const getStudentById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await Student.findById(id, { password: 0 }).lean();
    if (!user) return res.status(404).json({ message: 'Not found' });
    res.json({ user });
  } catch (e) {
    res.status(500).json({ message: 'Server error', error: e.message });
  }
};

// Create user (hash password)
export const createStudent = async (req, res) => {
  try {
    const { full_name, email, phone, date_birth, address, password, role, avatar } = req.body;
    const exists = await Student.findOne({ email });
    if (exists) return res.status(400).json({ message: 'Email already exists' });
    const hashed = await hash(password || '12345678', 10);
    const user = await Student.create({
      full_name,
      email,
      phone,
      date_birth: date_birth ? new Date(date_birth) : undefined,
      address,
      avatar,
      role: role || 'student',
      password: hashed
    });
    const { password: _omit, ...userWithoutPassword } = user.toObject();
    res.status(201).json({ message: 'User created', user: userWithoutPassword });
  } catch (e) {
    res.status(500).json({ message: 'Server error', error: e.message });
  }
};

// Update user (hash password if provided)
export const updateStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const { full_name, phone, date_birth, address, role, avatar, password } = req.body;
    const update = { full_name, phone, address, role, avatar };
    if (date_birth) update.date_birth = new Date(date_birth);
    if (password) update.password = await hash(password, 10);
    const user = await Student.findByIdAndUpdate(id, update, { new: true, projection: { password: 0 } });
    if (!user) return res.status(404).json({ message: 'Not found' });
    res.json({ message: 'User updated', user });
  } catch (e) {
    res.status(500).json({ message: 'Server error', error: e.message });
  }
};

// Delete user
export const deleteStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Student.findByIdAndDelete(id);
    if (!result) return res.status(404).json({ message: 'Not found' });
    res.json({ message: 'User deleted' });
  } catch (e) {
    res.status(500).json({ message: 'Server error', error: e.message });
  }
};
export const searchStudent = async (req, res) => {
  try { 
    const { q, name, email, phone, date_birth, address, role } = req.query;

    let filter = {};

    // Nếu có q, tìm trên full_name, email, address (tùy bạn muốn + thêm các trường khác)
    if (q) {
      filter.$or = [
        { full_name: { $regex: q, $options: 'i' } },
        { email: { $regex: q, $options: 'i' } },
        { address: { $regex: q, $options: 'i' } },
        { phone: { $regex: q, $options: 'i' } }
      ];
    }

    // Các điều kiện lọc cụ thể
    if (name) {
      filter.full_name = { $regex: name, $options: 'i' };
    }
    if (email) {
      filter.email = { $regex: email, $options: 'i' };
    }
    if (phone) {
      filter.phone = { $regex: phone, $options: 'i' };
    }
    if (date_birth) {
      filter.date_birth = { $regex: date_birth, $options: 'i' };
    }
    if (address) {
      filter.address = { $regex: address, $options: 'i' };
    }
    if (role) {
      filter.role = { $regex: role, $options: 'i' };
    }

    const students = await Student.find(filter);
    res.json(students);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
}