const { controlAmount, updateMoney } = require("@helpers/economy");

module.exports = {
  commands: ["send", "give"],
  minArgs: 2,
  maxArgs: 2,
  expectedArgs: "<Member's @> <Amount>",
  permissions: [],
  callback: async (message, args, text, client) => {
    const { author, mentions } = message;

    const amount = await controlAmount(message, args[1]);
    if (!amount) return;

    const sendTo = mentions.users.first();
    if (!sendTo)
      return message.channel.send(
        ":no_entry_sign: **| Please provide a user !!** "
      );

    updateMoney(sendTo.id, amount);
    updateMoney(author.id, amount * -1);

    message.channel.send(
      `:white_check_mark: **| ${author.username}** sent :money_with_wings: __**${amount}**__ ***gifcoin*** to **${sendTo.username}**`
    );
  },
};
