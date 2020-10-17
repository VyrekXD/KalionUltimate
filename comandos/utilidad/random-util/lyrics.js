const Discord = require('discord.js');
const buscador_letra = require("buscador-letra");
let buscador = new buscador_letra("35jVY6kyf8S_u_xKI8_68t77rpw55Wi8hNqoMmNF3Wpu30HgGGYtRB5ILbDCcWHA")
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
      let nombre = message.content.split(/(?<=^\S+)\s/)[1]
      if (!nombre) return message.reply("Introduce un nombre")
  
      let resultados = await buscador.buscar(nombre)
      if (resultados.length == 0) return message.reply("No se ha encontrado nada")
  
      let letra = await buscador.letra(resultados[0])
  
      const embed = new Discord.MessageEmbed() 
          .setColor("RANDOM") 
          .setTitle(resultados[0].titulo + " de " + resultados[0].artista)
  
          if (letra.length <= 2048)embed.setDescription(letra)
          else { 
              let chunks = letra.match(/[\s\S]{1,1023}/g); 
   
              for (let chunk of chunks) embed.addField("\u200b", chunk, false);
          }
          if (embed.length > 6000)return message.reply("La letra es demasiado larga");
         
           message.reply(embed); 
          
          used.set(message.author.id, Date.now() + milisegFromSeconds(5));
          setTimeout(()=> used.delete(message.author.id), milisegFromSeconds(5));
        }
    
    
}
}