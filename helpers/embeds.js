const Discord = require("discord.js");
const sendEmbed = (message, content) => {
  const embed = new Discord.MessageEmbed()
    .setColor("#37e7ed")
    .setDescription(content)
    .setTimestamp()
    .setFooter("Sent by Gifcolic");

  message.channel.send(embed).then(embed => embed.delete({ timeout: 5000 }));
};

module.exports = {
  sendEmbed,
};
