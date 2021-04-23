const { sendEmbed } = require("../../helpers/embeds");

module.exports = {
  commands: "unmute",
  permissionError: "You do not have permission to use this command.",
  expectedArgs: "<Member>",
  minArgs: 1,
  maxArgs: 1,
  permissions: "MUTE_MEMBERS",
  callback: async (message, arguments, text) => {
    const { mentions, guild } = message;
    const targetMember = mentions.members.first();

    if (!targetMember) {
      sendEmbed(message, "Please specify the user !");
      return;
    }

    const mutedRole = guild.roles.cache.find(role => role.name === "MUTED");
    if (!mutedRole) {
      try {
        mutedRole = await guild.roles.create({
          data: {
            name: "MUTED",
            color: "#000000",
            permissions: ["VIEW_CHANNEL"],
          },
        });

        guild.channels.cache.forEach(async channel => {
          await channel.overwritePermissions(mutedRole, {
            data: {
              SEND_MESSAGES: false,
              ADD_REACTIONS: false,
              CONNECT: false,
            },
          });
        });
      } catch (err) {
        console.log(err);
      }
    }
    if (targetMember.roles.cache.has(mutedRole.id)) {
      sendEmbed(message, `<@${targetMember.id}> has been unmuted`);
      targetMember.roles.remove(mutedRole);
    } else {
      sendEmbed(message, "You cannot unmute someone who is not muted.");
    }
  },
};
