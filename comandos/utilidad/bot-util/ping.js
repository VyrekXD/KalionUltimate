const Discord = require('discord.js');

module.exports = {
  permisos: ['VIEW_CHANNEL','SEND_MESSAGES','EMBED_LINKS'],
  guildOnly: true,
  run: async(client, message, args) => {
    
    let ping = Math.floor(message.client.ws.ping)

    message.channel.send(":ping_pong: Cargando.....").then(m => {
      setTimeout(() => {
      
      const algo = new Discord.MessageEmbed()
      .setDescription(`:incoming_envelope: Envío de mensajes: **${m.createdTimestamp - message.createdTimestamp} ms.**\n:satellite_orbital: DiscordAPI: **${ping} ms.**`)
      .setColor("RANDOM")
      m.edit('** **', algo)
      }, 2000)
       })

    
}
}