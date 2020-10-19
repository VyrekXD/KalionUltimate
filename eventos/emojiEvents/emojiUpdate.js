const Discord = require('discord.js');
const configModel = require('../../database/models/guildConfig')

module.exports.run = bot => {
  bot.on("emojiUpdate", async (oldEmoji, newEmoji) => {

    if(!oldEmoji.guild) return;

    let find = await configModel.findOne({guildID: oldEmoji.guild.id}).logsConfig
    if(!find)return
    if(!find.emojiUpdate)return

    if(message.guild.me.hasPermissions('VIEW_AUDIT_LOG')){
        oldEmoji.guild.fetchAuditLogs().then(async logs => {
            let userL = logs.entries.first().executor

            if(oldEmoji.name !== newEmoji.name) {

                const e = new Discord.MessageEmbed()
                .setColor('BLUE')
                .setTitle('__**Emoji Actualizado**__')
                .addField('**Usuario**', `${userL}\n${userL.id}`, true)
                .addField('**Emoji**', `${oldEmoji.name}(${oldEmoji.id}) => ${newEmoji.name}(${oldEmoji.id})`, true)

                log = await find.canals
        
                let canal1 = bot.channels.cache.get(log)
                canal1.send(e)
            }
        })
    }
  })
}