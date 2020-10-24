const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js')
const { checkPerms } = require('../../util/Functions/checkPermissions') 
const ms = require('ms')

module.exports = {
permisos: ['VIEW_CHANNEL','SEND_MESSAGES','EMBED_LINKS'],
aliases: [],
guildOnly: true,
run: async (bot, message, args, send) => {
 
    if(!checkPerms(message.member, 'MANAGE_ROLES'))return message.channel.send(`Permisos insuficientes`)
    if(!message.guild.me.hasPermission('MANAGE_ROLES'))return send(`No tengo permisos`)


    let ex = args[0]
    let a = ['clone','humans','bots','withrole','everyone']

        if(!a.includes(ex.toLowerCase())){
            let u = message.mentions.members.first() || message.guild.members.resolve(args[0])
            let role = message.mentions.roles.first() || message.guild.roles.resolve(args[1])

            if(!u)return send(`Debes mencionar al menos un usuario`)
            if(!role)return send('Debes mencionar al menos un role')
            if(role.managed)return send(`Ese rol es manejado por un bot, no se lo puedes dar a nadie`)
            if(role.comparePositionTo(message.member.roles.highest) > 0)return send(`Ese rol es mayor que todos los que tienes no lo puedes usar`)

            if(u.roles.cache.has(role.id)){
                await u.roles.remove(role).catch(err => {
                    return send(`Ha ocurrido un error: \n${err}`)
                })

                const e = new MessageEmbed()
                .setColor('RED')
                .setDescription(`✅ Roles removidos para ${u} - ${role}`)

                return send(e)
            }else {
                await u.roles.add(role).catch(err => {
                    return send(`Ocurrio un error: \n${err}`)
                })

                const e = new MessageEmbed()
                .setColor('GREEN')
                .setDescription(`✅ Roles agregados para ${u} + ${role}`)

                return send(e)
            }
        } else if(ex == 'clone'){
            let role = message.mentions.roles.first() || message.guild.roles.resolve(args[1])

            if(!role)return send(`Debes mencionar un rol o poner su ID`)
            if(role.managed)return send(`Ese rol es manejado por un bot, no se lo puedes dar a nadie`)
            if(role.comparePositionTo(message.member.roles.highest) > 0)return send(`Ese rol es mayor que todos los que tienes no lo puedes usar`)

            let newrole = await message.guild.roles.create({
                data: {
                    name: role.name,
                    color: role.color,
                    hoist: role.hoist,
                    rawPosition: (role.rawPosition - 1),
                    permissions: role.permissions,
                    managed: false,
                    mentionable: role.mentionable
                },
                reason: `${message.author.tag} ha clonado el role ${role.name}`
                }).catch(err => {
                    return send(`Ha ocurrido un error: \n${err}`)
                })

            const e = new MessageEmbed()
            .setColor('GREEN')
            .setDescription(`Rol clonado: ${newrole}`)

            return send(e)
        }else if(ex === 'humans'){

            let role = message.mentions.roles.first() || message.guild.roles.resolve(args[1])

            if(!role)return send(`Debes mencionar un rol o poner su ID`)
            if(role.managed)return send(`Ese rol es manejado por un bot, no se lo puedes dar a nadie`)
            if(role.comparePositionTo(message.member.roles.highest) > 0)return send(`Ese rol es mayor que todos los que tienes no lo puedes usar`)

            let timenow = new Date.now()
            let totalh = messsage.guild.members.cache.filter((m) => !m.user.bot).array()

            const e = new MessageEmbed()
            .setColor('RED')
            .setDescription(`
            Agregando roles... <a:loadingoogle:744334507242422302>
            0/${totalh.length}
            
            Espere porfavor...`)
            .setFooter(`Este proceso puede tardar un poco depende de la cantidad de miembros`)

            let msg = await send(e)

            for(let i, k = 3; totalh.length; i++){
                let u = totalh[i]
                if(i === k){
                    k += 3
                    if(!i === totalh.length){
                        msg.edit({embed: {color: 'RED', description: `Agregando roles... <a:loadingoogle:744334507242422302>\n${i}/${totalh.length}\n\nEspere porfavor...`, footer: `Este proceso puede tardar un poco depende de la cantidad de miembros`}})
                    }
                }else if(i === totalh.length){
                    let timefin = (new Date.now() - timenow) 
                    msg.edit({embed: {color: 'RED', description: `Roles agregados!\n${i}/${totalh.length}\n\nEl proceso a terminado tiempo total: ${ms(timefin)}`, footer: `Proceso terminado...`}})
                }

                setTimeout(() => {
                    u.roles.add(role)
                }, 2000);

                
            }
        }
    }
}

module.exports.help = {
name: '',
description: '',
cooldown: [],
alias: [],
usage: '',
example: ''
}