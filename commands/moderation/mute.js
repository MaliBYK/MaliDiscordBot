const { sendEmbed, sendEmbedField } = require("../../helpers/embeds");

module.exports = {
  commands: "mute",
  permissionError: "You do not have permission to use this command.",
  expectedArgs: "<Member> (optional reason)",
  minArgs: 1,
  maxArgs: null,
  permissions: "MUTE_MEMBERS",
  callback: async (message, arguments, text) => {
    const { mentions, guild } = message;
    const targetMember = mentions.members.first();

    if (!targetMember) {
      sendEmbed(message, "Please specify the user !");
      return;
    }
    arguments.shift();
    let mutedRole = guild.roles.cache.find(role => role.name === "MUTED");
    if (!mutedRole) {
      try {
        mutedRole = await guild.roles.create({
          data: {
            name: "MUTED",
            color: "#000000",
            permissions: ["VIEW_CHANNEL"],
          },
          reason: arguments.join(" "),
        });

        guild.channels.cache.forEach(async channel => {
          await channel.createOverwrite(mutedRole, {
            SEND_MESSAGES: false,
            ADD_REACTIONS: false,
            CONNECT: false,
          });
        });
      } catch (err) {
        console.log(err);
      }
    }

    if (targetMember.roles.cache.some(role => role === mutedRole)) {
      sendEmbed(message, "This user is already muted.");
      return;
    }

    targetMember.roles.add(mutedRole);
    sendEmbedField(
      message,
      `<@${targetMember.id}> has been muted!`,
      "Reason :",
      "`" + arguments.join(" ") + "`"
    );
  },
};
