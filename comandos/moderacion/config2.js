const Discord = require('discord.js');
const configModel = require('../../database/models/guildConfig')
const { MessageEmbed } = require('discord.js');

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

    let elc = args[0]
    let op = ['on','off'], opp = {'off':false,'on':true}

    if(!elc){
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

            collector.on('end',() => {return 'exited'})
            return
    } else if(args[0].toUpperCase === 'A'){
console.log(args[1])
        let sub = args[1]

        if(!sub)return send(`No pusiste una sub-categoria correcta`)

        switch (sub) {
            case '1':
                
                let sta = args[2]

                if(!sta)return send(`Debes de poner una opcion: [on/off]`)
                if(opp.includes(sta.toLowerCase))return send(`No pusiste una opcion correcta: [on/off]`)
                if(find.logsConfig.status === op[sta.toLowerCase])return send(`Esa opcion ya esta como: ${sta.toLowerCase}`)

                await configModel.updateOne({guildID: message.guild.id}, {$set: {[logsConfig.status]: op[sta.toLowerCase]}})

                send({embed: {color: 'GREEN', description: `Ahora los logs estan activados!`}})
                break;
        
            case '2':
                
                if(!find.logsConfig.status)return send(`Los logs estan desactivados!`)

                let channel = message.mentions.channels.first() || message.guild.channels.resolve(args[2])

                if(!channel)return send(`No mencionaste ningun canal :eyes:`)

                await configModel.updateOne({guildID: message.guild.id}, {$set: {[logsConfig.channelID]: channel.id}})

                send({embed: {color:'GREEN', author: { name: message.author.tag, icon_url: message.author.displayAvatarURL() },description:` El nuevo canal de logs es ${channel.toString()}`}})

                break;

            case '3':
                let elcca = args[2]

                let evn = ['channelCreate','channelDelete','guildBoostAdd','guildBoostRemove','banAdd','banRemove','memberAdd','memberRemove','memberUpdate','inviteCreate','inviteDelete','messageDelete','messageUpdate','roleCreate','roleDelete','roleUpdate','memberMuted','memberUnmuted']
                
                if(!elcca.toLowerCase)return send(`Debes incluir un evento`)
                if(!evn.includes(elcc))return send(`No pusiste un evento correcto, para ver los eventos disponibles usa \`${find.prefix}config\` (Atencion: Debes de incluir el evento tal como es su nombre!)`)

                let elcsa = args[3]

                if(!elcsa)return send(`Debes de incluir una opcion!`)
                if(!op.includes(elcsa.toLowerCase))return send(`Debes de incluir una opcion correcta! [on/off]`)
                if(find.logsConfig[elcca] === opp[elcsa])return send(`Ese evento ya esta: ${elcsa}`)

                await configModel.updateOne({guildID: message.guild.id}, {$set: {[logsConfig[elcca]]: opp[elcsa.toLowerCase]}})

                send({embed: {color: 'GREEN', author: {name: message.author.tag, icon_url: message.author.displayAvatarURL()}, description:`El evento ${elcc5} ha sido actualizado a el estado ${elcsa.toLowerCase}`}})

                break;

            default:
                send(`No seleccionaste una sub-categoria correcta`)
                break;
            }
    }else if(elc.toUpperCase === 'B'){

        let elcc = args[1]

            switch (elcc) {
                case '1':
                    
                let elcse = args[2]

                if(!elcse)return send(`Debes de incluir una opcion! [on/off]`)
                if(!op.includes(elcse.toLowerCase))return send(`No incluiste una opcion correcta! [on/off]`)
                if(find.automodConfig.status === opp[elcse.toLowerCase])return send(`El status de el automod ya esta como: ${elcse}`)

                await configModel.updateOne({guildID: message.guild.id}, {$set: {[automodConfig.status]: opp[elcse.toLowerCase]}})

                send({embed: {color: 'GREEN', author:{name: message.author.tag, icon_url: message.author.displayAvatarURL()}, description:`Ahora el status de el automod es: ${elcse.toLowerCase}`}})

                    break;

                case '2':
                    
                let elcssi = args[2]

                if(!elcssi)return send(`Debes de incluir una opcion! [on/off]`)
                if(!op.includes(elcssi.toLowerCase))return send(`No incluiste una opcion correcta! [on/off]`)
                if(!find.automodConfig.status)return send(`El automod esta desactivado`)
                if(find.automodConfig.evasiveMute === opp[elcssi])return send(`El evasive mute ya esta como: ${elcssi.toLowerCase}`)

                await configModel.updateOne({guildID: message.guild.id}, {$set: {[automodConfig.evasiveMute]: opp[elcssi]}})

                send({embed: {color: 'GREEN', author:{name: message.author.tag, icon_url: message.author.displayAvatarURL()}, description:`El evasive mute ahora esta como: ${elcssi.toLowerCase}`}})

                    break;
                default:
                    send(`No seleccionaste una sub-categoria correcta`)
                    break;
            }
            
    }else if(elc.toUpperCase === 'C'){

        let elccc = args[1]
            
            switch (elccc) {
                case '1':
                    
                    let elcso = args[2]
    
                    if(!elcso)return send(`Debes de incluir una opcion! [on/off]`)
                    if(!op.includes(elcso.toLowerCase))return send(`No incluiste una opcion correcta! [on/off]`)
                    if(find.nsfwConfig.status === opp[elcso.toLowerCase])return send(`El status de el nsfw ya esta como: ${elcso}`)
    
                    await configModel.updateOne({guildID: message.guild.id}, {$set: {[nsfwConfig.status]: opp5[elcso.toLowerCase]}})
    
                    send({embed: {color: 'GREEN', author:{name: message.author.tag, icon_url: message.author.displayAvatarURL()}, description:`Ahora el status de el nsfw es: ${elcso.toLowerCase}`}})

                    break;
            
                case '2':
                    
                    let elcsu = args[2]
    
                    if(!elcsu)return send(`Debes de incluir una opcion! [on/off]`)
                    if(!op.includes(elcsu.toLowerCase))return send(`No incluiste una opcion correcta! [on/off]`)
                    if(!find.nsfwConfig.status)return send(`El nsfw esta desactivado!`)
                    if(find.nsfwConfig.noNSFW === opp[elcsu.toLowerCase])return send(`El nonsfw ya esta como: ${elcsu}`)
    
                    await configModel.updateOne({guildID: message.guild.id}, {$set: {[nsfwConfig.noNSFW]: opp[elcsu.toLowerCase]}})
    
                    send({embed: {color: 'GREEN', author:{name: message.author.tag, icon_url: message.author.displayAvatarURL()}, description:`Ahora el nonsfw esta como: ${elcsu.toLowerCase}`}})

                    break;

                case '3':
                    
                    let elcsr = args[2]
    
                    if(!elcsr)return send(`Debes de incluir una opcion! [on/off]`)
                    if(!op.includes(elcsr.toLowerCase))return send(`No incluiste una opcion correcta! [on/off]`)
                    if(!find.nsfwConfig.status)return send(`El nsfw esta desactivado!`)
                    if(find.nsfwConfig.furryStatus === opp[elcsr.toLowerCase])return send(`El nofurry ya esta como: ${elcsr}`)
    
                    await configModel.updateOne({guildID: message.guild.id}, {$set: {[nsfwConfig.furryStatus]: opp[elcsr.toLowerCase]}})
    
                    send({embed: {color: 'GREEN', author:{name: message.author.tag, icon_url: message.author.displayAvatarURL()}, description:`Ahora el nofurry esta como: ${elcsr.toLowerCase}`}})

                    break;

                case '4':
                    
                    let elcsw = args[2]
                    let op = ['e621','e961']

                    if(!elcsw)return send(`Debes incluir una opcion! [e621/e961]`)
                    if(!op.includes(elcsw.toLowerCase))return send(`No incluiste una opcion correcta! [e621/e961]`)
                    if(!find.nsfwConfig.status)return send(`El nsfw esta desactivado!`)
                    if(find.nsfwConfig.furrySearch === elcsw.toLowerCase)return send(`El buscador furry ya esta como: ${elcsw.toLowerCase}`)

                    await configModel.updateOne({guildID: message.guild.id}, {$set: {[nsfwConfig.furrySearch]: elcsw.toLowerCase}})

                    send({embed: {color: 'GREEN', author:{name: message.author.tag, icon_url: message.author.displayAvatarURL()}, description:`Ahora la busqueda furry se hara con: ${elcsw.toLowerCase}`}})

                    break;

                default:
                    send(`No seleccionaste una sub-categoria correcta`)
                    break;
            }
    }else if(elc.toUpperCase === 'D'){

        let elcc = args[1]

            switch (elcc) {
                case '1':

                    let elcsd = args[2]
    
                    if(!elcsd)return send(`Debes de incluir una opcion! [on/off]`)
                    if(!op9.includes(elcsd.toLowerCase))return send(`No incluiste una opcion correcta! [on/off]`)
                    if(find.modConfig.status === opp[elcsd.toLowerCase])return send(`El estado de la moderacion ya esta como: ${elcsd}`)
    
                    await configModel.updateOne({guildID: message.guild.id}, {$set: {[modConfig.status]: opp[elcsd.toLowerCase]}})
    
                    send({embed: {color: 'GREEN', author:{name: message.author.tag, icon_url: message.author.displayAvatarURL()}, description:`Ahora el nofurry esta como: ${elcsd.toLowerCase}`}})

                    break;

                case '2':
                    
                    let elcsv = args[2]

                    if(!elcsv)return send(`Debes de incluir una opcion! [on/off]`)
                    if(!op.includes(elcsv.toLowerCase))return send(`No incluiste una opcion correcta! [on/off]`)
                    if(!find.modConfig.status)return send(`La moderacion esta desactivada`)
                    if(find.modConfig.onlyMod === opp[elcsv.toLowerCase])return send(`El estado de la moderacion ya esta como: ${elcsv}`)

                    await configModel.updateOne({guildID: message.guild.id}, {$set: {[modConfig.onlyMod]: elcsv.toLowerCase}})

                    send({embed: {color: 'GREEN', author:{name: message.author.tag, icon_url: message.author.displayAvatarURL()}, description:`Ahora el only mod esta como: ${elcsv.toLowerCase}`}})

                    break;
                default:
                    send(`No seleccionaste una sub-categoria correcta`)
                    break;
            }


    }
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


