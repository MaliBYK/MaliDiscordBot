const prefix = "m";
const ms = require("ms");
const Discord = require("discord.js");
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
    if (!validPermissions.includes(permission)) {
      throw new Error(`Unknown permission node "${permission}"`);
    }
  }
};

let cooldowns = new Map();

module.exports = (client, commandOptions) => {
  let {
    commands,
    expectedArgs = "",
    permissionError = "You do not have permission to run this command.",
    minArgs = 0,
    maxArgs = null,
    cooldown = 0,
    permissions = [],
    requiredRoles = [],
    callback,
  } = commandOptions;

  // Ensure the command and aliases are in an array
  if (typeof commands === "string") {
    commands = [commands];
  }

  // Ensure the permissions are in an array and are all valid
  if (permissions.length) {
    if (typeof permissions === "string") {
      permissions = [permissions];
    }

    validatePermissions(permissions);
  }

  // Listen for messages
  client.on("message", message => {
    const { member, content, guild } = message;

    for (const alias of commands) {
      const command = `${prefix}${alias.toLowerCase()}`;

      if (
        content.toLowerCase().startsWith(`${command} `) ||
        content.toLowerCase() === command
      ) {
        // A command has been ran

        //--------[Cooldown]--------\\
        if (!cooldowns.has(commands[0])) {
          cooldowns.set(commands[0], new Discord.Collection());
        }

        const current_time = Date.now();
        const time_stamps = cooldowns.get(commands[0]);
        const cooldown_amount = cooldown * 1000;

        if (time_stamps.has(message.author.id)) {
          const expiration_time =
            time_stamps.get(message.author.id) + cooldown_amount;

          if (current_time < expiration_time) {
            const time_left = expiration_time - current_time;

            return message.channel.send(
              `You can use this command after __**${ms(
                time_left
              )}**__  using **${prefix}${commands[0]} ${expectedArgs}**`
            );
          }
        }

        time_stamps.set(message.author.id, current_time);
        setTimeout(
          () => time_stamps.delete(message.author.id),
          cooldown_amount
        );
        // Ensure the user has the required permissions
        for (const permission of permissions) {
          if (!member.hasPermission(permission)) {
            message.reply(permissionError);
            return;
          }
        }

        // Ensure the user has the required roles
        for (const requiredRole of requiredRoles) {
          const role = guild.roles.cache.find(
            role => role.name === requiredRole
          );

          if (!role || !member.roles.cache.has(role.id)) {
            message.reply(
              `You must have the "${requiredRole}" role to use this command.`
            );
            return;
          }
        }

        // Split on any number of spaces
        const argument = content.split(/[ ]+/);

        // Remove the command which is the first index
        argument.shift();

        // Ensure we have the correct number of arguments
        if (
          argument.length < minArgs ||
          (maxArgs !== null && argument.length > maxArgs)
        ) {
          message.reply(
            `Incorrect syntax! Use ${prefix}${alias} ${expectedArgs}`
          );
          return;
        }

        // Handle the custom command code
        callback(message, argument, argument.join(" "), client);

        return;
      }
    }
  });
};
