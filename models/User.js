const mongoose = require("mongoose")
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    minlength: 6,
    required: true,
  },
  role: {
    type: String,
    default: "user",
    required: true,
  },
})

module.exports = mongoose.model("user", UserSchema);