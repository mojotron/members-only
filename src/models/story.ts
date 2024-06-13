import mongoose from 'mongoose';
import StoryType from '../types/storyType';
import timeFormat from '../utils/timeFormat';

const storySchema = new mongoose.Schema<StoryType>({
  title: {
    type: String,
    minLength: 5,
    maxLength: 50,
    required: [true, 'story title is required'],
  },
  story: {
    type: String,
    minLength: 10,
    maxLength: 1000,
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

storySchema.virtual('formattedDate').get(function () {
  return timeFormat(this.createdAt);
});

export default mongoose.model<StoryType>('Story', storySchema);
