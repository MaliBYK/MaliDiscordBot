//--------[PAKCAGES]--------\\

const Discord = require("discord.js");
const Fetch = require('node-fetch');
//const { CDHandler } = require("cdhandler");

//--------[CONSTANTS]--------\\

const client = new Discord.Client();
const { token, prefix } = process.env;
const mongo = require("./helpers/mongo");
const loadcommands = require('./commands/load-commands')

//--------[EVENTS]--------\\

require("dotenv").config();
require("module-alias/register");

client.on("ready", async () => {
  mongo();
  loadcommands(client);
  
  console.log(`[READY] Successfully logged in as ${client.user.tag}`);
});

//--------[7/24]--------\\

setInterval(async() => {
  await Fetch("https://mali-bot-dc.glitch.me").then();
}, 1000);

//--------[LOGIN THE BOT]--------\\

client.login(token);
