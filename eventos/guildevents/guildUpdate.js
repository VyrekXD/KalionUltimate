const Discord = require('discord.js');
const configModel = require('../../database/models/guildConfig')

module.exports.run = async(bot, oldGuild, newGuild) => {

    if(oldGuild.premiumSubscriptionCount < newGuild.premiumSubscriptionCount){
        let boost = {
            newGuild,
            newBoost: newGuild.premiumSubscriptionCount,
            oldBoost: oldGuild.premiumSubscriptionCount
        }
        bot.emit('guildBoostAdd', boost)
    }else if(oldGuild.premiumSubscriptionCount > newGuild.premiumSubscriptionCount){
        let boost = {
            newGuild,
            newBoost: newGuild.premiumSubscriptionCount,
            oldBoost: oldGuild.premiumSubscriptionCount
        }
        bot.emit('guildBoostRemove', boost)
    }

}