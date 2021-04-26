const { controlAmount, updateMoney } = require("@helpers/economy");

module.exports = {
  name: "send",
  commands: ["send", "give"],
  description: "Send Gifcoin to another member",
  cooldown: "5s",
  cooldownMessage: "Wait {REMAINING} more execute this command again!",
  minArgs: 2,
  maxArgs: 2,
  argsMessage: "**Incorrect Arguments!**",
  dev: false,
  devMessage: "You must be a developer to run this command !",
  nsfw: false,
  nsfwMessage: "You cannot run this command in SFW channels",
  permissions: [],
  permissionsMessage: "You do not have permission to use this command!",
  botPermissions: ["SEND_MESSAGES"],
  botPermissionsMessage: `**I cannot run this command without the needed permission(s)!**`,
  category: "Economy",
  locked: false,
  lockedMessage: "This command is locked at the moment!",
  hidden: false,
  hidden2: false,
  servers: [],
  serversMessage: "Use this command in CDHandler support server!",
  callback: async ({ message, args, client, handler }) => {
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

    handler.cooldown(message, "5s");
  },
};
