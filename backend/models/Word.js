import mongoose from 'mongoose';
import { stripAccents } from '../utils/vnNormalize.js';

const { Schema } = mongoose;

const WordSchema = new Schema(
  {
    topic_id: { type: Schema.Types.ObjectId, ref: 'Topic', required: true },
    word: { type: String, required: true, trim: true },
    word_norm: { type: String, index: true },
    phonetic: { type: String, trim: true },
    definition: { type: String, trim: true },
    definition_norm: { type: String, index: true },
    definition_en: { type: String, trim: true },
    example: { type: String, trim: true },
    example_en: { type: String, trim: true },
    audio_url: { type: String, trim: true }
  },
  { timestamps: true }
);

// Middleware: tự tạo *_norm trước save
WordSchema.pre('save', function (next) {
  if (this.isModified('word')) {
    this.word_norm = stripAccents(this.word.toLowerCase());
  }
  if (this.isModified('definition') && this.definition) {
    this.definition_norm = stripAccents(this.definition.toLowerCase());
  }
  next();
});

WordSchema.index({ word: 1 });
WordSchema.index({ definition: 1 });
WordSchema.index({ word_norm: 1 });
WordSchema.index({ definition_norm: 1 });
WordSchema.index({ word: 1, definition: 1 });

export default mongoose.model('Word', WordSchema);