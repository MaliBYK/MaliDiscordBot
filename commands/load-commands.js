const fs = require('fs');
const path = require('path');

module.exports = (bot) => {
  const baseFile = 'command-handler.js'
  const commandBase = require(`./${baseFile}`)

  const readCommands = (dir) => {
    const files = fs.readdirSync(path.join(__dirname, dir))
    for (const file of files) {
      const stat = fs.lstatSync(path.join(__dirname, dir, file))
      if (stat.isDirectory()) {
        readCommands(path.join(dir, file))
      } else if (file !== baseFile && file.endsWith('.js') && file !== "load-commands.js") {
        const option = require(path.join(__dirname, dir, file))
        commandBase(bot, option)
      }
    }
  }

  readCommands('.')
}