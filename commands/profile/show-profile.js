const { oneDescriptionEmbed } = require("@helpers/embeds.js");
const { prefix } = require("@config/config.json");
const mongo = require("@helpers/mongo");

module.exports = {
  name: "show-profile",
  aliases: ["show"],
  description: "Show The Member's Custom Profile",
  cooldown: "3s",
  cooldownMessage: "Wait {REMAINING} more execute this command again!",
  minArgs: 0,
  maxArgs: 1,
  argsMessage: "Incorrect Arguments! Needed Args : <Member's @>",
  dev: false,
  devMessage: "You must be a developer to run this command !",
  nsfw: false,
  nsfwMessage: "You cannot run this command in SFW channels",
  permissions: [],
  permissionsMessage: "You do not have permission to use this command!",
  botPermissions: ["EMBED_LINK"],
  botPermissionsMessage: `I cannot run this command without the "${this.botPermissions}" permission(s)!`,
  category: "Profile",
  locked: false,
  lockedMessage: "This command is locked at the moment!",
  hidden: false,
  hidden2: false,
  servers: [],
  serversMessage: "Use this command in CDHandler support server!",
  callback: ({ message, args, client, handler }) => {
    const target = message.mentions.users.first();
    if (!target)
      return message.channel.send(
        oneDescriptionEmbed(
          message,
          "#eb4034",
          "**Please provide a member to see the profile**",
          "Example",
          `${prefix}show-profile <Member>`
        )
      );

    connectDatabase(message, target, client);
  },
};

const connectDatabase = (message, target, client) => {
  mongo().then(mongoose => {
    try {
      console.log("come");
      mongoose.findById({ _id: target.id }, response => {
        console.log(response);
      });
    } finally {
    }
  });
};
