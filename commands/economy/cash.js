const { createIfNotExist } = require("@helpers/economy");

module.exports = {
  commands: ["money", "cash"],
  description: "Show The Member's Cash",
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
  botPermissions: ["EMBED_LINK", "SEND_MESSAGES"],
  botPermissionsMessage: `I cannot run this command without the needed permission(s)!`,
  category: "Economy",
  locked: false,
  lockedMessage: "This command is locked at the moment!",
  hidden: false,
  hidden2: false,
  servers: [],
  serversMessage: "Use this command in CDHandler support server!",
  callback: ({ message, args, client, handler }) => {
    connectDatabase(message, message.author);
    handler.cooldown(message, "5s");
  },
};

const connectDatabase = async (message, member) => {
  createIfNotExist(member.id, message.guild.id)
    .then(profile => {
      message.channel.send(
        `💰 **|** **${member.username}**, you totally have __**${profile.coins}**__  ***gitcoin!***`
      );
    })
    .catch(err => console.error(err));
};
