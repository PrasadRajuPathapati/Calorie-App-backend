const mongoose = require("mongoose");

const foodSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,   // Ensures consistency in storage
    trim: true          // Removes extra spaces
  },
  calories: {
    type: Number,
    required: true,
    min: 0
  },
  category: {
    type: String,
    default: 'Other'
  },
  region: {
    type: String,
    trim: true
  },
  typicalServingSize: {
    type: String,
    trim: true
  },
  protein: {
    type: Number,
    default: 0,
    min: 0
  },
  carbohydrates: {
    type: Number,
    default: 0,
    min: 0
  },
  fats: {
    type: Number,
    default: 0,
    min: 0
  }
}, {
  timestamps: true // Adds createdAt and updatedAt automatically
});

module.exports = mongoose.model("Food", foodSchema);
