const { prefix } = require('./config.json');

module.exports = (client, aliases, callback) => {
  if(typeof aliases === 'string'){
    aliases = [aliases];
  }
  client.on('messageCreate', (message) => {
    const { content } = message;

    aliases.forEach(a => {
      const command = `${prefix}${a}`;
      if(content.startsWith(`${command} `) || content === `${command}`){
        console.log('Command '+content+" detected!");
        callback(message);
      }
      })
  })
};
