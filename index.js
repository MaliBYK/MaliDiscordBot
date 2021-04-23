const path = require("path");
const fs = require("fs");
const Discord = require("discord.js");
const client = new Discord.Client();
const { token } = require("./config/config.json");

client.on("ready", () => {
  console.log("The client is ready !");

  registerCommands();
});

const registerCommands = () => {
  const baseFile = "command-base.js";
  const commandBase = require(`./commands/${baseFile}`);

  const readCommands = dir => {
    const files = fs.readdirSync(path.join(__dirname, dir));

    for (const file of files) {
      const stat = fs.lstatSync(path.join(__dirname, dir, file));
      if (stat.isDirectory()) {
        readCommands(path.join(dir, file));
      }
      if (file !== baseFile) {
        const options = require(path.join(__dirname, dir, file));
        commandBase(client, options);
      }
    }
  };
  readCommands("commands");
};

client.login(token);
