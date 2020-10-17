const Discord = require('discord.js');
const configModel = require('../../database/models/guildConfig')
const moment = require('moment')

module.exports.run = bot => {
    bot.on("roleCreate", async role => {
           
    let consulta = await configModel.findOne({guildID: role.guild.id}).logsConfig
    if(!consulta)return
    if(!consulta.roleCreate)return


        const e = new Discord.MessageEmbed()
        .setColor("#37ff00")
        .setTitle('__**Rol Creado**__')
        .addField(`**Rol**`, `<@&${role.id}>\n${role.id}`, true)
        
        if(role.managed === 'true'){
            e.addField(`**Manegado Por Bot?**`, `Si`)
        }
        role.guild.fetchAuditLogs().then(async x => {
            let u = x.entries.first()

            e.addField(`**Moderador**`, `${u.executor.tag}\n${u.executor.id}` || 'undefined', true)
           
            if(u.reason){
                e.addField(`**Razon**`, u.reason, true)
            }

            
            log = await consulta.channelID
        
            let canal = bot.channels.cache.get(log)
            canal.send(e)
    
                  
        })
        


    })
}