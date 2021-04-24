const mongoose = require("mongoose");
const { MONGO_PATH } = require("@config/config.json");

module.exports = async () => {
  await mongoose.connect(MONGO_PATH, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  return mongoose;
};
