const { controlAmount, updateMoney } = require("@helpers/economy");

module.exports = {
  commands: ["beg"],
  minArgs: 0,
  maxArgs: 0,
  cooldown: 60 * 15,
  permissions: [],
  permissionsError: "You do not have permission to use this command!",
  callback: async message => {
    const { author } = message;

    const randomAmount = parseInt(Math.random() * 500);

    updateMoney(author.id, randomAmount);

    message.channel.send(
      `🥺 **| ${author.username}** begged 💵 __**${randomAmount}**__ ***gitcoin*** !! You can beg every __15 Minutes__`
    );
  },
};
