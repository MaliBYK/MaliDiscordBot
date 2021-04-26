const { createIfNotExist } = require("@helpers/economy");

module.exports = {
  commands: ["money", "cash", "para"],
  permissions: [],
  cooldown: 3,
  callback: async (message, args, text) => {
    const { author } = message;
    const profile = await createIfNotExist(author.id);

    message.channel.send(
      `💰 **|** **${author.username}**, you totally have __**${profile.coins}**__  ***gitcoin!***`
    );
  },
};
