const { sendEmbed } = require("../../helpers/embeds");
const ms = require("ms");

module.exports = {
  commands: "tempban",
  permissionError: "You do not have permission to use this command.",
  expectedArgs: "<Member> <Duration> (optional reason)",
  minArgs: 2,
  maxArgs: null,
  permissions: "BAN_MEMBERS",
  callback: async (message, arguments, text) => {
    const { guild, mentions } = message;
    const targetUser = await mentions.users.first();
    if (!targetUser) {
      sendEmbed(message, "Please specify the user !");
      return;
    }
    arguments.shift();

    const duration = arguments[0];
    if (!duration) {
      sendEmbed(message, "Please specify a duration! (1d,23m,31d, etc..)");
      return;
    }
    arguments.shift();

    const targetMember = guild.members.cache.get(targetUser.id);
    targetMember.ban({ reason: arguments.join(" ") });
    sendEmbed(message, `<@${targetUser.id}> is Temp banned  for ${duration}`);

    setTimeout(() => {
      guild.members.unban(targetUser.id);
      sendEmbed(
        message,
        `<@${targetUser.id}> is  unbanned  after ${duration} .`
      );
    }, ms(duration));
  },
};
