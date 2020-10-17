const Discord = require('discord.js');
const client = new Discord.Client();

module.exports = {
  permisos: ['VIEW_CHANNEL','SEND_MESSAGES','EMBED_LINKS','MANAGE_WEBHOOKS'],
  run: async(client, message, args) => {

    if(!args.slice(1).join(' '))return message.channel.send(`Ingresa un texto`)

    let usuario = message.mentions.users.first() || message.author;

    let nombre = usuario.username
    message.delete()
    message.channel.fetchWebhooks().then(async webhooks => {
       
     let encontrar = await webhooks.find(webhooks => webhooks.name === nombre)
   
     if(encontrar){
      encontrar.send(args.slice(1).join(' '));
   
     }else{
     let creado = await message.channel.createWebhook(nombre,{ avatar: usuario.displayAvatarURL() })
       creado.send(args.slice(1).join(' '))
     }
   })
}
}