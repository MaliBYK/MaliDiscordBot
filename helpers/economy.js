const profileModel = require("@models/profileModel");

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
  await createIfNotExist(userID)
  await profileModel.findOneAndUpdate(
    {
      userID: userID,
    },
    {
      $inc: { coins: amount },
    }
  );
};

module.exports = {
  createIfNotExist,
  updateMoney,
};
