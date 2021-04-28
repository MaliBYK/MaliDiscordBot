const addReactionToMessage = (message, args) => {
  if (typeof args === "string") args = [args];

  args.forEach(reaction => {
    message.react(reaction);
  });
};

module.exports = {
  addReactionToMessage,
};
