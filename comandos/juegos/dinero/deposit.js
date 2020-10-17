const Discord = require('discord.js');
const moneyModel = require('../../../database/models/dinero');
const prefixModel = require('../../../database/models/guildPrefix')

module.exports = {
    aliases: ['dep'],
    permisos: ['VIEW_CHANNEL','SEND_MESSAGES','EMBED_LINKS'],
    run: async(client, message, args) => {

        let servidor = message.guild;
        let res = await prefixModel.findOne({servidor: servidor.id})
        let prefix = res ? res.prefix : 'k!'

        let usuario = message.author
        
        let DbServidor = await moneyModel.findOne({servidor: servidor.id, usuario: usuario.id})

        let depositar = args.slice(0).join(" ")
        if(!DbServidor)return message.channel.send("No tienes dinero para depositar")
        if(!DbServidor.dinero)return message.channel.send("No tienes dinero para depositar")
        if(!depositar)return message.channel.send("Necesitas ingresar un numero para depositar!")
        
        if(depositar === 'all'){
            
            const embed = new Discord.MessageEmbed()
            .setTitle(message.author.username)
            .setDescription(`:white_check_mark: Depositado :dollar:${DbServidor.dinero} a tu banco`)
            .setTimestamp()
            .setFooter(`Puedes ver tu dinero con ${prefix}bal o ${prefix}balance`)
            .setColor("3b4ad6")
            
            let dinerototal = DbServidor.dinero
            await moneyModel.updateOne({servidor: servidor.id, usuario: usuario.id}, {$inc: {banco: parseInt(dinerototal), dinero: parseInt(-dinerototal)}})
            return message.channel.send(embed)

        } else if(isNaN(depositar)){ return message.channel.send("Necesitas ingresar un numero valido!")}
        
        if(depositar > DbServidor.dinero){return message.channel.send("No puedes depositar un numero mayor a el que posees")}
        if(Number(depositar) <= 0){return message.channel.send("Estas loco o quieres explotar el mundo? No puedes depositar esos numeros")}
        const embed1 = new Discord.MessageEmbed()
        .setTitle(message.author.username)
        .setDescription(`:white_check_mark: Depositado :dollar:${depositar} a tu banco`)
        .setTimestamp()
        .setFooter(`Puedes ver tu dinero con ${prefix}bal o ${prefix}balance`)
        .setColor("3b4ad6")
        
        await moneyModel.updateOne({servidor: servidor.id, usuario: usuario.id}, {$inc: {banco: parseInt(depositar), dinero: parseInt(-depositar)}})
        message.channel.send(embed1)
}
    }

module.exports.help = {
name: 'deposit',
description: 'Deposita tu money',
cooldown: [],
alias: ['dep'],
usage: 'dep [all/numero]',
example: 'dep 1010'
}