import dotenv from 'dotenv';
dotenv.config();
import express, { json } from 'express';
import cors from 'cors';
import connectDB from './utils/db.js';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();

connectDB();
 
app.use(cors());
app.use(json());


import registerRoutes from './routes/auth/Register.js';
import loginRoutes from './routes/auth/Login.js';
import seedRoutes from './routes/auth/Seed.js';
import wordRoutes from './routes/admin/word.js';
import topicRoutes from './routes/admin/topic.js';
import adminUsersRoutes from './routes/admin/Student.js';
import dictionaryRoutes from './routes/dictionary.js';


app.use('/api/auth', registerRoutes);
app.use('/api/auth', loginRoutes);
app.use('/api/auth', seedRoutes);
app.use('/api/words', wordRoutes);
app.use('/api/topics', topicRoutes);
app.use('/api/admin/users', adminUsersRoutes);
app.use('/api/dictionary', dictionaryRoutes);

router.get('/suggest', dictionaryController.suggestWords);

// Serve static uploads
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

app.get('/', (req, res) => {
  res.send('API is working!');
});

export default app;