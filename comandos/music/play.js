const Discord = require('discord.js');
const { separateNumbers } = require('../../util/Functions/numbers')

module.exports = {
    aliases: ['p','pl'],
    permisos: ['VIEW_CHANNEL','SEND_MESSAGES','EMBED_LINKS','CONNECT','SPEAK'],
    run: async(client, message, args) => {

        const voiceChannel = message.member.voice.channel;
    
        if(!voiceChannel)return message.channel.send({embed: {color: client.colors.error, description: `${client.emotes.error} | Necesitas estar en un canal de voz!`}});
    
        const permissions = voiceChannel.permissionsFor(message.client.user);
    
        if (!permissions.has('CONNECT') || !permissions.has('SPEAK'))return message.channel.send({embed: {color: client.colors.error, description: `${client.emotes.error} | Debo tener permiso de hablar y unirme al canal de voz!`}});
    
        let query = args.join(" ");
    
        if(!query)return message.channel.send({embed: {color: client.colors.error, description: `${client.emotes.error} | Porfavor ingresa lo que quieres buscar!` }})
    
        const searchTracks = await client.player.searchTracks(query).catch(e => {
            return message.channel.send({embed: {color: client.colors.error, description: `${client.emotes.error} | No hubo resultados!`}})
          });
    
        if(searchTracks.length < 1) return message.channel.send({embed: {color: client.colors.error, description: `${client.emotes.error} | No hubo resultados!`}})
        
        let track = searchTracks[0];
    
        if(client.player.isPlaying(message.guild.id)){
            
            let song = await client.player.addToQueue(message.guild.id, track, message.member.user.tag);
            const e = new Discord.MessageEmbed()
            .setColor(client.colors.kalion)
            .setTitle(`${client.emotes.queue} || Añadida A La Cola `)
            .setThumbnail(song.thumbnail)
            .addField(`**Cancion**`, `[${Discord.Util.escapeMarkdown(song.name)}](${song.url})`)
            .addField(`**Solicitada Por**`, song.requestedBy)
            .addField(`**Duracion**`, song.duration)
            .setFooter(` Kalion Ultimate Music || Play Song`)
            .setColor(client.colors.success)
    
            return message.channel.send(e)
        } else {
            
            let song = await client.player.play(message.member.voice.channel, track, message.member.user.tag);
            const e = new Discord.MessageEmbed()
            .setColor(client.colors.kalion)
            .setTitle(`${client.emotes.music} || Reproduciendo cancion `)
            .setThumbnail(song.thumbnail)
            .addField(`**Cancion**`, `[${Discord.Util.escapeMarkdown(song.name)}](${song.url})`)
            .addField(`**Solicitada Por**`, song.requestedBy)
            .addField(`**Duracion**`, song.duration)
            .setFooter(` Kalion Ultimate Music || Play Song`)
            .setColor(client.colors.success)
            message.channel.send(e)
            
            client.player.getQueue(message.guild.id).on('end', () => {
            message.channel.send({embed: {color: client.colors.warning, description: `${client.emotes.warning} | Ya no hay mas canciones en la lista!` }})
            });
        
            client.player.getQueue(message.guild.id).on('trackChanged', (oldSong, newSong, skipped, repeatMode) => {
                if(repeatMode){
                    message.channel.send({embed: {color: client.colors.success, description: `${client.emotes.repeat} | Repitiendo:\n ${oldSong.name}` }})
                } else {
                    message.channel.send({embed: {color: client.colors.success, description: `${client.emotes.music} | Ahora escuchando:\n ${newSong.name}` }})
                }
            });
        }
          
    }
}

module.exports.help = {
name: 'play',
description: 'Reproduce una cancion!',
cooldown: [],
alias: ['p','pl'],
usage: 'p [cancion]',
example: 'p Chandelier - Sia'
}