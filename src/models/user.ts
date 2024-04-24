import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
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
});

export default mongoose.model('User', userSchema);
