const Discord = require('discord.js');
const devModel = require('../../database/models/developer')
const premiumModel = require('../../database/models/premium')

module.exports = {
    aliases: ['gpremium'],
    run: async(client, message, args) => {

    let consulta = devModel.findOne({developer: message.author.id})

    if(!consulta){
        return message.channel.send(`Solo **Developers** pueden usar este comando!`)
    }

    let usuario = message.mentions.users.first();

    if(!usuario){
        return message.channel.send(`Necesitas mencionar a alguien`)
    }

    let consulta1 = await premiumModel.findOne({usuario: usuario.id})

    if(consulta1)return message.channel.send(`El usuario ya cuenta con premium`)

    const e = new Discord.MessageEmbed()
    .setTitle(`<:premium:733078132034109482> Premium Otorgado Correctamente`)
    .setDescription(`<:premium:733078132034109482> El premium se otorgo correctamente a:\nUsuario: ${usuario}\nID: ${usuario.id}`)
    .addField(`**Patreons**`, `[Ayudame tambien tu!](https://www.patreon.com/vyrekxd)`)
    .setColor(`GREEN`)
    message.channel.send(e)
    
    let nuevo = await new premiumModel({usuario: usuario.id})
    nuevo.save()

    }
}