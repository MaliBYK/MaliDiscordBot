const { oneDescriptionEmbed } = require("@helpers/embeds.js");
const { prefix } = process.env;

module.exports = {
  commands: ["ban"],
  description: "Ban a member from the guild!",
  cooldown: "1s",
  cooldownMessage: "Wait {REMAINING} more execute this command again!",
  minArgs: 1,
  maxArgs: null,
  argsMessage:
    "Incorrect Arguments! Needed Args : <Member's @> (optional reason)",
  dev: false,
  devMessage: "You must be a developer to run this command !",
  nsfw: false,
  nsfwMessage: "You cannot run this command in SFW channels",
  permissions: ["BAN_MEMBERS"],
  permissionsMessage: "You do not have permission to use this command!",
  botPermissions: ["BAN_MEMBERS"],
  botPermissionsMessage:
    "I cannot run this command without the 'Ban Members' permission!",
  category: "Moderation",
  locked: false,
  lockedMessage: "This command is locked at the moment!",
  hidden: false,
  hidden2: false,
  callback: ({ message, args, client, handler }) => {
    const target = message.mentions.users.first();
    if (!target)
      return message.channel.send(
        oneDescriptionEmbed(
          message,
          "#eb4034",
          "**Please provide a member to ban**",
          "Example",
          `${prefix}ban <Member> (optional reason)`
        )
      );
    args.shift();
    message.channel.send(
      oneDescriptionEmbed(
        message,
        "#1fb533",
        `<@${target.id}> **has been banned!**`,
        "Reason : ",
        args.join(" ")
      )
    );
    handler.cooldown(message, "1s");
  },
};
