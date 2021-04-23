const { sendEmbed } = require("../../helpers/embeds");

module.exports = {
  commands: "ban",
  permissionError: "You do not have permission to use this command.",
  expectedArgs: "<Member> (optional reason)",
  minArgs: 1,
  maxArgs: null,
  permissions: "BAN_MEMBERS",
  callback: async (message, arguments, text) => {
    const { mentions, guild } = message;
    const targetUser = mentions.users.first();
    if (!targetUser) {
      sendEmbed(message, "Please specify the user !");
      return;
    }

    const reason = text.split(/[ ]+/);
    reason.shift();

    const targetMember = guild.members.cache.get(targetUser.id);
    targetMember.ban({ reason: reason.join(" ") });
    sendEmbed(message, `<@${targetUser.id}> has been banned from this guild!`);
  },
};
