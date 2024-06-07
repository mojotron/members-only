import mongoose from 'mongoose';
import UserType from '../types/userType';

const userSchema = new mongoose.Schema<UserType>({
  firstName: {
    type: String,
    minLength: 3,
    maxLength: 20,
    required: [true, 'please provide first name value'],
  },
  lastName: {
    type: String,
    minLength: 3,
    maxLength: 20,
    required: [true, 'please provide last name value'],
  },
  username: {
    type: String,
    minLength: 3,
    maxLength: 20,
    required: [true, 'please provide username (display) name value'],
    unique: true,
  },
  password: {
    type: String,
    minLength: 6,
    required: [true, 'please provide password value'],
  },
  isMember: {
    type: Boolean,
    required: true,
    default: false,
  },
});

export default mongoose.model<UserType>('User', userSchema);
