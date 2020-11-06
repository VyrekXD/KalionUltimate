const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js')
const devModel = require('../../database/models/developers')

module.exports = {
permisos: ['VIEW_CHANNEL','SEND_MESSAGES','EMBED_LINKS'],
aliases: [],
guildOnly: true,
run: async (bot, message, args, send) => {
    
    let consulta = await devModel.findOne({userID: message.author.id})

    if(!consulta)return message.channel.send(`Solo **Developers** pueden usar este comando!`)

    if(args[0]){
        const searchCommand = bot.comandos.find(command => 
            command.help && command.help.name === args[0].toLowerCase()
        )
        let help = searchCommand.help

        const e = new MessageEmbed()
        .setColor('RED')
        .setTitle(help.name)
        .addField(`**Alias**`, help.aliases, true)

        return send(e)
    }else{

    const e = new MessageEmbed()
    .setColor('RED')
    .addField(`**Dev**`, `\`\`\`\naddeveloper(adev) | asynceval(ae) | blacklist(bl) | changenick | checkvote | devhelp | enseñar | eval(e) | removedeveloper(rmdev) | serversin | shell | unblacklist(unbl) | update\`\`\``)
   
    return send(e)
    }
}
}
module.exports.help = {
    name: 'devhelp',
    aliases: [],
}