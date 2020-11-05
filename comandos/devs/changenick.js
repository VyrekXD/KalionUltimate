const Discord = require('discord.js');
const devModel = require('../../database/models/developers')

module.exports.run = async(client, message, args) => {

    let consulta = await devModel.findOne({userID: message.author.id})

    if(!consulta)return message.channel.send(`Solo **Developers** pueden usar este comando!`)
    

    let nicka = args.join(' ')
    if(!nicka)return message.channel.send(`Debes ingresar mi nuevo nick de el servidor!`)
    if(nicka.length >= 33)return message.channel.send(`Maximo 32 caracteres!`)
    message.delete()
    message.channel.send(`Mi nuevo nick es: ${nicka}`)
    message.guild.me.setNickname(nicka)

}
module.exports.help = {
    name: 'changenick',
    aliases: [],
}