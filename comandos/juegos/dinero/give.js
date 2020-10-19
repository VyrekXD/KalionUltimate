const Discord = require('discord.js');
const moneyModel = require('../../../database/models/dinero');
const prefixModel = require('../../../database/models/guildPrefix')


module.exports = {
    permisos: ['VIEW_CHANNEL','SEND_MESSAGES','EMBED_LINKS'],
    guildOnly: true,
    run: async(client, message, args) => {
    let res = await prefixModel.findOne({servidor: message.guild.id}).exec()
    let prefix = res ? res.prefix : 'k!'

    let user = message.author
    let user1 = message.mentions.users.first();
    let andin = args.slice(1).join(" ")

    if(!user1)return message.channel.send(`Menciona a alguien`)
    if(user1.bot)return message.channel.send(`No puedes darle dinero a los bots ellos no desean tu dinero ;(`)
    if(user1 === user)return message.channel.send(`No te puedes darte dinero a ti mismo`)
    if(!andin)return message.channel.send(`Y la cantidad?`)
    if(parseInt(andin) < 0)return message.channel.send(`No puedes dar esos numeros`)
    if(!isNaN(andin))return message.channel.send(`Necesitas ingresar un numero valido`)

    let servidor = message.guild;

    let DbServidor = await moneyModel.findOne({servidor: servidor.id, usuario: user.id})
    let DbServidor1 = await moneyModel.findOne({servidor: servidor.id, usuario: user1.id})

    if(!DbServidor){
        let nuevo = await new moneyModel({servidor: servidor.id, usuario: user.id})
        nuevo.save()
    }
    if(!DbServidor1){
        let nuevo = await new moneyModel({servidor: servidor.id, usuario: user1.id})
        nuevo.save()
    }
    if(DbServidor.dinero === 0)return message.channel.send(`No tienes dinero encima para dar`)

        const emved = new Discord.MessageEmbed()
        .setAuthor(message.author.tag, message.author.displayAvatarURL())
        .setColor('GREEN')
        .setThumbnail('https://cdn.discordapp.com/attachments/721128332959285258/730563263070470295/dinero_1.png')
        .setDescription(`${user.username}, :white_check_mark: Le has dado :dollar: **${andin}** de dinero exitosamente a ${user1.username} `)
        .setFooter(`Puedes ver tu dinero total con ${prefix}bal `)
        message.channel.send(emved)

        db.collection("dinero").updateOne({servidor: servidor.id, usuario: user.id}, {$inc: {dinero: -parseInt(andin), dinerotot: -parseInt(andin)}})
        db.collection("dinero").updateOne({servidor: servidor.id, usuario: user1.id}, {$inc: {dinero: parseInt(andin), dinerotot: parseInt(andin)}})
}
}
module.exports.help = {
name: 'give',
description: 'Dale dinero a un usuario!',
cooldown: [],
alias: [],
usage: 'give [usuario] [Cantidad]',
example: 'give @NoobLance 1'
}