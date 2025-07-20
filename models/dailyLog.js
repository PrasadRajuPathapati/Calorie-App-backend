const mongoose = require("mongoose");

const foodEntrySchema = new mongoose.Schema({
  foodId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Food',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  caloriesPerServing: {
    type: Number,
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: 0.1
  },
  proteinPerServing: {
    type: Number,
    default: 0
  },
  carbohydratesPerServing: {
    type: Number,
    default: 0
  },
  fatsPerServing: {
    type: Number,
    default: 0
  }
}, { _id: false });

const dailyLogSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  date: {
    type: Date,
    required: true,
    default: () => {
      const d = new Date();
      d.setHours(0, 0, 0, 0); // Set to start of day
      return d;
    },
    set: function(date) {
      const d = new Date(date);
      d.setHours(0, 0, 0, 0);
      return d;
    }
  },
  foods: {
    type: [foodEntrySchema],
    default: []
  },
  totalCalories: {
    type: Number,
    default: 0
  },
  totalProtein: {
    type: Number,
    default: 0
  },
  totalCarbohydrates: {
    type: Number,
    default: 0
  },
  totalFats: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Unique constraint: one log per user per day
dailyLogSchema.index({ userId: 1, date: 1 }, { unique: true });

// Automatically calculate totals before saving
dailyLogSchema.pre('save', function (next) {
  let sumCalories = 0;
  let sumProtein = 0;
  let sumCarbs = 0;
  let sumFats = 0;

  this.foods.forEach(foodEntry => {
    const qty = foodEntry.quantity || 0;
    sumCalories += (foodEntry.caloriesPerServing || 0) * qty;
    sumProtein += (foodEntry.proteinPerServing || 0) * qty;
    sumCarbs += (foodEntry.carbohydratesPerServing || 0) * qty;
    sumFats += (foodEntry.fatsPerServing || 0) * qty;
  });

  this.totalCalories = sumCalories;
  this.totalProtein = sumProtein;
  this.totalCarbohydrates = sumCarbs;
  this.totalFats = sumFats;

  next();
});

module.exports = mongoose.model("DailyLog", dailyLogSchema);
