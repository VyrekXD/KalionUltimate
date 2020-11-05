const Discord = require('discord.js');
const devModel = require('../../database/models/developers')
const blackModel = require('../../database/models/blacklist')

module.exports = {
aliases: ['unbl'],
run: async(bot, message, args, send) => {

    let find = await devModel.findOne({userID: message.author.id})

    if(!find)return message.channel.send(`Solo **Developers** pueden usar este comando!`)
    
    let user = message.mentions.users.first() || bot.users.resolve(args[0])

    if(!user)return send(`Tienes que mencionar a alguien`)

    let fibl = await blackModel.findOne({userID: user.id})

    if(!fibl)return send(`Ese usuario no esta en la blacklist`)

    await blackModel.deleteOne({userID: user.id}).catch(err => {
        send(`Ocurrio un error eliminando el documento: `)
        return send(err, {code: 'js'})
    })

    const e = new Discord.MessageEmbed()
    .setColor('GREEN')
    .setTitle('Unblacklist')
    .addField(`**Usuario**`, `${user.tag}\n${user.id}`)
    .addField(`**Developer**`, `${message.author.tag}\n${message.author.id}`)
    
    send(e)
    bot.channels.resolve('773946739144654889').send(e)

}
}