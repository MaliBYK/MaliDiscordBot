const profileModel = require("@schemas/profileModel");
const createIfNotExist = async (memberID, guildID) => {
  let target = await profileModel.findOne({ userID: memberID });
  if (!target) {
    target = profileModel.create({
      userID: memberID,
      guildID: guildID,
    });
  }
  return target;
};

const updateMoney = async (userID, guildID, amount) => {
  // createIfNotExist(memberID, guildID).then(profile => {
  const user = await profileModel.findOneAndUpdate(
    {
      userID: userID,
    },
    {
      $inc: { coins: amount },
    }
  );
  // });
  return;
};

module.exports = {
  createIfNotExist,
  updateMoney,
};
