import express from 'express';
import { hash } from 'bcrypt';
import Student from '../../models/Student.js';

const router = express.Router();

router.post('/seed-admin', async (req, res) => {
  try {
    if (String(process.env.ALLOW_SEED || '').toLowerCase() !== 'true') {
      return res.status(403).json({ message: 'Seeding is disabled' });
    }
    const email = (req.body?.email || 'admin@example.com').toLowerCase();
    const password = req.body?.password || 'admin1234';
    const full_name = req.body?.full_name || { first: 'Admin', last: 'User' };

    let user = await Student.findOne({ email });
    const passwordHash = await hash(password, 10);

    if (user) {
      user.password = passwordHash;
      user.role = 'Admin';
      user.full_name = user.full_name || full_name;
      await user.save();
    } else {
      user = await Student.create({ full_name, email, password: passwordHash, role: 'Admin' });
    }

    res.json({ message: 'Admin seeded', email, password });
  } catch (e) {
    res.status(500).json({ message: 'Seed error', error: e.message });
  }
});

export default router;
