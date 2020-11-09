const Discord = require('discord.js');
const used = new Map();
module.exports = {
  permisos: ['VIEW_CHANNEL','SEND_MESSAGES','EMBED_LINKS'],
  guildOnly: true,
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

    message.delete()
    if(!c){
        return message.channel.send(`Necesitas poner el comentario!`)
    }
    const embed = new Discord.MessageEmbed()
    .setTitle(`Nuevo reporte de Bug!`)
    .setColor(`RED`)
    .setThumbnail(message.guild.iconURL())
    .setFooter(message.guild.name)
    .setTimestamp()
    .setDescription(`**Reporte:** \n${c}`)

    const embed1 = new Discord.MessageEmbed()
    .setAuthor(message.author.username, message.author.displayAvatarURL())
    .setTitle(`Gracias Por Reportar!`)
    .setDescription(`Se agradece mucho que reporten los **bugs** para poder hacer mejor al bot!`)
    .setFooter(`Para reportar usa k-bugreport`)
    .setTimestamp()
    .setColor(`GREEN`)

    message.channel.send(embed1)
    client.channels.resolve('744695901897097297').send(embed)
    
          used.set(message.author.id, Date.now() + milisegFromSeconds(10));
          setTimeout(()=> used.delete(message.author.id), milisegFromSeconds(10));
        }
        
}
}