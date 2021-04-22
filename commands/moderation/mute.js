const Discord = require("discord.js");
const ms = require("ms");

module.exports = {
  commands: "mute",
  permissionError: "You do not have permission to use this command.",
  expectedArgs: "<Member>",
  minArgs: 1,
  maxArgs: 1,
  permissions: "MUTE_MEMBERS",
  callback: async (message, arguments, text) => {
    const { mentions, guild } = message;
    const targetUser = mentions.users.first();

    if (!targetUser) {
      sendEmbed(message, "Please specify the user !");
      return;
    }

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
    sendEmbed(message, `<@${targetUser.id}> has been muted!`);
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
