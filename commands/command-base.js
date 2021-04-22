const Discord = require("discord.js");
const { prefix } = require("../config/config.json");
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

  console.log(commands, permissions, requiredRoles);
  console.log("Registering command " + commands);
  client.on("message", message => {
    const { content, guild, member } = message;

    for (const alias of commands) {
      if (controlTheMessage(message, alias)) return;

      if (permissions.length) {
        if (!validatePermissions(permissions)) {
          permissionErrorEmbed(alias, expectedArgs);
          return;
        }
      }

      if (!controlTheRequiredRoles(message, requiredRoles)) return;

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

//!Functions
const argumentErrorEmbed = (message, alias, expectedArgs) => {
  const embed = new Discord.MessageEmbed()
    .setColor("#f5425a")
    .addField(
      "Invalid command usage, try using it like:",
      "`" + `${prefix}${alias} ${expectedArgs}` + "`",
      (inline = false)
    )
    .setTimestamp()
    .setFooter("Sent by Gifcolic");

  message.channel.send(embed).then(embed => embed.delete({ timeout: 5000 }));
  return;
};

const controlTheMessage = (message, alias) => {
  return (
    message.author.bot ||
    !message.content.toLowerCase().startsWith(`${prefix}${alias.toLowerCase()}`)
  );
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

const permissionErrorEmbed = (message, permissionError) => {
  const embed = new Discord.MessageEmbed()
    .setColor("#f5425a")
    .setDescription(permissionError)
    .setTimestamp()
    .setFooter("Sent by Gifcolic");

  message.channel.send(embed).then(embed => embed.delete({ timeout: 4000 }));
  return;
};
