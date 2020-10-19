const Discord = require('discord.js');
const moneyconfigModel = require('../../../database/models/moneyConfig');

module.exports = {
    permisos: ['VIEW_CHANNEL','SEND_MESSAGES','EMBED_LINKS'],
    guildOnly: true,
    run: async(client, message, args) => {

    if(!args[0])return message.channel.send(`Necesitas ingresar un emoji!`)

    let consulta = await moneyconfigModel.findOne({servidor: message.guild.id})

    let emoji = Discord.Util.parseEmoji(args[0]);
    let aGuardar;

    if(!emoji.name || (!emoji.id && !args[0].match(/([\uD800-\uDBFF][\uDC00-\uDFFF])/g))) return message.channel.send(`Necesitas ingresar un emoji!`)
     
    if(!consulta){

    if(emoji.id){

         aGuardar = client.emojis.resolve(emoji.id).toString()

         let nuevo = await new moneyconfigModel({servidor: message.guild.id, emoji: aGuardar})
         nuevo.save()

         message.channel.send(`El emoji ${aGuardar} ha sido establecido como el signo de dinero`)

    } else {
            aGuardar = args[0]

            let nuevo = await new moneyconfigModel({servidor: message.guild.id, emoji: aGuardar})
            nuevo.save()
    
            message.channel.send(`El emoji ${aGuardar} ha sido establecido como el signo de dinero`)
    }
}
    if(consulta){
        if(emoji.id){

            aGuardar = client.emojis.resolve(emoji.id).toString()
   
            await moneyconfigModel.updateOne({servidor: message.guild.id}, {$set: {emoji: aGuardar}})
   
            message.channel.send(`El emoji ${aGuardar} ha sido actualizado como el signo de dinero`)
   
       } else {
               aGuardar = args[0]
   
               await moneyconfigModel.updateOne({servidor: message.guild.id}, {$set: {emoji: aGuardar}})
       
               message.channel.send(`El emoji ${aGuardar} ha sido actualizado como el signo de dinero`)
       }
    }
}
}
module.exports.help = {
name: 'setcurrency',
description: 'Elige la moneda de tu servidor',
cooldown: [],
alias: [],
usage: 'setcurrency [:emoji:]',
example: 'setcurrency 💵'
}