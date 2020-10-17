const Discord = require('discord.js');
const client = new Discord.Client();
const used = new Map();
module.exports = {
  permisos: ['VIEW_CHANNEL','SEND_MESSAGES','EMBED_LINKS'],
  run: async(client, message, args) => {

  const Duration = require("humanize-duration");
	if (used.has(message.author.id)) { 
    const cooldown = used.get(message.author.id);          
		 const remaining = Duration(cooldown - Date.now(), { units: ['h','m','s'], language: 'es', conjunction: ' y ', serialComma: false, round: true});
		 return message.channel.send(`Necesitas esperar ${remaining} para volver a usar este comando`).then(async(msg) => {
			  setTimeout(() => {
			  msg.delete();
			}, 5000)
			});  
		 }
		else{
      let c = args.slice(0).join(" ")
    
      if(!c){
          return message.channel.send(`Necesitas poner el bug!`)
      }
      message.delete()
  
      const e = new Discord.MessageEmbed()
      .setTitle(`Nuevo sugerencia!`)
      .setColor(`GREEN`)
      .setThumbnail(message.guild.iconURL())
      .setFooter(message.guild.name)
      .setTimestamp()
      .setDescription(`**Reporte:** \n${c}`)
  
      message.channel.send()

          used.set(message.author.id, Date.now() + milisegFromSeconds(10));
          setTimeout(()=> used.delete(message.author.id), milisegFromSeconds(10));
        }

}
}
module.exports.help = {
    name: 'botsuggest',
    description: 'Un comando para sugerir cosas al bot',
    cooldown: 10,
    usage: 'botsuggest [sugerencia]',
    example: 'botsuggest Mas comandos >:('
  }