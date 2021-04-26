const { updateMoney, controlAmount } = require("@helpers/economy");

module.exports = {
  name: "fight",
  aliases: ["fight", "war", "düello", "savas", "savaş"],
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

  callback: async ({ message, args, client, handler }) => {
    const amount = await controlAmount(message, args[0]);
    if (!amount) return;

    coinflip(message, amount);
    handler.cooldown(message, "10s");
  },
};

const coinflip = async (message, amount) => {
  const { author } = message;
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
