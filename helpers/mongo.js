const mongoose = require("mongoose");
const MONGO_PATH = "mongodb+srv://discordbot:sondamla2014@malibyk.rc1l7.mongodb.net/DiscordBotDB?retryWrites=true&w=majority";

module.exports = async () => {
  await mongoose
    .connect(MONGO_PATH, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    })
    .then(console.log("[READY] Connected to Database!"))
    .catch(err => console.error(err));
};
