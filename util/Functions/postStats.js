const fetch = require('node-fetch')
const { abl } = require('abl-wrapper');

async function postStats(bot){
    let dat = {
        voice_connections: bot.voice.connections.size,
        users: bot.users.cache.size,
        guilds: bot.guilds.cache.size
    }

    await fetch(`https://discordbotlist.com/api/v1/bots/${bot.user.id}/stats`, {
        method: 'POST', 
        headers: { Authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0IjoxLCJpZCI6IjcyNDc0OTQ2ODQxODcwMzQzMiIsImlhdCI6MTYwNDk1NjMyMn0.-M32bEso6dtp0bZIAh_SvxG2hW--sCtZFT2PthWHWjI"},
        body: JSON.stringify(dat)}).then(()=> {
    }).catch(err => {
        console.log(err)
    })

    let data = {
        guildCount: bot.guilds.cache.size
    }
    
    await fetch(`https://discord.bots.gg/api/v1/bots/${bot.user.id}/stats`, {
        method: 'POST', 
        headers: {'Content-Type': 'application/json', Authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGkiOnRydWUsImlkIjoiNTM4NDIxMTIyOTIwNzQyOTQyIiwiaWF0IjoxNjAzMzc3NTkxfQ.elvkykgD6UXStlIQWw25_BUMaUSBPVQq-IyYVjb6gmY'},
        body: JSON.stringify(data)}
    ).catch(err => {
        console.log(err)
    })

    abl.count('be0e9771-69fc-465f-afd4-3e78b44546cc', bot, (error, success) => {
        if(error) throw new Error(error);
    });
}

module.exports = postStats;