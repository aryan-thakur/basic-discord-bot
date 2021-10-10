const { Client, Intents } = require('discord.js');
const config = require('./config.json');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
const command = require('./command');


client.on("ready", () => {
  console.log("client is ready!");

  command(client, "hi", (message) => {
    message.channel.send('hello!');
  })
});



client.login(config.token);
