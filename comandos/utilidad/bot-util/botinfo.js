const Discord = require('discord.js');
const ms = require('ms');
const package = require("../../../package.json")
const { getMemoryUsage } = require('../../../util/Functions/memory')
const prefixModel = require('../../../database/models/guildPrefix')

module.exports = {
  permisos: ['VIEW_CHANNEL','SEND_MESSAGES','EMBED_LINKS'],
  run: async(client, message, args) => { 

    let res = await prefixModel.findOne({servidor: message.guild.id}).exec()
    let prefix = res ? res.prefix : 'k!'

    let memoria = getMemoryUsage()
    const embed = new Discord.MessageEmbed()
      .setColor("RANDOM")
      .addField('Acerca De El bot:','```  》 CEO DEV: Vyrek._.XD#5058\n  》 Nombre De El Bot: Kalion Ultimate#5763\n  》 Libreria: discord.js@12.2.0\n  》 Version De El Bot: '+package.version+'\n  》 Uptime: '+ ms(client.uptime)+ '\n  》 Ping: '+ client.ws.ping+'\n  》 Total De Comandos: '+client.comandos.size+'\n+》 Vota el bot!: usa '+prefix+'vote'+'```')
      .addField(`Stats De El Bot:`, '```  ⌘ CPU: '+process.cpuUsage()+'\n ⌘ Memoria: \n  Memoria Maxima: '+`${memoria.max}\n  Memoria Usada: ${memoria.used} \n  Memoria Usada Por El Bot: ${memoria.usedByProcess}\n  Memoria Libre: ${memoria.free}`+' \n  ⌘ Servidores: '+client.guilds.cache.size+'\n  ⌘ Canales: '+client.channels.cache.size+'\n  ⌘ Usuarios: '+client.users.cache.size+'```')
      .setAuthor(`Informacion del bot:`, client.user.avatarURL())
      .addField(`Links Extras:`, `
      [Server De Soporte](https://discord.gg/3RdZ9mD) ✦ 
      [Invita Al Bot](https://discord.com/api/oauth2/authorize?client_id=724749468418703432&permissions=8&scope=bot) ✦ 
      [Vota En DiscordBotsList](https://discordbotlist.com/bots/kalion-ultimate) ✦ 
      [Ve HypeDiscordList](https://hypelist.glitch.me/bots/724749468418703432/)`)

    message.channel.send(embed);

}
}
module.exports.help = {
  name: 'botinfo',
  description: 'Un comando para saber estadisticas de el bot',
  cooldown: 0,
  usage: 'botinfo',
  example: 'botinfo'
}