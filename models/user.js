const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,      // Ensure consistent casing
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  verified: {
    type: Boolean,
    default: false
  },
  otp: {
    type: String
  },
  otpExpires: {
    type: Date
  },
  name: {
    type: String,
    trim: true
  },
  profilePic: {
    type: String,
    trim: true
  },

  // 🔢 BMR / TDEE Related Fields
  gender: {
    type: String,
    enum: ['male', 'female', 'other'],
    lowercase: true
  },
  age: {
    type: Number,
    min: 0
  },
  height: {
    type: Number,
    min: 0    // in cm
  },
  weight: {
    type: Number,
    min: 0    // in kg
  },
  activityLevel: {
    type: String,
    enum: [
      'sedentary',
      'lightly_active',
      'moderately_active',
      'very_active',
      'extra_active'
    ],
    lowercase: true
  }
}, {
  timestamps: true // Automatically adds createdAt and updatedAt fields
});

module.exports = mongoose.model("User", userSchema);
