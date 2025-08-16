import { Schema, model } from 'mongoose';

const topicSchema = new Schema({
  name: { type: String, required: true }
}, {
  timestamps: true // Tự động thêm createdAt, updatedAt nếu muốn
});

export default model('Topic', topicSchema);