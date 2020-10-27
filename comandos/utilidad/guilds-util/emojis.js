const Discord = require('discord.js');
const used = new Map();

module.exports = {
  permisos: ['VIEW_CHANNEL','SEND_MESSAGES','EMBED_LINKS','ADD_REACTIONS'],
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
      if(message.guild.emojis.cache.size < 1) return message.channel.send('¡Este servidor no tiene emojis!')

      let emojis = []
      let emojis_a = []
  
      message.guild.emojis.cache.filter(x => !x.animated).map(x => emojis.push(`<:${x.name}:${x.id}>`))
  
      message.guild.emojis.cache.filter(x => x.animated).map(x => emojis_a.push(`<a:${x.name}:${x.id}>`))
  
      let m = await message.channel.send({embed: { 
      title: `Emojis de ${message.guild.name}`, 
      color: 'RANDOM', 
      fields: [{ 
      name: 'Emojis estaticos:',
      value: emojis[0] ? emojis.slice(0, 10).join('\n') : 'Este servidor no tiene emojis estaticos'
    },
    {
      name: 'Emojis animados:',
      value: emojis_a[0] ? emojis_a.slice(0, 10).join('\n') : 'Este servidor no tiene emojis animados'
    }],
    author: {
      name: `Pedido por: ${message.author.tag}`,
      icon_url: message.author.displayAvatarURL()
    }
  }})
      await m.react("⬅️")
      await m.react("➡️")
      await m.react("🗑️")
    
    let i = 0;
    let i2 = 10;
  
    let filtro = (reaction, user) => ['⬅️','➡️','🗑️'].includes(reaction.emoji.name) && user.id === message.author.id;
  
    let colector = m.createReactionCollector(filtro, {time: 60000, max: 10});
    colector.on('collect', reaction => {
      switch(reaction.emoji.name){ 
        case "⬅️":
  
        if(i > 1){
  
        i-=10
        i2-=10
  
        m.edit({embed: {
          title: `Emojis de ${message.guild.name}`, 
          color: 'RANDOM', 
          fields: [{ 
            name: 'Emojis estaticos:',
            value: emojis[0] ? emojis.slice(i, i2).join('\n') : 'Este servidor no tiene emojis estaticos'
          },
          {
            name: 'Emojis animados:',
            value: emojis_a[0] ? emojis_a.slice(i, i2).join('\n') : 'Este servidor no tiene emojis animados'
          }],
          author: {
            name: `Pedido por: ${message.author.tag}`,
            icon_url: message.author.displayAvatarURL()
          }
        }})      
        }
        break;
        case "🗑️":
        colector.stop()
        break;
        case "➡️":
        if(emojis.slice(i, i2+1)[emojis.slice(i, i2+1).length - 1] !== emojis[emojis.length-1]){
        i+=10
        i2+=10
        m.edit({embed: {
          title: `Emojis de ${message.guild.name}`, 
          color: 'RANDOM', 
          fields: [{ 
            name: 'Emojis estaticos:',
            value: emojis[0] ? emojis.slice(i, i2).join('\n') : 'Este servidor no tiene emojis estaticos'
          },
          {
            name: 'Emojis animados:',
            value: emojis_a[0] ? emojis_a.slice(i, i2).join('\n') : 'Este servidor no tiene emojis animados'
          }],
          author: {
            name: `Pedido por: ${message.author.tag}`,
            icon_url: message.author.displayAvatarURL()
          }
        }})      
        }
        break;
      }
    })
    
        used.set(message.author.id, Date.now() + milisegFromSeconds(3));
        setTimeout(()=> used.delete(message.author.id), milisegFromSeconds(3));
      }
}
}