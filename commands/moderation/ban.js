const Discord = require("discord.js");
module.exports = {
  commands: "ban",
  permissionError: "You do not have permission to use this command.",
  expectedArgs: "<Member> (optional reason)",
  minArgs: 2,
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

const sendEmbed = (message, content) => {
  const embed = new Discord.MessageEmbed()
    .setColor("#37e7ed")
    .setDescription(content)
    .setTimestamp()
    .setFooter("Sent by Gifcolic");

  message.channel.send(embed).then(embed => embed.delete({ timeout: 5000 }));
};
