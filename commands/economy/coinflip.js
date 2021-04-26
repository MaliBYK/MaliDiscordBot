const { updateMoney, controlAmount } = require("@helpers/economy");

module.exports = {
  commands: ["coinflip", "flip", "cf"],
  minArgs: 1,
  maxArgs: 2,
  cooldown: 5,
  expectedArgs: "<Amount> (optional side)",
  permissions: [],
  callback: async (message, args, text) => {
    const amount = await controlAmount(message, args[0]);
    if (!amount) return;

    let side = "heads";
    if (side === "t" || side === "tails") side = "tails";
    coinflip(message, amount, side);
  },
};

const coinflip = async (message, amount, side) => {
  const { author } = message;
  const spentMessage = await message.channel.send(
    `**${author.username}**, spent 💵  __**${amount}**__ and chose **${side}**\nThe gitcoin spins... :coin:`
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
