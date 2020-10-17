const Discord = require('discord.js')
const warnModel = require('../../database/models/warns')
const { checkPerms } = require('../../util/Functions/checkPermissions')

module.exports = {
    permisos: ['VIEW_CHANNEL','SEND_MESSAGES','EMBED_LINKS'],
    run: async(client, message, args) => {

    let servidorr = message.guild
    if(!checkPerms(message.member, 'KICK_MEMBERS'))return message.channel.send(`Permisos insuficientes`) 

    let memberx = message.mentions.members.first() ||
      message.guild.members.cache.get(args[0])

    let consulta = await warnModel.find({servidor: servidorr.id, targetid: memberx.user.id})

    const e = new Discord.MessageEmbed()
    .setColor(`BLUE`)
    .setDescription(`:x: No hay warns para el usuario`)
    if(consulta.length === 0)return message.channel.send(e)
 
    let paginas = [];
    let paginaActual = 0;
    for (let i = 0, k = 5; i < consulta.length; i += 5, k += 5) {
      let pag = consulta.slice(i, k);
      const embed = new Discord.MessageEmbed()
          .setColor("RED")
          pag.map(elem => embed.addField(`ID: ${elem._id} | Mod: ${elem.mod.username}#${elem.mod.discriminator} (${elem.mod.id})`, `${elem.raz} - ${elem.tiempo}`)).join("\n");
          embed.setAuthor( `Warns de: ${memberx.user.tag} (${memberx.user.id})`, memberx.user.displayAvatarURL({ dynamic: true }));
    
      paginas.push(embed);
}

    
    let info = await message.channel.send(paginas[0])

    await info.react("⬅️")
    await info.react("➡️")
    await info.react("🗑️")

    const filter = (reaction, user) => {return ['⬅️','➡️','🗑️'].includes(reaction.emoji.name) && user.id === message.author.id}
    const collector = info.createReactionCollector(filter, { time: 60000})

    collector.on('collect', async reaction =>{
        if(reaction.emoji.name === '➡️'){
            info.reactions.cache.find(r => r.emoji.name == '➡️').users.remove(message.author.id).catch(() => {})
            if(paginaActual < paginas.length - 1){
                info.edit(paginas[++paginaActual])
            }
        }
        else if(reaction.emoji.name === '⬅️'){
            info.reactions.cache.find(r => r.emoji.name == '⬅️').users.remove(message.author.id).catch(() => {})
            if(paginaActual !== 0){
                info.edit(paginas[--paginaActual])
            }
        }else {
                collector.stop()
            }
        
    }
)
collector.on('end', () => {return info.delete(), message.delete(); });
}
}