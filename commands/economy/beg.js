const { controlAmount, updateMoney } = require("@helpers/economy");

module.exports = {
  name: "beg",
  aliases: ["beg"],
  description: "Beg random Gifcoin from 1 to 500",
  cooldown: "15m",
  cooldownMessage: "**Wait __{REMAINING}__ more execute this command again!**",
  minArgs: 0,
  maxArgs: 0,
  argsMessage: "**Incorrect Arguments!**",
  dev: false,
  devMessage: "You must be a developer to run this command !",
  nsfw: false,
  nsfwMessage: "You cannot run this command in SFW channels",
  permissions: [],
  permissionsMessage: "You do not have permission to use this command!",
  botPermissions: ["SEND_MESSAGES"],
  botPermissionsMessage: `**I cannot run this command without the needed permission(s)!**`,
  category: "Economy",
  locked: false,
  lockedMessage: "This command is locked at the moment!",
  hidden: false,
  hidden2: false,
  servers: [],
  serversMessage: "Use this command in CDHandler support server!",
  callback: async ({ message, args, client, handler }) => {
    const { author } = message;

    const randomAmount = parseInt(Math.random() * 501);

    updateMoney(author.id, randomAmount);

    message.channel.send(
      `🥺 **| ${author.username}** begged 💵 __**${randomAmount}**__ ***gifcoin*** !! You can beg every __15 Minutes__`
    );

    handler.cooldown(message, "15m");
  },
};
