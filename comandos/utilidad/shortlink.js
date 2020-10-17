const shorten = require("isgd")
const Discord = require('discord.js');

module.exports = {
  permisos: ['VIEW_CHANNEL','SEND_MESSAGES','EMBED_LINKS'],
  run: async(client, message, args) => {
    
    if(!args[0]) return message.channel.send('Pon una URL para acortarla')
    message.delete()
    if(!args[1]){
        shorten.shorten(args[0], function(res) {

        if (res.startsWith('Error:'))return message.channel.send('Usa una URL válida.');
          
        message.channel.send(`**<${res}>**`);
        })
      }else {
    shorten.custom(args[0], args[1], function(res) {
       if (res.startsWith('Error:')) return message.channel.send(`**${res}**`); 
      
    message.channel.send(`**<${res}>**`)
    })
    }
}
}