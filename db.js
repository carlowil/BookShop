const mongoose = require("mongoose");

const dbUrl = 'mongodb://BKS:carlowil@localhost:27017/bks';

const connectDB = async () => {
    await mongoose.connect(dbUrl);
    console.log("MongoDB Connected");
  };

module.exports = connectDB;