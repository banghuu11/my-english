import { Schema, model } from 'mongoose';

const studentSchema = new Schema({
  full_name: {
    first: { type: String, required: true },
    last: { type: String, required: true }
  },
  email: { type: String, required: true, unique: true },
  phone: { type: String },
  date_birth: { type: Date },
  address: {
    street: { type: String },
    city: { type: String },
    state: { type: String },
    zip_code: { type: String }
  },
  avatar: { type: String },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ['student', 'Admin'], // các giá trị cho phép
    default: 'student'
  }
}, { timestamps: { createdAt: 'created_at', updatedAt: false } });

export default model('Student', studentSchema);