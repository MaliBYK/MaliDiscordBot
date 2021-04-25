const mongoose = require("mongoose");

const profileModel = new mongoose.Schema({
  userID: {
    type: String,
    required: true,
    unique: true,
  },
  coins: {
    type: Number,
    default: 5000,
  },
  bank: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("profiles", profileModel);
