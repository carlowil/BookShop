const mongoose = require("mongoose")
const ReviewSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: false,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now(),
    required: true
  },
  mes: {
    type: String,
    required: true
  }
})
exports.reviewSchema = ReviewSchema;
module.exports = mongoose.model("review", ReviewSchema);