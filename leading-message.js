const addReactions = (message, reactions) => {
  for(let i = 0; i < reactions.length; i++){
    message.react(reactions[i]);
  }
}

module.exports = async (client, id, text, reactions = []) => {
  const channel = await client.channels.fetch(id);

  channel.messages.fetch().then((messages) => {
    if(messages.size === 0){
      channel.send(text).then(message => {
        addReactions(message, reactions);
      })
    }
    else{
      for(const message of messages){
        message[1].edit(text);
        addReactions(message[1], reactions);
      }
    }
  })

}