const { Client, Intents } = require('discord.js');
const config = require('./config.json');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
const command = require('./command');


client.on("ready", () => {
  console.log("client is ready!");

  command(client, "hi", (message) => {
    message.channel.send('hello!');
  })

  command(client, "clear", (message)=>{
    //if(message.member.hasPermission('ADMINISTRATOR'))
    message.channel.messages.fetch().then(res => {
      message.channel.bulkDelete(res);
    })
  })

  command(client, "status", (message)=>{
    let content = message.content.replace("$status ", "");
    let type = 0;
    if(content.indexOf("-t ") >= 0){
      if(content.length >= content.indexOf("-t ")+4){
        const typeStr = content.substring(content.indexOf("-t ")+3, content.indexOf("-t ")+4);
        typeStr.trim();
        let givenType =  parseInt(typeStr);
        if(givenType && givenType < 6 && givenType >= 0 && !(givenType === 4)){
          type = givenType;
          }
       }
    }
    if(!(content.indexOf('"') < 0 || content.lastIndexOf('"') < 0 || content.indexOf('"') === content.lastIndexOf('"'))){
      content = content.substring(content.indexOf('"')+1, content.lastIndexOf('"'));
      console.log("content: "+content+"\ntype: "+type);
      client.user.setPresence({ activities: [{ name: content, type: type}], status: "idle"});
    }
  })

  command(client, "sticker", (message) => {
    const ICON_PATH = '../Self/Images/instagram_icon.png';
    const ICON_NAME = 'instagram';
    const Guilds = client.guilds.cache;
    Guilds.forEach(guild => {
      guild.emojis.create(ICON_PATH, ICON_NAME)
      .then(emoji => console.log(`Created new emoji with name ${emoji.name}!`))
      .catch(console.error);
    })
  })

});



client.login(config.token);
