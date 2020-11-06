const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js')
const { checkPerms } = require('../../../util/Functions/checkPermissions') 
const ms = require('ms')

module.exports = {
permisos: ['VIEW_CHANNEL','SEND_MESSAGES','EMBED_LINKS'],
aliases: [],
guildOnly: true,
run: async (bot, message, args, send) => {

    let ex = args[0]
    let a = ['clone','humans','bots','withrole','everyone']

        if(!ex){
            const e = new MessageEmbed()
            .setTitle(`Comando role`)
            .setColor('BLUE')
            .setDescription(`
            **Usos**
            
            k!role everyone @role - Le da el rol especificado a todos
            k!role bots @role - Le da el rol especificado a los bots solamente
            k!role humans @role - Le da el rol especificado a solo los usuarios
            k!role clone @role - Clona el rol especificado
            k!role withrole @role - Te muestra los miembros con ese rol
            k!role @usuario @role - Le da el rol especificado al usuario

            **Ejemplos**

            k!role @NoobLance @coolboy
            k!role withrole @coolboy
            k!role everyone @badboys
            k!role humans @users
            k!role bots @goodboys
            k!role clone @badboys
            `)

            return send(e)
        }
        if(!a.includes(ex.toLowerCase())){
            let u = message.mentions.members.first() || message.guild.members.resolve(args[0])
            let role = message.mentions.roles.first() || message.guild.roles.resolve(args[1])

            if(!message.member.hasPermission('MANAGE_ROLES'))return send(`No tienes permisos de manejar roles`)
            if(!message.guild.me.hasPermission('MANAGE_ROLES'))return send(`No tengo permisos`)
            if(!u)return send(`Debes mencionar al menos un usuario`)
            if(!role)return send('Debes mencionar al menos un role')
            if(role.managed)return send(`Ese rol es manejado por un bot, no se lo puedes dar a nadie`)
            if(role.comparePositionTo(message.member.roles.highest) > 0)return send(`Ese rol es mayor que todos los que tienes no lo puedes usar`)
            if(!role.editable)return send(`No le puedo otorgar a nadie ese role`)

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

            if(!message.member.hasPermission('MANAGE_ROLES'))return send(`No tienes permisos de manejar roles`)
            if(!message.guild.me.hasPermission('MANAGE_ROLES'))return send(`No tengo permisos`)
            if(!role)return send(`Debes mencionar un rol o poner su ID`)
            if(role.managed)return send(`Ese rol es manejado por un bot, no se lo puedes dar a nadie`)
            if(role.comparePositionTo(message.member.roles.highest) > 0)return send(`Ese rol es mayor que todos los que tienes no lo puedes usar`)
            if(!role.editable)return send(`No puedo clonar ese role, es mayor que todos mis roles`)

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

            if(message.content.endsWith('--remove')){

                let role = message.mentions.roles.first() || message.guild.roles.resolve(args[1])

                if(!message.member.hasPermission('MANAGE_ROLES'))return send(`No tienes permisos de manejar roles`)
                if(!message.guild.me.hasPermission('MANAGE_ROLES'))return send(`No tengo permisos`)
                if(!role)return send(`Debes mencionar un rol o poner su ID`)
                if(role.managed)return send(`Ese rol es manejado por un bot, no se lo puedes remover a nadie`)
                if(role.comparePositionTo(message.member.roles.highest) > 0)return send(`Ese rol es mayor que todos los que tienes no lo puedes usar`)
                if(!role.editable)return send(`No le puedo otorgar a nadie ese role`)

                let timenow = Date.now()
                let totalh = message.guild.members.cache.filter((m) => !m.user.bot).array()
    
                const e = new MessageEmbed()
                .setColor('RED')
                .setDescription(`
                Removiendo roles... <a:loadingoogle:744334507242422302>
                0/${totalh.length}
                
                Espere porfavor...`)
                .setFooter(`Este proceso puede tardar un poco depende de la cantidad de miembros`)
    
                let msg = await send(e)
    
                for(let i = 0, k = 2; i < totalh.length; i++){
    
                    if(i === k){
                        if(i !== totalh.length){
                            const a = new MessageEmbed()
                            .setColor('RED')
                            .setDescription(`Removiendo roles... <a:loadingoogle:744334507242422302>\n${i}/${totalh.length}\n\nEspere porfavor...`)
                            .setFooter(`Este proceso puede tardar un poco depende de la cantidad de miembros`)
                            await msg.edit({embed: a})
                        }
                        k += 2
                    }else if(i === totalh.length - 1){
                        let timefin = (Date.now() - timenow)
                        const w = new MessageEmbed()
                        .setColor('RED')
                        .setDescription(`Roles removidos!\n${i + 1}/${totalh.length}\n\nEl proceso a terminado tiempo total: ${ms(timefin)}`)
                        .setFooter(`Proceso terminado...`)
                        await msg.edit({embed: w})
                    }
    
                    let check = await totalh[i].roles.remove(role).catch(a=>{});
                    if(!check){
                        send(`Ocurrio un error dando los roles a los usuarios`)
                        break;
                    }
                    await Discord.Util.delayFor(2000)
    
                    
                }
                return;
            }else {

                let role = message.mentions.roles.first() || message.guild.roles.resolve(args[1])

                if(!message.member.hasPermission('MANAGE_ROLES'))return send(`No tienes permisos de manejar roles`)
                if(!message.guild.me.hasPermission('MANAGE_ROLES'))return send(`No tengo permisos`)
                if(!role)return send(`Debes mencionar un rol o poner su ID`)
                if(role.managed)return send(`Ese rol es manejado por un bot, no se lo puedes remover a nadie`)
                if(role.comparePositionTo(message.member.roles.highest) > 0)return send(`Ese rol es mayor que todos los que tienes no lo puedes usar`)
                if(!role.editable)return send(`No le puedo remover a nadie ese role`)

                let timenow = Date.now()
                let totalh = message.guild.members.cache.filter((m) => !m.user.bot).array()
    
                const e = new MessageEmbed()
                .setColor('RED')
                .setDescription(`
                Agregando roles... <a:loadingoogle:744334507242422302>
                0/${totalh.length}
                
                Espere porfavor...`)
                .setFooter(`Este proceso puede tardar un poco depende de la cantidad de miembros`)
    
                let msg = await send(e)
    
                for(let i = 0, k = 2; i < totalh.length; i++){
    
                    if(i === totalh.length - 1){
                        let timefin = (Date.now() - timenow)
                        const w = new MessageEmbed()
                        .setColor('RED')
                        .setDescription(`Roles agregados!\n${i + 1}/${totalh.length}\n\nEl proceso a terminado tiempo total: ${ms(timefin)}`)
                        .setFooter(`Proceso terminado...`)
                        await msg.edit({embed: w})
                    } else if(i === k){
                        if(i !== totalh.length){
                            const a = new MessageEmbed()
                            .setColor('RED')
                            .setDescription(`Agregando roles... <a:loadingoogle:744334507242422302>\n${i}/${totalh.length}\n\nEspere porfavor...`)
                            .setFooter(`Este proceso puede tardar un poco depende de la cantidad de miembros`)
                            await msg.edit({embed: a})
                        }
                        k += 2
                    }
    
                    let check = await totalh[i].roles.add(role).catch(a=>{});
                    if(!check){
                        send(`Ocurrio un error dando los roles a los usuarios`)
                        break;
                    }
                    
                    await Discord.Util.delayFor(2000)
    
                    
                }
                return;
            }
        } else if(ex === 'bots'){

            if(message.content.endsWith('--remove')){

                let role = message.mentions.roles.first() || message.guild.roles.resolve(args[1])

                if(!message.member.hasPermission('MANAGE_ROLES'))return send(`No tienes permisos de manejar roles`)
                if(!message.guild.me.hasPermission('MANAGE_ROLES'))return send(`No tengo permisos`)
                if(!role)return send(`Debes mencionar un rol o poner su ID`)
                if(role.managed)return send(`Ese rol es manejado por un bot, no se lo puedes remover a nadie`)
                if(role.comparePositionTo(message.member.roles.highest) > 0)return send(`Ese rol es mayor que todos los que tienes no lo puedes usar`)
                if(!role.editable)return send(`No le puedo otorgar a nadie ese role`)

                let timenow = Date.now()
                let totalh = message.guild.members.cache.filter((m) => m.user.bot).array()
    
                const e = new MessageEmbed()
                .setColor('RED')
                .setDescription(`
                Removiendo roles... <a:loadingoogle:744334507242422302>
                0/${totalh.length}
                
                Espere porfavor...`)
                .setFooter(`Este proceso puede tardar un poco depende de la cantidad de miembros`)
    
                let msg = await send(e)
    
                for(let i = 0, k = 2; i < totalh.length; i++){
    
                    if(i === k){
                        if(i !== totalh.length){
                            const a = new MessageEmbed()
                            .setColor('RED')
                            .setDescription(`Removiendo roles... <a:loadingoogle:744334507242422302>\n${i}/${totalh.length}\n\nEspere porfavor...`)
                            .setFooter(`Este proceso puede tardar un poco depende de la cantidad de miembros`)
                            await msg.edit({embed: a})
                        }
                        k += 2
                    }else if(i === totalh.length - 1){
                        let timefin = (Date.now() - timenow)
                        const w = new MessageEmbed()
                        .setColor('RED')
                        .setDescription(`Roles removidos!\n${i + 1}/${totalh.length}\n\nEl proceso a terminado tiempo total: ${ms(timefin)}`)
                        .setFooter(`Proceso terminado...`)
                        await msg.edit({embed: w})
                    }
    
                    let check = await totalh[i].roles.remove(role).catch(a=>{});
                    if(!check){
                        send(`Ocurrio un error dando los roles a los usuarios`)
                        break;
                    }
                    await Discord.Util.delayFor(2000)
    
                    
                }
                return;
            }else {

                let role = message.mentions.roles.first() || message.guild.roles.resolve(args[1])

                if(!message.member.hasPermission('MANAGE_ROLES'))return send(`No tienes permisos de manejar roles`)
                if(!message.guild.me.hasPermission('MANAGE_ROLES'))return send(`No tengo permisos`)
                if(!role)return send(`Debes mencionar un rol o poner su ID`)
                if(role.managed)return send(`Ese rol es manejado por un bot, no se lo puedes remover a nadie`)
                if(role.comparePositionTo(message.member.roles.highest) > 0)return send(`Ese rol es mayor que todos los que tienes no lo puedes usar`)
                if(!role.editable)return send(`No le puedo remover a nadie ese role`)

                let timenow = Date.now()
                let totalh = message.guild.members.cache.filter((m) => !m.user.bot).array()
    
                const e = new MessageEmbed()
                .setColor('RED')
                .setDescription(`
                Agregando roles... <a:loadingoogle:744334507242422302>
                0/${totalh.length}
                
                Espere porfavor...`)
                .setFooter(`Este proceso puede tardar un poco depende de la cantidad de miembros`)
    
                let msg = await send(e)
    
                for(let i = 0, k = 2; i < totalh.length; i++){
    
                    if(i === totalh.length - 1){
                        let timefin = (Date.now() - timenow)
                        const w = new MessageEmbed()
                        .setColor('RED')
                        .setDescription(`Roles agregados!\n${i + 1}/${totalh.length}\n\nEl proceso a terminado tiempo total: ${ms(timefin)}`)
                        .setFooter(`Proceso terminado...`)
                        await msg.edit({embed: w})
                    } else if(i === k){
                        if(i !== totalh.length){
                            const a = new MessageEmbed()
                            .setColor('RED')
                            .setDescription(`Agregando roles... <a:loadingoogle:744334507242422302>\n${i}/${totalh.length}\n\nEspere porfavor...`)
                            .setFooter(`Este proceso puede tardar un poco depende de la cantidad de miembros`)
                            await msg.edit({embed: a})
                        }
                        k += 2
                    }
    

                    let check = await totalh[i].roles.add(role).catch(a=>{});
                    if(!check){
                        send(`Ocurrio un error dando los roles a los usuarios`)
                        break;
                    }
                    await Discord.Util.delayFor(2000)
    
                    
                }
                return;
            }
        } else if(ex === 'withrole'){

            let role = message.mentions.roles.first() || message.guild.roles.resolve(args[1]) || (message.guild.roles.cache.filter(x => x.name === args[1]).array())[0]

            if(!role)return send(`Debes mencionar un rol o poner su ID o poner su nombre`)
            await message.guild.members.fetch()
            if(role.members.array().length === 0)return send(`No hay miembros con ese rol!`)

            let totalh = []
            let i = 0;

            for(let mem of role.members.array()){
                i++
                totalh.push(`[${i}]. ${mem.user.tag}`)
            }

            const e = new MessageEmbed()
            .setColor('RED')
            .setDescription(`Miembros con el role: ${role.toString()}\n
            \`\`\`\n${totalh.join('\n')}\`\`\``)

            return send(e, {split: {maxLenght: 1024}})

        } else if(ex === 'everyone'){
            
            let role = message.mentions.roles.first() || message.guild.roles.resolve(args[1]) || message.guild.roles.cache.filter(x => x.name === args[1])

            if(!message.member.hasPermission('MANAGE_ROLES'))return send(`No tienes permisos de manejar roles`)
            if(!message.guild.me.hasPermission('MANAGE_ROLES'))return send(`No tengo permisos`)
            if(!role)return send(`Debes mencionar un rol o poner su ID`)
            if(role.managed)return send(`Ese rol es manejado por un bot, no se lo puedes remover a nadie`)
            if(role.comparePositionTo(message.member.roles.highest) > 0)return send(`Ese rol es mayor que todos los que tienes no lo puedes usar`)
            if(!role.editable)return send(`No le puedo remover a nadie ese role`)
            if(role.members.array().size === 0)return send(`No hay miembros con ese rol!`)

            let totalh = (await message.guild.members.fetch()).array()

            if(message.content.endsWith('--remove')){

                const e = new MessageEmbed()
                .setColor('RED')
                .setDescription(`
                Removiendo roles... <a:loadingoogle:744334507242422302>
                0/${totalh.length}
                
                Espere porfavor...`)
                .setFooter(`Este proceso puede tardar un poco depende de la cantidad de miembros`)

                let msg = await send(e)

                for(let i = 0, k = 2; i < totalh.length; i++){
    
                    if(i === totalh.length - 1){
                        let timefin = (Date.now() - timenow)
                        const w = new MessageEmbed()
                        .setColor('RED')
                        .setDescription(`Roles remvoidos!\n${i + 1}/${totalh.length}\n\nEl proceso a terminado tiempo total: ${ms(timefin)}`)
                        .setFooter(`Proceso terminado...`)
                        await msg.edit({embed: w})
                    } else if(i === k){
                        if(i !== totalh.length){
                            const a = new MessageEmbed()
                            .setColor('RED')
                            .setDescription(`Removiendo roles... <a:loadingoogle:744334507242422302>\n${i}/${totalh.length}\n\nEspere porfavor...`)
                            .setFooter(`Este proceso puede tardar un poco depende de la cantidad de miembros`)
                            await msg.edit({embed: a})
                        }
                        k += 2
                    }
    

                    let check = await totalh[i].roles.add(role).catch(a=>{});
                    if(!check){
                        send(`Ocurrio un error removiendo los roles a los usuarios`)
                        break;
                    }
                    await Discord.Util.delayFor(2000)
    
                }
                return;
            }else {

                const e = new MessageEmbed()
                .setColor('RED')
                .setDescription(`
                Agregando roles... <a:loadingoogle:744334507242422302>
                0/${totalh.length}
                
                Espere porfavor...`)
                .setFooter(`Este proceso puede tardar un poco depende de la cantidad de miembros`)
    
                let msg = await send(e)
    
                for(let i = 0, k = 2; i < totalh.length; i++){
    
                    if(i === totalh.length - 1){
                        let timefin = (Date.now() - timenow)
                        const w = new MessageEmbed()
                        .setColor('RED')
                        .setDescription(`Roles agregados!\n${i + 1}/${totalh.length}\n\nEl proceso a terminado tiempo total: ${ms(timefin)}`)
                        .setFooter(`Proceso terminado...`)
                        await msg.edit({embed: w})
                    } else if(i === k){
                        if(i !== totalh.length){
                            const a = new MessageEmbed()
                            .setColor('RED')
                            .setDescription(`Agregando roles... <a:loadingoogle:744334507242422302>\n${i}/${totalh.length}\n\nEspere porfavor...`)
                            .setFooter(`Este proceso puede tardar un poco depende de la cantidad de miembros`)
                            await msg.edit({embed: a})
                        }
                        k += 2
                    }
    

                    let check = await totalh[i].roles.add(role).catch(a=>{});
                    if(!check){
                        send(`Ocurrio un error dando los roles a los usuarios`)
                        break;
                    }
                    await Discord.Util.delayFor(2000)
    
                    
                }
                return;
            }
        }
    }
}

module.exports.help = {
name: 'role',
description: 'Un comando de roles con varios usos',
cooldown: [],
alias: [],
usage: 'k!role @usuario @role - Le da el rol especificado al usuario\n k!role withrole @role - Te muestra los miembros con ese rol\nk!role everyone @role - Le da el rol especificado a todos\nk!role bots @role - Le da el rol especificado a los bots solamente\nk!role humans @role - Le da el rol especificado a solo los usuarios\nk!role clone @role - Clona el rol especificado',
example: 'k!role @NoobLance @coolboy\nk!role withrole @coolboy\nk!role everyone @badboys\nk!role humans @users\nk!role bots @goodboys\nk!role clone @badboys'
}