const unirest = require("unirest");
module.exports = {
  commands: "random-meme",
  callback: (message, arguments, text) => {
    const req = unirest("GET", "https://meme-api.herokuapp.com/gimme");
    req.headers({
      "x-rapidapi-key": "cedae45219msh740a90fdb1536dbp1ed446jsn183bac9877a9",
      "x-rapidapi-host": "tiktok28.p.rapidapi.com",
      useQueryString: true,
    });

    req.end(function (res) {
      if (res.error) throw new Error(res.error);
      const meme = res.body.preview[res.body.preview.length - 2];
      message.channel.send(meme);
    });
  },
};
