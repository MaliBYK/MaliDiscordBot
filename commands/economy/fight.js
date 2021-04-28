const { controlAmount, updateMoney } = require("@helpers/economy");
const { addReactionToMessage } = require("@helpers/reactions");
const { oneDescriptionEmbed } = require("@helpers/embeds");
module.exports = {
  commands: ["fight", "duello"],
  minArgs: 2,
  maxArgs: null,
  cooldown: 5,
  expectedArgs: "<Member's @>  <Amount> (fight message)",
  permissions: [],
  callback: async (message, args, text, client) => {
    const { author, mentions } = message;
    const fightMessage = text.split(/[ ]+/).slice(2);
    //----[CONTROL THE AMOUNT]----\\
    const amount = await controlAmount(message, args[1]);
    if (!amount) return;

    //----[CONTROL THE USER]----\\
    const fightWith = mentions.users.first();
    if (!fightWith)
      return message.channel.send(
        ":no_entry_sign: **| Please provide a weak user because weaks sucks :angry: !!** "
      );

    //----[EMBED MESSAGE]----\\
    const messageEmbed = oneDescriptionEmbed(
      message,
      "#fcba03",
      `**${author.username}** wants to fight with **${fightWith.username}** for ${amount}`,
      `${fightWith.username} has 15 seconds to accept the fight.`,
      `Message : ${fightMessage}`
    );
    const embedMessage = await message.channel.send(messageEmbed);
    await addReactionToMessage(embedMessage, ["✅", "❎"]);

    //----[CONTROL THE REACTIONS]
    const filter = (reaction, user) =>
      reaction.emoji.name === "✅" && user.id === fightWith.id;
    const reaction = await embedMessage.awaitReactions(filter, { time: 15000 });
    if (reaction.size) message.channel.send("Accepted");
    else message.channel.send("He refused to fight with you . Pussy!");
  },
};
