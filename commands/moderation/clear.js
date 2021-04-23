const { sendEmbed } = require("../../helpers/embeds");

module.exports = {
  commands: ["clear", "sil"],
  permissionError:
    "You need to have 'manage messages' permission to use this command..",
  expectedArgs: "(number of messages to clear)",
  minArgs: 0,
  maxArgs: 1,
  permissions: "MANAGE_MESSAGES",
  callback: (message, arguments, text) => {
    if (arguments.length) {
      let number = +arguments[0];
      if (number > 100) number = 100;
      message.channel.bulkDelete(number).then(() => {
        sendEmbed(message, `Deleted ${number} messages...`);
      });
      return;
    }
    message.channel.messages.fetch().then(result => {
      message.channel.bulkDelete(result).then(() => {
        sendEmbed(message, `Deleted all messages in this channel`);
      });
    });
  },
};
