const { MessageEmbed } = require("discord.js");
const oneDescriptionEmbed = (
  message,
  color,
  content,
  field_name,
  field_value
) => {
  return new MessageEmbed()
    .setColor(color)
    .setDescription(content)
    .addField(field_name, "`" + field_value + "`", false)
    .setFooter(
      `Requested by ${message.author.username}`,
      message.author.displayAvatarURL()
    );
};

module.exports = {
  oneDescriptionEmbed,
};
