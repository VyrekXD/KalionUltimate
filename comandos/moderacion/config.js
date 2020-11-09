const Discord = require('discord.js');
const prefixModel = require('../../database/models/guildPrefix');
const logsModel = require('../../database/models/logs')
const devModel = require('../../database/models/developers')
const automodModel = require('../../database/models/automod')
const { checkPerms } = require('../../util/Functions/checkPermissions')

module.exports = {
    permisos: ['VIEW_CHANNEL','SEND_MESSAGES','EMBED_LINKS'],
    guildOnly: true,
    run: async(client, message, args) => {
    let elec = args[0]

    let devConsulta = devModel.findOne({developer: message.author.id})

    if(!checkPerms(message.member, 'ADMINISTRATOR') || !devConsulta)return message.channel.send(`Permisos insuficientes`)

    let res0 = await prefixModel.findOne({servidor: message.guild.id})
    let prefix = res0 ? res0.prefix : 'k-'
    let res1 = await logsModel.findOne({servidor: message.guild.id})
    let res2 = await automodModel.findOne({servidor: message.guild.id})

    let e = {
        false:'Off',
        true:'On'
    }

    const aa = new Discord.MessageEmbed()
    .setColor(`RED`)
    .setTitle(`${message.guild.name} (${message.guild.id})`)
    .setThumbnail()
    .setDescription(`En este mensaje se mostrara toda la configuracion de el servidor con el bot`)
    .addField(`**Prefix:**`, prefix, true)

    if(res2){
        aa.addField(`**Automod**`, e[res2.automod], true)
    }
    if(res1){
        let canal = await message.guild.channels.cache.get(res1.canals)
        aa.addField(`**Logs:**`, `${canal.name} (${canal.id})`, true)
        .setFooter(`Si necesitas saber que eventos estan activos usa ${prefix}config logs`)
    }
    
    //CONFIGURACION AUTOMOD
    if(elec === 'automod'){
        //CARACTERISTICAS
        const automods = ['evasiveMute']
        //ACTIVACION Y DESACTIVACION DE EL AUTOMOD
        if(args[1] === 'On'){

            let consulta = await automodModel.findOne({servidor: message.guild.id})

            if(consulta){
                if(consulta.automod === true)return message.channel.send(`El automod ya esta activado`)

                let nuevo = await new automodModel({servidor: message.guild.id, automod: true})
                nuevo.save()
                return message.channel.send(`Automod activado`)
            }else {
                if(consulta.automod === true)return message.channel.send(`El automod ya esta activado`)

                await automodModel.updateOne({servidor: message.guild.id}, {$set: {automod: true}})
                return message.channel.send(`Automod activado`)
            }

        }else if(args[1] === 'Off'){
            let consulta = await automodModel.findOne({servidor: message.guild.id})

            if(consulta){

                if(!consulta.automod)return message.channel.send(`El automod ya esta desactivado`)

                let nuevo = await new automodModel({servidor: message.guild.id, automod: false})
                nuevo.save()
                return message.channel.send(`Automod desactivado`)
            }else {
                if(!consulta.automod)return message.channel.send(`El automod ya esta desactivado`)

                await automodModel.updateOne({servidor: message.guild.id}, {$set: {automod: false}})
                return message.channel.send(`Automod activado`)
            }//ACTIVACION Y DESACTIVACION DE LAS CARACTERISTICAS
        }else if(automods.includes(args[1])){
            let elecc = args[2]
            let consulta = await automods.findOne({servidor: message.guild.id})

            if(!consulta)return message.channel.send(`No has activado el automod`)
            if(!consulta.automod)return message.channel.send(`El automod esta desactivado`)

            if(elecc === 'On'){

                await automodModel.updateOne({servidor: message.guild.id}, {$set: {[args[1].status]: true}})
                return message.channel.send(`La caracteristica de el automod: ${args[1]} ha sido activada`)
            }else if(elecc === 'Off'){
                await automodModel.updateOne({servidor: message.guild.id}, {$set: {[args[1].status]: false}})
                return message.channel.send(`La caracteristica de el automod: ${args[1]} ha sido desactivada`)
            }

        }else {
            let consulta = await automodModel.findOne({servidor: message.guild.id})
            if(!consulta)return message.channel.send(`El automod no esta activado!`)
            
            const e7 = new Discord.MessageEmbed()
            .setTitle(`Estado de el automod de ${message.guild.name}`)
            .setColor(`RANDOM`)
            .setDescription(`Automod Status: ${consulta.automod}`)
            .addField(`Caracteristicas`, ` - evasiveMute: **${consulta.evasiveMute.status}**\n
            `)
        }
    }
    //CONFIGURACION PREFIX
    if(elec === 'prefix'){
        if(!args[1])return message.channel.send(`Debes de escribir el nuevo prefix`)
        if(args[1].length > 3) return message.channel.send("El prefix no puede tener más de 3 caracteres")

        let res = await prefixModel.findOne({servidor: message.guild.id})

        if(res) {
            await prefixModel.updateOne({servidor: message.guild.id}, { $set: { prefix: args[1] }})
            message.channel.send(`El prefix ha sido cambiado a **${args[1]}**`) 
            }else {
                let nuevo = new prefixModel({servidor: message.guild.id, prefix: args[1]})
                nuevo.save()
                message.channel.send(`El prefix ha sido establecido a **${args[1]}**`)
            }
    }else if(elec === 'logs'){
        let eventos = ['channelCreate','channelDelete','banAdd','banRemove','memberAdd','memberRemove','memberUpdate','inviteCreate','inviteDelete','messageDelete','messageUpdate','roleCreate','roleDelete','roleUpdate','memberMuted','memberUnmuted']
        let elec2 = args[1]
        if(elec2 ===  'set'){
            let canal = message.mentions.channels.first() || 
            message.guild.channels.cache.get(args[2]);
    
            if(!canal)return message.channel.send(`Debes de mencionar el canal!`)
    
            let res = await logsModel.findOne({servidor: message.guild.id})
            if(res){
                logsModel.updateOne({servidor: message.guild.id}, {$set: {canals: canal.id}})
                message.channel.send(`Se ha cambiado el canal de logs el canal de logs: ${canal}`)
            }else {
                let nuevo = new logsModel({servidor: message.guild.id, canals: canal.id})
                nuevo.save()
                message.channel.send(`Se ha establecido el canal de logs: ${canal}`)
            }
        } else if(elec2 === 'unset'){
            let consulta = await logsModel.findOne({servidor: message.guild.id})
            if(!consulta)return message.channel.send('No hay un canal de logs establecido usa set!')
            message.channel.send(`El canal de logs se ha borrado!`)
            await logsModel.deleteOne({servidor: message.guild.id})
        } else if(eventos.includes(elec2)){

            let elec3 = args[2]

            if(elec3 === 'On'){

                let consulta = await logsModel.findOne({servidor: message.guild.id})
                if(!consulta)return message.channel.send('No hay un canal de logs establecido')

                if(consulta[elec2] === true)return message.channel.send(`El evento: ${elec2} ya estaba activado`)
                await logsModel.findOneAndUpdate({servidor: message.guild.id}, {$set: {[elec2]: true}})
                message.channel.send(`El evento: ${elec2} a sido activado`)

            } else if(elec3 === 'Off'){

                let consulta = await logsModel.findOne({servidor: message.guild.id})
                if(!consulta)return message.channel.send('No hay un canal de logs establecido')

                if(consulta[elec2] === false)return message.channel.send(`El evento: ${elec2} ya estaba desactivado`)
                await logsModel.findOneAndUpdate({servidor: message.guild.id}, {$set: {[elec2]: false}})
                message.channel.send(`El evento: ${elec2} a sido desactivado`)
            }else {
                return message.channel.send('Especifica si quieres desactvar o activar')
            }
        } else {
            let consulta = await logsModel.findOne({servidor: message.guild.id})
            if(!consulta)return message.channel.send('No hay un canal de logs establecido')

            let a = {
                true:'On',
                false:'Off'
            }
            const e0 = new Discord.MessageEmbed()
            .setTitle(`Estado de los logs de ${message.guild.name}`)
            .setColor(`RANDOM`)
            .setFooter(`El evasive mute es cuando un miembro tenia el rol de muted, puedes decidir si cuando salga lo baneas o no`)
            .setDescription(`- channelCreate: **${a[consulta.channelCreate]}**\n
                            - channelDelete: **${a[consulta.channelDelete]}**\n
                            - banAdd: **${a[consulta.banAdd]}**\n
                            - banRemove: **${a[consulta.banRemove]}**\n
                            - memberAdd: **${a[consulta.memberAdd]}**\n
                            - memberRemove: **${a[consulta.memberRemove]}**\n
                            - memberUpdate: **${a[consulta.memberUpdate]}**\n
                            - inviteCreate: **${a[consulta.inviteCreate]}**\n
                            - inviteDelete: **${a[consulta.inviteDelete]}**\n
                            - messageDelete: **${a[consulta.messageDelete]}**\n
                            - messageUpdate: **${a[consulta.messageUpdate]}**\n
                            - roleCreate: **${a[consulta.roleCreate]}**\n
                            - roleDelete: **${a[consulta.roleDelete]}**\n
                            - roleUpdate: **${a[consulta.roleUpdate]}**\n
                            - memberMuted: **${a[consulta.memberMuted]}**\n
                            - memberUnmuted: **${a[consulta.memberUnmuted]}**
                                                                                `)
            return message.channel.send(e0) 
        }
    }
    else {
        message.channel.send(aa)
    }

}
}