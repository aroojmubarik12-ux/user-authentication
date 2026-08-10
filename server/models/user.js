const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "Please fill first name"],
    minLength: [3, "Length should be at least 3 characters"],
    maxLength: [15, "Length cannot exceed 15 characters"],
    trim: true
  },
  lastName: {
    type: String,
    required: [true, "Please fill last name"],
    minLength: [3, "Length should be at least 3 characters"],
    maxLength: [15, "Length should be at least 3 characters"],
    trim: true
  },
  email: {
    type: String,
    required: [true, "Please fill email"],
    unique: true, // Fixed: unique index accepts boolean
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: [true, "Please fill password field"],
    minLength: [8, "Password must be at least 8 characters"]
  }
});

const userModel = mongoose.model('user', userSchema);

module.exports = userModel;