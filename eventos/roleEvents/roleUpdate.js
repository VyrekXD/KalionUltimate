const Discord = require('discord.js');
const configModel = require('../../database/models/guildConfig')
const moment = require('moment')

module.exports.run = bot => {
    bot.on("roleUpdate",async (oldRole, newRole) => {
      
        let find = (await configModel.findOne({guildID: oldRole.guild.id})).logsConfig
        if(!find)return
        if(!find.roleUpdate)return

        const e = new Discord.MessageEmbed()
        .setColor(`#1291af`)
        .setTitle('__**Rol Actulizado**__')
        .addField(`**Rol**`, `<@&${newRole.id}>\n${newRole.id}`, true)

        const o1 = oldRole.permissions
        const o2 = newRole.permissions
        
        if(newRole.guild.me.hasPermission('VIEW_AUDIT_LOGS')){
            let x = await newRole.guild.fetchAuditLogs()
            let u = x.entries.first()
            e.addField(`**Moderador**`, `${u.executor.tag}\n${u.executor.id}` || 'undefined', true)
        }
        if(oldRole.name !== newRole.name){
            e.addField(`**Nombre**`, `${oldRole.name} ==> ${newRole.name}`, true)
        }
        if(oldRole.hexColor !== newRole.hexColor){
            e.addField(`**Color**`, `${oldRole.hexColor} ==> ${newRole.hexColor}`, true)
        }
       
        if(oldRole.hoist !== newRole.hoist){
            const a = {
                'true':'Si',
                'false':'No'
            }
            e.addField(`**El rol es listado?**`, `${a[oldRole.hoist]} ==> ${a[newRole.hoist]} `, true)
        }
        if(oldRole.mentionable !== newRole.mentionable){
           const a = {
            'true':'Si',
            'false':'No'
           }
           e.addField(`**Mencionable?**`, `${a[oldRole.mentionable]} ==> ${a[newRole.mentionable]} `, true)
        }
        if(!o1.equals(o2)){
            const i1 = o1.missing(o2)
            const i2 = o2.missing(o1)

            if(i1.length){
                e.addField(`**Permisos Agregados**`, i1.join(', '))
            }
            if(i2.length){
                e.addField(`**Permisos Removidos**`, i2.join(', '))
            }
        }
        
        log = await find.channelID
        
        let canal = bot.channels.cache.get(log)
        if(!canal)return;
        canal.send(e)

    })
}