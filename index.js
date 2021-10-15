const { Client, Intents } = require('discord.js');
const config = require('./config.json');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
const command = require('./command');
const lm = require('./leading-message');
const dm = require('./dm-listener');

const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}

const getGuild = (id) => {
  let retGuild = null;
  const Guilds = client.guilds.cache;
  Guilds.forEach(guild => {
    console.log(id);
    console.log(guild.id);
    if(id == guild.id){
    retGuild = guild;
  }});
  return retGuild;
}

client.on("ready", () => {
  console.log("client is ready!");

  lm(client, '898116273634967552', '```Welcome to Aryan Thakur\'s BotServer, we hope you will enjoy your stay here. Please follow the necessary guidelines and check the #commands channel to read about the commands the bot understands.```', ['✅', '❎']);

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

  dm(client, '$deprecatedCommands', "```$sticker: adds an emoji to the server from a local file```");

  command(client, "monopoly", (message) => {

      const guildId = message.guildId;
      const Guild = getGuild(guildId);

      let members = [];
      members.push(message.author);
      let mentionedLength = 0;

      message.mentions.users.forEach((member) => {
        mentionedLength++;
      });

      message.mentions.members.forEach(member => {
      if(!member.user.bot && members.indexOf(member.user) < 0){
          members.push(member.user)}
      });

      const randomInt = getRandomInt(0, 100000);
      const gameName = `mono-${randomInt}`;
      /*if(members.length < 1 || members.length > 5){
        return;
      }
      let rgb = [];
      for(let i = 0; i < 3; i++){
        rgb.push(getRandomInt(0,255));
      }
      const roleOptions = {
        name: `mono-${randomInt}`,
        color: rgb;


      }*/
//TODO: fix permissions, get category
      Guild.channels.create(gameName, {permissionOverwrites: [{
       id: message.author.id,
       deny: [Permissions.FLAGS.VIEW_CHANNEL],}).then(console.log("Channel has been created")).catch(console.log("Channel failed to be created."));
      members.forEach(member => {
        member.send("You have been added into a monopoly game. Please join <thread>. In case this is wrong please write the command ```$delMonopoly <thread>``` on any channel. You may add new players to this game before it starts by using the command ```$addMonopoly <mention> <thread>```")
      })
  })

});



client.login(config.token);
