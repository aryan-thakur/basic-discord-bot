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

});



client.login(config.token);
