const Discord = require('discord.js');
const moneyModel = require('../../../database/models/dinero')
const mineriaModel = require('../../../database/models/mineria')

module.exports = {
    aliases: ['s'],
    permisos: ['VIEW_CHANNEL','SEND_MESSAGES','EMBED_LINKS'],
    guildOnly: true,
    run: async(client, message, args) => {

        let usuario = message.author
        let servidor = message.guild;

        let DbServidor = await mineriaModel.findOne({servidor: servidor.id, usuario: usuario.id})
        let DbServidor1 = await moneyModel.findOne({servidor: servidor.id, usuario: usuario.id})

        if(!DbServidor){
            let nuevo = new mineriaModel({servidor: servidor.id, usuario: usuario.id})
            nuevo.save()
            
        }
        else if(!DbServidor1){
            let nuevo = new moneyModel({servidor: servidor.id, usuario: usuario.id})
            nuevo.save()
            
          }
        DbServidor = await mineriaModel.findOne({servidor: servidor.id, usuario: usuario.id})
        DbServidor1 = await moneyModel.findOne({servidor: servidor.id, usuario: usuario.id})

        let p1 = DbServidor.piedra
        let p2 = DbServidor.carbon * 2
        let p3 = DbServidor.hierro * 5
        let p4 = DbServidor.diamante * 10
        let p5 = DbServidor.esmeralda * 15
        let p6 = DbServidor.zafiro * 22
        let p7 = DbServidor.ruby * 30
        let p8 = DbServidor.kalonsita * 100

        let ptot = p1 + p2 + p3 + p4 + p5 + p6 + p7 + p8

        if(ptot === 0)return message.channel.send(`No tienes minerales para vender! Usa \`${await message.guild.getPrefix()}mine\` para minar`)
        

        const embed = new Discord.MessageEmbed()
        .setAuthor(message.author.username, message.author.displayAvatarURL())
        .setTitle(`Comando Sell`)
        .setColor('14a0c2')
        .setDescription(`Vendiste todos tus items, te dieron: ${parseInt(ptot)}`)
        .setTimestamp()

        await mineriaModel.updateOne({servidor: servidor.id, usuario: usuario.id}, {$inc: {piedra: -DbServidor.piedra,
             carbon: -DbServidor.carbon,
             hierro: -DbServidor.hierro,
             diamante: -DbServidor.diamante,
             esmeralda: -DbServidor.esmeralda,
             zafiro: -DbServidor.zafiro,
             ruby: -DbServidor.ruby,
             kalonsita: -DbServidor.kalonsita
            }})


        await moneyModel.updateOne({servidor: servidor.id, usuario: usuario.id}, {$inc: {dinero: parseInt(ptot), dinerotot: parseInt(ptot)}})

        message.channel.send(embed)
    }
}