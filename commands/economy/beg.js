const { controlAmount, updateMoney } = require("@helpers/economy");

module.exports = {
  commands: ["beg"],
  minArgs: 0,
  maxArgs: 0,
  permissions: [],
  permissionsError: "You do not have permission to use this command!",
  category: "Economy",
  callback: async (message, args, client, handler) => {
    const { author } = message;

    const randomAmount = parseInt(Math.random() * 500);

    updateMoney(author.id, randomAmount);

    message.channel.send(`🥺 **| ${author.username}** begged 💵 __**${randomAmount}**__ ***gifcoin*** !! You can beg every __15 Minutes__`);

    handler.cooldown(message, "15m");
  },
};
