const { oneDescriptionEmbed } = require("@helpers/embeds.js");

module.exports = {
  commands: ["ban"],
  description: "Ban a member from the guild!",
  cooldown: 60,
  cooldownMessage: "Wait {REMAINING} more execute this command again!",
  minArgs: 1,
  maxArgs: null,
  callback: ( message, args, text ) => {
    const target = message.mentions.users.first();
    if (!target)
      return message.channel.send(
        oneDescriptionEmbed(
          message,
          "#eb4034",
          "**Please provide a member to ban**",
          "Example",
          `${prefix}ban <Member> (optional reason)`
        )
      );
    args.shift();
    message.channel.send(
      oneDescriptionEmbed(
        message,
        "#1fb533",
        `<@${target.id}> **has been banned!**`,
        "Reason : ",
        args.join(" ")
      )
    );
    handler.cooldown(message, "1s");
  },
};
