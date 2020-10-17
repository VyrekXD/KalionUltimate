const Discord = require('discord.js');
const client = new Discord.Client();
const used = new Map();

module.exports = {
	permisos: ['VIEW_CHANNEL','SEND_MESSAGES'],
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
			let texto = args.join(" ");
			if(!texto){
			  return message.channel.send(`Escribe el mensaje que desees enviar`)
			}
			message.delete();
			message.channel.send(texto, { allowedMentions: { parse: [] }});
			
		  used.set(message.author.id, Date.now() + milisegFromSeconds(1));
		  setTimeout(()=> used.delete(message.author.id), milisegFromSeconds(1));
    }
    

}
}