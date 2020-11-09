const Discord = require('discord.js');
const mineriaModel = require('../../../database/models/mineria')

module.exports = {
    aliases: ['b', 'bp'],
    guildOnly: true,
    permisos: ['VIEW_CHANNEL','SEND_MESSAGES','EMBED_LINKS'],
    run: async(client, message, args) => {

        let usuario = message.mentions.users.first()
        if(!usuario)usuario = message.author;
        let servidor = message.guild;
        let consulta = await mineriaModel.findOne({servidor: servidor.id, usuario: usuario.id})
       
        const embed = new Discord.MessageEmbed()

        .setAuthor(usuario.username, usuario.displayAvatarURL())
        .setTitle(`**Inventario**`)
        .setColor('920e0e')
        .setFooter(`Usa ${await message.guild.getPrefix()}sell para vender tus items`)
        if(consulta.piedra || consulta.carbon){
            embed.addField(`**Minerales Simples:**`, 
            !consulta.piedra ? "<:piedra:741084392696446976> **Piedra:** " + consulta.piedra : "\u200B" + 
            "\n" + consulta.carbon ? "<:carbon:741084392444919980> **Carbon:** " + consulta.carbon : "\u200B", true)
        }
        else if(consulta.diamante || consulta.esmeralda  || consulta.hierro){
            embed.addField(`**Minerales Raros:**`, 
            consulta.diamante ? "<:diamante:741084392667217950> **Diamante:** " + consulta.diamante : "\u200B" + 
            "\n" + consulta.esmeralda ? "<:esmeralda:741084391983415398> **Esmeralda:** " + consulta.esmeralda : "\u200B"+ 
            "\n" + consulta.hierro ? "<:ironingot:741084392927002755> **Hierro:** " + consulta.hierro : "\u200B", true)
        }
        else if(consulta.zafiro || consulta.ruby){
            embed.addField(`**Minerales Epicos:**`, 
            consulta.zafiro ? "<:zafiro:741084392449114183> **Zafiro:** " + consulta.zafiro : "\u200B" + 
            "\n" + consulta.ruby ? "<:ruby:741084392490795029> **Ruby:** " + consulta.ruby : "\u200B", true)
        }
        else if(consulta.kalonsita){
            embed.addField(`**Minerales Legendarios**`, 
            consulta.kalonsita ? "<:kalonsita:741084392310571109> **Kalonsita:** " + consulta.kalonsita : "\u200B", true)
        }else {
            embed.setDescription(`No tienes items!`)
        }

        message.channel.send(embed)
    }
}