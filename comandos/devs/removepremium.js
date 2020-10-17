const Discord = require('discord.js');
const devModel = require('../../database/models/developer')
const premiumModel = require('../../database/models/premium')

module.exports = {
    aliases: ['rpremium'],
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

        if(!consulta1)return message.channel.send(`El usuario no cuenta con premium`)
                
        
        const embed = new Discord.MessageEmbed()
        .setTitle(`<:premium:733078132034109482> Premium Removido Correctamente`)
        .setDescription(`<:premium:733078132034109482> El premium se removio correctamente a:\nUsuario: ${usuario}\nID: ${usuario.id}`)
        .addField(`**Patreons**`, `[Mi patreon](https://www.patreon.com/vyrekxd)`)
        .setColor(`RED`)
        message.channel.send(embed)
    
        let nuevo = await new premiumModel({usuario: usuario.id})
        nuevo.save()
    }
}