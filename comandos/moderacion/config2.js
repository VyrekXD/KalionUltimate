const Discord = require('discord.js');
const configModel = require('../../database/models/guildConfig')
const { MessageEmbed } = require('discord.js')

module.exports = {
permisos: ['VIEW_CHANNEL','SEND_MESSAGES','EMBED_LINKS'],
aliases: [],
guildOnly: true,
run: async (bot, message, args, send) => {

    let find = await configModel.findOne({guildID: message.guild.id})
    if(!find){
        let nuevo = new configModel({guildID: message.guild.id})
        nuevo.save()
        find = await configModel.findOne({guildID: message.guild.id})
    }

    if(!args[0]){
       
        const ec = new MessageEmbed()
        .setColor('BLUE')
        .setAuthor(message.guild.name, message.guild.iconURL())
        if(find.logsConfig.status){
            let channel = message.guild.channels.cache.get(find.logsConfig.channelID)
            ec.addField(`**Logs**`, `
            - Status: ${find.logsConfig.status}
            - Canal: ${channel.name} (${channel.id})`)
        } else {
            ec.addField(`**Logs**`, `
            - Status: ${find.logsConfig.status}`)
        }

        return send(ec)
    }

    let categorias = ['A','B','C','D']
    let opcionTot = args[0].split('')

    if(!categorias.includes(opcionTot[0]))return send({embed: {color: 'RED', description: `${bot.emotes.error} Categoria invalida: ${categorias}`}})

    if(opcionTot === categorias[0]){
        let opciones = ['1','2','3']
        let opcion = opcionTot[1]
        if(!opciones.includes(opcionTot[1]))return send({embed: {color: 'RED', description: `${bot.emotes.error} Opciones invalidas: ${opciones}`}})

        if(opcion === opciones[0]){
            let argsParam = args[1]

            if(argsParam === '?set'){
                let argsStatus = args[2].toLowerCase()

                switch(argsStatus){
                    case "on":

                    if(find.logsConfig.status)return send({embed: {color: 'RED', description: `${bot.emotes.error} El modulo de logs ya esta activado`}})

                    await configModel.updateOne({guildID: message.guild.id}, {$set: {"logsConfig.status": true}})
                    send({embed: {color: 'GREEN', description: `${bot.emotes.succes} El modulo de logs se encuentra activado`}})
                    break;
                    case "off":
                        
                    if(!find.logsConfig.status)return send({embed: {color: 'RED', description: `${bot.emotes.error} El modulo de logs ya esta desactivado`}})

                    await configModel.updateOne({guildID: message.guild.id}, {$set: {"logsConfig.status": false}})
                    send({embed: {color: 'GREEN', description: `${bot.emotes.succes} El modulo de logs se encuentra desactivado`}})
                    break;
                    default: 
                    
                    }
            }else {
                return send({embed: {color: 'RED', description: `${bot.emotes.error} Esta opcion no admite ese parametro, usa ?set`}})
            }

        }else if(opcion === opciones[1]){

            let argsParam = args[1]

            if(argsParam === '?set'){
                let argsChannel = bot.guilds.cache.resolve()

                
            }else {
                return send({embed: {color: 'RED', description: `${bot.emotes.error} Esta opcion no admite ese parametro, usa ?set`}})
            }
        }else if(opcion === opciones[2]){
            
        }
    }

    
    let paginaActual = 0
    let paginas = []

    let a = {
        true: 'On',
        false: 'Off'
    }

        const e1 = new Discord.MessageEmbed()
        .setColor('BLACK')
        .setDescription(`
        **[A]** Logs
            <:space:761031527273332746><:arrow2:761027483100643348> [1] Status: ${a[find.logsConfig.status]}
            <:space:761031527273332746><:arrow2:761027483100643348> [2] Canal: ${a[find.logsConfig.channelID]}
            <:space:761031527273332746><:arrow2:761027483100643348> [3] Eventos: 
                - channelCreate: **${a[find.logsConfig.channelCreate]}**\n
                - channelDelete: **${a[find.logsConfig.channelDelete]}**\n
                - banAdd: **${a[find.logsConfig.banAdd]}**\n
                - banRemove: **${a[find.logsConfig.banRemove]}**\n
                - memberAdd: **${a[find.logsConfig.memberAdd]}**\n
                - memberRemove: **${a[find.logsConfig.memberRemove]}**\n
                - memberUpdate: **${a[find.logsConfig.memberUpdate]}**\n
                - inviteCreate: **${a[find.logsConfig.inviteCreate]}**\n
                - inviteDelete: **${a[find.logsConfig.inviteDelete]}**\n
                - messageDelete: **${a[find.logsConfig.messageDelete]}**\n
                - messageUpdate: **${a[find.logsConfig.messageUpdate]}**\n
                - roleCreate: **${a[find.logsConfig.roleCreate]}**\n
                - roleDelete: **${a[find.logsConfig.roleDelete]}**\n
                - roleUpdate: **${a[find.logsConfig.roleUpdate]}**\n
                - memberMuted: **${a[find.logsConfig.memberMuted]}**\n
                - memberUnmuted: **${a[find.logsConfig.memberUnmuted]}**
                - evasiveMute: **${a[find.logsConfig.evasiveMute]}**`)

        paginas.push(e1)

        const e2 = new Discord.MessageEmbed()
        .setColor('BLACK')
        .setDescription(`
        **[B]** Automod
            <:space:761031527273332746><:arrow2:761027483100643348> [1] Status: ${a[find.automodConfig.status]}
            <:space:761031527273332746><:arrow2:761027483100643348> [2] EvasiveMute: ${a[find.automodConfig.evasiveMute]}
            `)
        paginas.push(e2)

        const e3 = new Discord.MessageEmbed()
        .setColor('BLACK')
        .setDescription(`
        **[C]** Nsfw
            <:space:761031527273332746><:arrow2:761027483100643348> [1] Status: ${a[find.nsfwConfig.status]}
            <:space:761031527273332746><:arrow2:761027483100643348> [2] No Nsfw (No comandos NSFW): ${a[find.nsfwConfig.noNSFW]}
            <:space:761031527273332746><:arrow2:761027483100643348> [3] No Furry (No comandos Furrys): ${a[find.nsfwConfig.furryStatus]}
            <:space:761031527273332746><:arrow2:761027483100643348> [4] Buscador Furry: ${find.nsfwConfig.furrySearch}
            `)
        paginas.push(e3)

        const e4 = new Discord.MessageEmbed()
        .setColor('BLACK')
        .setDescription(`
        **[D]** Moderacion
            <:space:761031527273332746><:arrow2:761027483100643348> [1] Status: ${a[find.modConfig.status]}
            <:space:761031527273332746><:arrow2:761027483100643348> [2] Solo Mod: ${a[find.modConfig.onlyMod]}
            `)
        
        paginas.push(e4)

        let msg = await send(paginas[0])

        await msg.react('760928789131427862')
        await msg.react('760928829073260626')
        await msg.react('761030675360514048')

        const filter = (reaction, user) => {return ['760928789131427862','760928829073260626','761030675360514048'].includes(reaction.emoji.id) && user.id === message.author.id}
        const collector = msg.createReactionCollector(filter, { time: 60000})

        collector.on('collect', async reaction =>{
            if(reaction.emoji.id === '760928829073260626'){
                msg.reactions.cache.find(r => r.emoji.id == '760928829073260626').users.remove(message.author.id).catch(() => {})
                if(paginaActual < paginas.length - 1){
                    msg.edit(paginas[++paginaActual])
                }
            }
            else if(reaction.emoji.id === '760928789131427862'){
                msg.reactions.cache.find(r => r.emoji.id == '760928789131427862').users.remove(message.author.id).catch(() => {})
                if(paginaActual !== 0){
                    msg.edit(paginas[--paginaActual])
                }
            }else {
                    msg.reactions.removeAll()
                    collector.stop()
                }
            
        })

    }
}

module.exports.help = {
name: 'config2',
description: 'Configuracion de el servidor',
cooldown: [],
alias: [],
usage: 'config',
example: 'config'
}