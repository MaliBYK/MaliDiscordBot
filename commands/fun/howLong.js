const { controlAmount, updateMoney } = require("@helpers/economy");

module.exports = {
  name: "howlong",
  aliases: ["howlong", "kaccm", "kaçcm"],
  description: "How long is Your Soldier :D",
  cooldown: "2s",
  cooldownMessage: "**Wait __{REMAINING}__ more execute this command again!**",
  minArgs: 0,
  maxArgs: 1,
  argsMessage: "**Incorrect Arguments!**",
  dev: false,
  devMessage: "You must be a developer to run this command !",
  nsfw: false,
  nsfwMessage: "You cannot run this command in SFW channels",
  permissions: [],
  permissionsMessage: "You do not have permission to use this command!",
  botPermissions: ["SEND_MESSAGES"],
  botPermissionsMessage: `**I cannot run this command without the needed permission(s)!**`,
  category: "Fun",
  locked: false,
  lockedMessage: "This command is locked at the moment!",
  hidden: false,
  hidden2: false,
  servers: [],
  serversMessage: "Use this command in CDHandler support server!",
  callback: async ({ message, args, client, handler }) => {
    const { author, mentions } = message;
    let target = mentions.users.first();

    if (!target) target = author;

    const randomAmount = parseInt(Math.random() * 51);
    message.channel.send(
      `:flushed: **| ${target.username}**'s Soldier is 🍆 __**${randomAmount}**__  cm!! :shushing_face:`
    );

    handler.cooldown(message, "2s");
  },
};
