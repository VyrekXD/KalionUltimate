const fetch = require('node-fetch')

async function postStats(bot){
    await fetch(`https://discordbotlist.com/api/v1/bots/${bot.user.id}/stats`, {method: 'POST', body: {
        voice_connections: bot.voice.connections.size,
        users: bot.users.cache.size,
        guilds: bot.guilds.cache.size
    }}).then(()=> {
        console.log(`Estadisticas posteadas en DiscordBotList`)
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
    ).then(()=> {
        console.log(`Estadisticas posteadas en Statcord`)
    }).catch(err => {
        console.log(err)
    })

    statcord.autopost();
}

module.exports = postStats;