const Discord = require('discord.js')

module.exports = {
aliases: ['np','nowp','nowplay'],
permisos: ['VIEW_CHANNEL','SEND_MESSAGES','EMBED_LINKS','CONNECT','SPEAK'],
run: async(client, message, args) => {


    
    const voiceChannel = message.member.voice.channel;
    
    if(!voiceChannel)return message.channel.send({embed: {color: client.colors.error, description: `${client.emotes.error} | Necesitas estar en un canal de voz!`}});

    if(!client.player.isPlaying(message.guild.id)) return message.channel.send({embed: {color: client.colors.error, description: `${client.emotes.error} | No hay nada reproduciendose!` }})
    
    let song = await client.player.nowPlaying(message.guild.id);

    const e = new Discord.MessageEmbed()
    .setColor(client.colors.kalion)
    .setTitle(`${client.emotes.music} | Cancion Actual`)
    .setThumbnail(song.thumbnail)
    .addField(`**Cancion**`, `[${Discord.Util.escapeMarkdown(song.name)}](${song.url})`)
    .addField(`**Solicitada Por**`, song.requestedBy)
    .addField(`**Duracion**`, song.duration)
    .setFooter(` Kalion Ultimate Music || Now Playing`)

    message.channel.send(e)
    }
}