const Discord = require('discord.js');
const moneyModel = require('../../../database/models/dinero')

module.exports = {
    aliases: ['with'],
    permisos: ['VIEW_CHANNEL','SEND_MESSAGES','EMBED_LINKS'],
    guildOnly: true,
    run: async(client, message, args) => {

        let usuario = message.author
        let servidor = message.guild;

        let DbServidor = await moneyModel.findOne({servidor: servidor.id, usuario: usuario.id})

        if(!DbServidor){
            let nuevo = new moneyModel({servidor: servidor.id, usuario: usuario.id})
            nuevo.save()
          }
          
        let depositar = args.slice(0).join(" ")

        if(!DbServidor.banco){return message.channel.send("No tienes dinero para retirar")}
        if(!depositar){return message.channel.send("Necesitas ingresar un numero para depositar!")}
        if(depositar === 'all'){
            
            const embed = new Discord.MessageEmbed()
            .setTitle(message.author.username)
            .setDescription(`:white_check_mark: Retirado :dollar:${DbServidor.banco} de tu banco`)
            .setTimestamp()
            .setFooter("Puedes ver tu dinero con k-bal o k-balance")
            .setColor("3b4ad6")
            
            let dinerototal = DbServidor.banco
            await moneyModel.updateOne({servidor: servidor.id, usuario: usuario.id}, {$inc: {dinero: parseInt(dinerototal), banco: parseInt(-dinerototal)}})
            return message.channel.send(embed)
        } else if(isNaN(depositar)){ return message.channel.send("Necesitas ingresar un numero valido!")}

        if(depositar > DbServidor.banco)return message.channel.send("No puedes retirar un numero que no tienes en tu banco")
        if(Number(depositar) <= 0)return message.channel.send("Estas loco o quieres explotar el mundo? No puedes retirar esos numeros")

        const embed1 = new Discord.MessageEmbed()
        .setTitle(message.author.username)
        .setDescription(`:white_check_mark: Retirado :dollar:${depositar} de tu banco`)
        .setTimestamp()
        .setFooter("Puedes ver tu dinero con k-bal o k-balance")
        .setColor("429412")
        
        await moneyModel.updateOne({servidor: servidor.id, usuario: usuario.id}, {$inc: {dinero: parseInt(depositar), banco: parseInt(-depositar)}})
        message.channel.send(embed1)
}
    }

module.exports.help = {
name: 'withdraw',
description: 'Retira dinero',
cooldown: ['1'],
alias: [],
usage: 'withdraw [cantidad]',
example: 'withdraw 1000'
}