const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js')
const marModel = require('../../database/models/marry')

module.exports = {
permisos: ['VIEW_CHANNEL','SEND_MESSAGES','EMBED_LINKS'],
aliases: [],
guildOnly: true,
run: async (bot, message, args, send) => {
 
    let mem = message.mentions.members.first() || message.guild.members.resolve(args[0])

    if(!mem)return send(`Necesitas mencionar a alguien!`)
    if(mem.user.bot)return send(`Ese es un bot? :flushed:`)

    let find1 = await marModel.findOne({userID: mem.id})
    let find2 = await marModel.findOne({user2ID: mem.id})

    if(!find1 || !find2)return send(`Ese usuario no esta casado!`)

    if(find1){
        await marModel.deleteOne({userID: message.author.id})
    }else {
        await marModel.deleteOne({user2ID: message.author.id})
    }
    

    send(`${message.author}, se ha divorciado de <@${find1.user2ID || find2.user2ID}>`)
   }
}

module.exports.help = {
name: 'divorce',
description: 'Divorcite de alguien unu',
cooldown: [],
alias: [],
usage: 'divorce [mencion/id]',
example: 'divorce @Kalion'
}