const { prefix } = require("../config/config.json");
const { permissionErrorEmbed, argumentErrorEmbed } = require("./errors");

const validatePermissions = permissions => {
  const validPermissions = [
    "CREATE_INSTANT_INVITE",
    "KICK_MEMBERS",
    "BAN_MEMBERS",
    "ADMINISTRATOR",
    "MANAGE_CHANNELS",
    "MANAGE_GUILD",
    "ADD_REACTIONS",
    "VIEW_AUDIT_LOG",
    "PRIORITY_SPEAKER",
    "STREAM",
    "VIEW_CHANNEL",
    "SEND_MESSAGES",
    "SEND_TTS_MESSAGES",
    "MANAGE_MESSAGES",
    "EMBED_LINKS",
    "ATTACH_FILES",
    "READ_MESSAGE_HISTORY",
    "MENTION_EVERYONE",
    "USE_EXTERNAL_EMOJIS",
    "VIEW_GUILD_INSIGHTS",
    "CONNECT",
    "SPEAK",
    "MUTE_MEMBERS",
    "DEAFEN_MEMBERS",
    "MOVE_MEMBERS",
    "USE_VAD",
    "CHANGE_NICKNAME",
    "MANAGE_NICKNAMES",
    "MANAGE_ROLES",
    "MANAGE_WEBHOOKS",
    "MANAGE_EMOJIS",
  ];

  for (const permission of permissions) {
    if (!validPermissions.includes(permission))
      throw new Error("Unknown permission!");
  }
  for (const permission of permissions) {
    if (validPermissions.includes(permission)) {
      return true;
    }
  }

  return false;
};

const controlTheRequiredRoles = (message, requiredRoles) => {
  const { guild, member } = message;
  for (const requiredRole of requiredRoles) {
    const role = guild.roles.cache.find(role => role.name === requiredRole);
    if (!role || !member.roles.cache.has(role.id)) {
      permissionErrorEmbed(
        message,
        `You must have "${requiredRole}" role to use this command.`
      );
      return false;
    }
  }
  return true;
};

const controlIfCommand = (message, command) => {
  if (message.author.bot) return true;
  if (
    message.content.toLowerCase().startsWith(`${command} `) ||
    message.content.toLowerCase() === command
  )
    return false;
  return true;
};

module.exports = {
  validatePermissions,
  controlTheRequiredRoles,
  controlIfCommand,
};
