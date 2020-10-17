const Discord = require('discord.js');
const client = new Discord.Client();
const used = new Map();
const { milisegFromSeconds } = require('../../../util/Functions/convertTime')

module.exports = {
  permisos: ['VIEW_CHANNEL','SEND_MESSAGES','EMBED_LINKS','MANAGE_MESSAGES'],
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
      if (
        !message.guild.me.permissionsIn(message.channel).has("MANAGE_MESSAGES")
      ) {
        return message.channel.send(
          "Necesitas otrorgame los permisos **MANAGE_MESSAGES** para realizar este comando."
        );
      }
  
      if (!message.member.permissionsIn(message.channel).has("MANAGE_MESSAGES")) {
        return message.channel.send(
          "Comando Denegado, " +
            message.author +
            " no tienes suficientes permisos."
        );
      }
  
  
      let cantidadm = parseInt(args[0]);
  
      if (!cantidadm) return message.reply("Introduce un numero por favor");
  
      if (cantidadm > 100) {
        message.channel
          .send("El maximo de mensajes para eliminar es 100")
          .then(m => m.delete({ timeout: 5000 }));
        cantidadm = 100;
        return
      }
  
      message.channel.messages.fetch({ limit: cantidadm }).then(mensajes => {
        var msgs = mensajes.filter(m => !m.pinned && !m.system);
  
        message.channel
          .bulkDelete(msgs)
          .then(() => {
            message.channel
              .send(`:white_check_mark: Borre ${cantidadm} mensajes. `)
              .then(m => m.delete({ timeout: 5000 }));
          })
          .catch(e => {
            switch (e.message) {
              case "You can only bulk delete messages that are under 14 days old.": {
                message.channel.send(
                  "Solo puedo borrar mensajes con menos de 2 semanas de antigüedad"
                );
              }
              
              default: {
                console.log(
                  "Ocurrio un error desconocido en el comando para borrar mensajes \n" +
                    e
                );
                message.channel.send(
                  "Err, no pude borrar los mensajes :exclamation:"
                );
              }
            }
          });
      });
      
        used.set(message.author.id, Date.now() + milisegFromSeconds(3));
        setTimeout(()=> used.delete(message.author.id), milisegFromSeconds(3));
      }

}
}