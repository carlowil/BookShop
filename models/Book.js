const mongoose = require("mongoose");
const reviewExports = require("./Review")
const BookSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  pub_year: {
    type: Number,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  }, 
  genres: [{
    type: String
  }],
  image: {
    type: String,
    required: true
  },
  reviews: {
    type: [reviewExports.reviewSchema],
    default: []
  },
  hidden: Boolean
})

module.exports = mongoose.model("book", BookSchema);