const { createIfNotExist } = require("@helpers/economy");

module.exports = {
  name: "send",
  aliases: ["send"],
  description: "Send Gifcoin to another member",
  cooldown: "5s",
  cooldownMessage: "Wait {REMAINING} more execute this command again!",
  minArgs: 0,
  maxArgs: 0,
  argsMessage: "Incorrect Arguments!",
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
  callback: ({ message, args, client, handler }) => {
    handler.cooldown(message, "5s");
  },
};
