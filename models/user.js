const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  verified: { type: Boolean, default: false },
  otp: { type: String },
  otpExpires: { type: Date },
  name: { type: String },
  profilePic: { type: String },
  gender: { type: String, enum: ['male', 'female', 'other'], lowercase: true },
  age: { type: Number, min: 0 },
  height: { type: Number, min: 0 }, // in cm
  weight: { type: Number, min: 0 }, // in kg
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
});

module.exports = mongoose.model("User", userSchema);