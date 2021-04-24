const mongoose = require("mongoose");
const mongo = require("@helpers/mongo");

const stringReq = {
  type: String,
  required: true,
};

const ProfileSchema = mongoose.Schema({
  profilePicture: stringReq,
  nickname: stringReq,
  description: stringReq,
  skills: {
    type: Object,
    default: [],
  },
});

module.exports = mongoose.model("profile", ProfileSchema);
