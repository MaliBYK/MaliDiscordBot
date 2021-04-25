const { updateMoney, createIfNotExist } = require("@helpers/economy");

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
    if (args[0].toLowerCase() === "all") amount = 20000;
    if (amount % 1 !== 0 || amount <= 0)
      return message.channel.send(
        ":no_entry_sign: **|** Incorrect Arguments! **Needed Args : <Positive Amount> (optional side of coin`) **"
      );
    if (amount > 20000) amount = 20000;

    coinflip(message, amount);
    handler.cooldown(message, "10s");
  },
};

const coinflip = async (message, amount) => {
  const { author } = message;
  const memberDB = await createIfNotExist(author.id);
  if (amount > memberDB.coins)
    return message.channel.send(
      ":no_entry_sign: **| You do not have enough gitcoin to do this !** "
    );

  const spentMessage = await message.channel.send(
    `**${author.username}**, spent 💵  __**${amount}**__ and chose **heads**\nThe bitcoin spins... :coin:`
  );

  let finalText;
  if (Math.random() >= 0.5) {
    finalText = `and You won and earned 💵  __**${amount * 2}**__ **gitcoin!**`;
  } else {
    amount *= -1;
    finalText = "and You lost it all... :C";
  }

  setTimeout(() => {
    updateMoney(author.id, amount);
    spentMessage.edit(`${spentMessage.content} ${finalText}`);
  }, 2000);
};
