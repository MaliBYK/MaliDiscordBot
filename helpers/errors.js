const Discord = require("discord.js");
const { prefix } = require("../config/config.json");

const permissionErrorEmbed = (message, permissionError) => {
  const embed = new Discord.MessageEmbed()
    .setColor("#f5425a")
    .setDescription(permissionError)
    .setTimestamp()
    .setFooter("Sent by Gifcolic");

  message.channel.send(embed).then(embed => embed.delete({ timeout: 4000 }));
  return;
};

const argumentErrorEmbed = (message, alias, expectedArgs) => {
  const embed = new Discord.MessageEmbed()
    .setColor("#f5425a")
    .addField(
      "Invalid command usage, try using it like:",
      "`" + `${prefix}${alias} ${expectedArgs}` + "`",
      (inline = false)
    )
    .setTimestamp()
    .setFooter("Sent by Gifcolic");

  message.channel.send(embed).then(embed => embed.delete({ timeout: 5000 }));
  return;
};

module.exports = {
  permissionErrorEmbed,
  argumentErrorEmbed,
};
