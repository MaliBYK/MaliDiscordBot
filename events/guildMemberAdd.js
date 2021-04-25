const profileModel = require("@models/profileModel");
const { createIfNotExist } = require("@helpers/economy");
module.exports = async (client, member) => {
  createIfNotExist(member.id, member.guild.id);
};
