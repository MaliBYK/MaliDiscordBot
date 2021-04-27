const { controlAmount, updateMoney } = require("@helpers/economy");

module.exports = {
  commands: ["slots", "s", "çark"],
  minArgs: 1,
  cooldown: 1,
  expectedArgs: "**<Amount>**",
  permissions: [],
  callback: async (message, args, text, client) => {
    //   const { author } = message;
    //   const amount = await controlAmount(message, args[0]);
    //   if (!amount) return;
    //   const slots = new Map([
    //     [0, "🙃"],
    //     [1, "😁"],
    //     [2, "🤣"],
    //   ]);
    //   let slotsText = "";
    //   for (let i = 0; i < 3; i++) {
    //     randSlot = Math.floor(Math.random() * 3);
    //     slotsText += ` ${slots.get(randSlot)}`;
    //     console.log(slots.get(i));
    //     console.log(slots.get(randSlot));
    //   }
    //   message.channel.send(slotsText);
  },
};
