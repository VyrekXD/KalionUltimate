const Discord = require('discord.js');
const nsfwModel = require('../../database/models/nsfwConfig')
const devModel = require('../../database/models/developer')
const { checkPerms } = require('../../util/Functions/checkPermissions')

module.exports = {
permisos: ['VIEW_CHANNEL','SEND_MESSAGES','EMBED_LINKS'],
aliases: [],
nsfw: true,
run: async (bot, message, args, send) => {

    let check = checkPerms(message.member, 'ADMINISTRATOR')
    let findDev = await devModel.findOne({developer: message.author.id})
    findDev ? check = true : ''

    if(!check)return send('No tienes el permiso de ADMINISTRADOR')

    let conv = {
        true:'Activado',
        false:'Desactivado'
    }

    let find = await nsfwModel.findOne({guildID: message.guild.id})

    if(!find){
        let nuevo = new nsfwModel({guildID: message.guild.id})
        await nuevo.save()
        find = await nsfwModel.findOne({guildID: message.guild.id})
    }

    const e = new Discord.MessageEmbed()
    .setColor('RANDOM')
    .setDescription('Ve la configuracion nsfw de este servidor')
    .addField('**Comandos NSFW**', conv[find.noNSFW], true)
    .addField('**Comandos Furrys**', conv[find.furryStatus], true)

    if(find.furryStatus){
        e.addField('**Buscador Furry**', find.furrySearch, true)
    }

    let array = ['furrySearch', 'noNSFW', 'furryStatus']
    let elec = args[0]

    if(elec){

        if(!array.includes(elec))return send(`Parametro invalido, parametros validos: ${array.join(' , ')}`)

        if(elec === array[0]){
            let stats = args[1]
            if(!stats)return send(`Necesitas poner on o off!`)
            let array1 = ['e621','e921']

            if(stats === array1[0]){
                if(find.furrySearch === array1[0])return send(`El metodo de busqueda ya esta definido en ese`)

                await nsfwModel.updateOne({guildID: message.guild.id}, {$set: {furrySearch: stats}})
                
                return send(`El nuevo metodo de busqueda es ${stats}`)
            }else if(stats === array1[1]){
                if(find.furrySearch === array1[1])return send(`El metodo de busqueda ya esta definido en ese`)

                await nsfwModel.updateOne({guildID: message.guild.id}, {$set: {furrySearch: stats}})
                
                return send(`El nuevo metodo de busqueda es ${stats}`)
            }else {
                return send(`Solo puedes elegir estos metodos de busqueda: ${array1.join(' , ')}`)
            }

        }else if(elec === array[1] || elec === array[2]){
            let stats = args[1]

            if(stats.toLowerCase() === 'on'){
                if(find[elec] === true)return send(`El parametro ya esta activo`)

                await nsfwModel.updateOne({guildID: message.guild.id}, {$set: {[elec]: true}})

                return send(`${elec} ahora esta activado`)
            }else if(stats.toLowerCase() === 'off'){

                if(find[elec] === false)return send(`El parametro ya esta desactivado`)

                await nsfwModel.updateOne({guildID: message.guild.id}, {$set: {[elec]: false}})

                return send(`${elec} ahora esta desactivado`)
            }else {
                return send('Debes escribir on o off')
            }

        }else {
            return send(`Parametro invalido: ${array1}`)
        }
    }else {
        return send(e)
    }

    }
}

module.exports.help = {
name: 'nsfwconfig',
description: 'Configura metodos de busqueda y mas cosas nsfw',
cooldown: [],
alias: [],
usage: 'nsfwconfig',
example: 'nsfwconfig'
}