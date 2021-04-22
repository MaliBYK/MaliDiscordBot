const Discord = require("discord.js");
const ms = require("ms");

module.exports = {
  commands: "tempmute",
  permissionError: "You do not have permission to use this command.",
  expectedArgs: "<Member> <Duration>",
  minArgs: 2,
  maxArgs: 2,
  permissions: "MUTE_MEMBERS",
  callback: async (message, arguments, text) => {
    const { mentions, guild } = message;
    const targetUser = mentions.users.first();
    const duration = ms(arguments[1]);

    const mutedRole = guild.roles.cache.find(role => role.name === "MUTED");
    if (!mutedRole) {
      try {
        mutedRole = await guild.createRole({
          name: "MUTED",
          color: "#000000",
          permissions: [],
        });

        guild.channels.forEach(async channel => {
          await channel.overwritePermissions(mutedRole, {
            SEND_MESSAGES: false,
            ADD_REACTIONS: false,
            CONNECT: false,
          });
        });
      } catch (err) {
        console.log(err);
      }
    }
    const targetMember = guild.members.cache.get(targetUser.id);
    targetMember.roles.add(mutedRole);
    sendEmbed(message, `<@${targetUser.id}> has been muted for ${duration}`);
    setTimeout(() => {
      targetMember.roles.remove(mutedRole);
      sendEmbed(message, `<@${targetUser.id}> has been unmuted!`);
    }, duration);
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
