module.exports = (client, command, reply) => {
  client.on("messageCreate", (message)=>{
    if(command.toLowerCase() === message.content.toLowerCase()){
      message.author.send(reply);
    }
  })
}
