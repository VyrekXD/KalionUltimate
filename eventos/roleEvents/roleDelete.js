const Discord = require('discord.js');
const configModel = require('../../database/models/guildConfig')
const moment = require('moment')

module.exports.run = bot => {
    bot.on("roleDelete", async role => {

        let find = (await configModel.findOne({guildID: role.guild.id}))
        if(!find)return;
        find = find.logsConfig
        if(!find.roleDelete)return

        const e = new Discord.MessageEmbed()
        .setTitle('__**Rol Eliminado**__')
        .setColor("#FF0000")
        .addField(`**Rol**`, `${role.name}\n${role.id}`)

    
        log = await find.channelID
        
        let canal = bot.channels.cache.get(log)
        if(!canal)return;
        canal.send(e)

    })
}