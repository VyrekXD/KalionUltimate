const Discord = require('discord.js')
const { MessageEmbed } = require('discord.js')
const devModel = require('../../database/models/developers')
const updateModel = require('../../database/models/updates')

module.exports = {
permisos: ['VIEW_CHANNEL','SEND_MESSAGES','EMBED_LINKS'],
aliases: [],
run: async (bot, message, args, send) => {

    let consulta = await devModel.findOne({userID: message.author.id})

    if(!consulta)return message.channel.send(`Solo **Developers** pueden usar este comando!`)
    
    let update = args.join(' ')

    let find = await updateModel.findOne({query: 1})

    if(find){
        let nuevo = updateModel({query: 1, totalUpdates: update})
        nuevo.save()
    }else {
        await updateModel.updateOne({query: 1}, {$push: {totalUpdates: update}})
    }

    const e = new MessageEmbed()
    .setAuthor(bot.user.tag, bot.user.displayAvatarURL())
    .addField(`**Update**`, `\`\`\`cs\n${update}\`\`\``)
    .setColor('RANDOM')

    send(e)

    bot.guild.channels.resolve('750349209433014420').send(e)
    }
}

module.exports.help = {
    name: 'update',
    aliases: [],
}