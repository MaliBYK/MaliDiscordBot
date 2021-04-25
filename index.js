require("module-alias/register");
const Discord = require("discord.js");
const client = new Discord.Client();
const { token, prefix } = require("@config/config.json");

const colour = require("cdcolours");
const { CDHandler } = require("cdhandler");

const mongo = require("@helpers/mongo");

client.on("ready", async () => {
  new CDHandler(client, {
    commandsDir: "commands",
    eventsDir: "events",
    featuresDir: "features",
    prefix: prefix,
    category: "Misc",
    pingReply: true,
    devs: ["707513028756897802"],
    defaults: true,
    warnings: true,
  });

  mongo();

  console.log(
    colour("[READY]", { textColour: "green" }) +
      ` Successfully logged in as ${client.user.tag}`
  );
});

client.login(token);
