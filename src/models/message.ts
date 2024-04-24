import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
  title: {
    type: String,
    minLength: 10,
    maxLength: 500,
    required: [true, 'message title is required'],
  },
  body: {
    type: String,
    minLength: 10,
    maxLength: 500,
    required: [true, 'message body is required'],
  },
  createdBy: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: [true, 'message creator must be specified'],
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

export default mongoose.model('Message', messageSchema);
