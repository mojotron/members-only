import mongoose from 'mongoose';

const storySchema = new mongoose.Schema({
  title: {
    type: String,
    minLength: 5,
    maxLength: 50,
    required: [true, 'story title is required'],
  },
  story: {
    type: String,
    minLength: 10,
    maxLength: 500,
    required: [true, 'story body is required'],
  },
  createdBy: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: [true, 'story creator must be specified'],
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

export default mongoose.model('Story', storySchema);
