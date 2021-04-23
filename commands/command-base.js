const { prefix } = require("../config/config.json");
const {
  validatePermissions,
  controlTheRequiredRoles,
  controlIfCommand,
} = require("../helpers/controls");

const {
  permissionErrorEmbed,
  argumentErrorEmbed,
} = require("../helpers/errors");

//!Export Function
module.exports = (client, commandOptions) => {
  let {
    commands,
    permissionError = "You do not have permission to use this command.",
    expectedArgs = "",
    minArgs = 0,
    maxArgs = null,
    permissions = [],
    requiredRoles = [],
    callback,
  } = commandOptions;

  //!Ensure Args In array
  if (typeof commands === "string") commands = [commands];
  if (permissions.length && typeof permissions === "string")
    permissions = [permissions];
  if (requiredRoles.length && typeof requiredRoles === "string")
    requiredrequiredRoles = [requiredRoles];

  client.on("message", message => {
    const { content } = message;

    for (const alias of commands) {
      const command = `${prefix}${alias}`;

      if (controlIfCommand(message, command)) return;

      if (permissions.length) {
        if (!validatePermissions(permissions)) {
          permissionErrorEmbed(alias, permissionError);
          return;
        }
      }

      if (requiredRoles.length) {
        if (!controlTheRequiredRoles(message, requiredRoles)) return;
      }

      const arguments = content.split(/[ ]+/);
      arguments.shift();
      if (
        arguments.length < minArgs ||
        (maxArgs !== null && arguments.length > maxArgs)
      ) {
        argumentErrorEmbed(message, alias, expectedArgs);
        return;
      }

      callback(message, arguments, arguments.join(" "));
      return;
    }
  });
};
