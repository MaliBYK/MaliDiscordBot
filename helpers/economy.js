const profileModel = require("../schemas/profileModel");

const createIfNotExist = async userID => {
  let target = await profileModel.findOne({ userID: userID });
  if (!target) {
    target = profileModel.create({
      userID: userID,
    });
  }
  return target;
};

const updateMoney = async (userID, amount) => {
  await createIfNotExist(userID);
  await profileModel.findOneAndUpdate(
    {
      userID: userID,
    },
    {
      $inc: { coins: amount },
    }
  );
};

const controlAmount = async (message, amount) => {
  const { author } = message;

  if (String(amount).toLowerCase() === "all") {
    const profile = await createIfNotExist(author.id, amount);
    amount = profile.coins;
  }
  amount = parseInt(amount);
  if (amount % 1 !== 0 || amount <= 0) {
    message.channel.send(
      ":no_entry_sign: **|** Incorrect Arguments! **Needed Args : <Positive Amount> (optional side of coin`) **"
    );
    return false;
  }
  if (amount > 20000) amount = 20000;

  const memberDB = await createIfNotExist(author.id);
  if (amount > memberDB.coins) {
    message.channel.send(
      ":no_entry_sign: **| You do not have enough gitcoin to do this !** "
    );
    return false;
  }
  return amount;
};

module.exports = {
  createIfNotExist,
  updateMoney,
  controlAmount,
};
