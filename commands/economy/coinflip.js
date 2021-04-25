const { updateMoney, getMoney, createIfNotExist } = require("@helpers/economy");

module.exports = {
  name: "coinflip",
  aliases: ["coinflip", "flip", "cf"],
  description: "Double your money with Coinflip game",
  cooldown: "10s",
  cooldownMessage: "**Wait {REMAINING} to use this command again!**",
  minArgs: 1,
  maxArgs: 1,
  argsMessage:
    ":no_entry_sign: **|** Incorrect Arguments! **Needed Args : <Amount> (optional side <t or h>) **",
  dev: false,
  devMessage: "You must be a developer to run this command !",
  nsfw: false,
  nsfwMessage: "You cannot run this command in SFW channels",
  permissions: [],
  permissionsMessage: "You do not have permission to use this command!",
  botPermissions: ["EMBED_LINK", "SEND_MESSAGES"],
  botPermissionsMessage: `I cannot run this command without the needed permission(s)!`,
  category: "Profile",
  locked: false,
  lockedMessage: "This command is locked at the moment!",
  hidden: false,
  hidden2: false,
  servers: [],
  serversMessage: "Use this command in CDHandler support server!",
  callback: ({ message, args, client, handler }) => {
    let amount = Number(args[0]);
    const userID = message.author.id;
    const guildID = message.guild.id;

    if (amount % 1 !== 0 || amount <= 0)
      return message.channel.send(
        ":no_entry_sign: **|** Incorrect Arguments! **Needed Args : <Positive Amount> (optional side of coin`) **"
      );

    createIfNotExist(userID, guildID).then(response => {
      if (amount > response.coins)
        return message.channel.send(
          ":no_entry_sign: **| You do not have enough gitcoin to do this !** "
        );
      else {
        message.channel.send(
          `**${message.author.username}**, spent 💵  __**${amount}**__ and chose **heads**`
        );
        setTimeout(() => {
          if (Math.random() * 101 >= 50) {
            message.channel.send(
              `**${message.author.username}** won and earned 💵  __**${
                amount * 2
              }**__ **gitcoin!**`
            );
          } else {
            message.channel.send(
              `**${message.author.username}**,You lost it all...`
            );
            amount = amount * -1;
          }
          updateMoney(userID, guildID, amount);
        }, 2000);
      }
    });
    handler.cooldown(message, "10s");
  },
};
