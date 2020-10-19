const Discord = require('discord.js');
const shopModel = require('../../../database/models/serverShop')
const ms = require('ms');
const { checkPerms } = require('../../../util/Functions/checkPermissions')
const { milisegFromDays } = require('../../../util/Functions/convertTime')

module.exports = {
aliases: [],
guildOnly: true,
run: async (client, message, args) => {
 
    if(!checkPerms(message.member, `ADMINISTRATOR`))return message.channel.send(`Permisos insuficientes`)

    let nombre = '';
    let descripcion = '';
    let precio;
    let showInInventory;
    let stock = '';
    let tiempo;
    let roleOtorgar;
    let roleRemover;

    let preguntas = [
    '<:one:753971714572025858> Como se llamara el item?\nMinimo 3 caracteres y maximo 50',
    '<:two:753796040942944416> Cual sera la descripcion de el item?\nMinimo 5 caracteres y maximo 150',
    '<:three:753796091807531060> Cual sera el precio de el item?\nMinimo 0 de precio, Si quieres que sea gratis usa `skip`',
    '<:four:753975727791145012> El item se mostrara en tu inventario?\nEscribe `si` o `no`',
    '<:five:753796158354096170> Cuanta cantidad de el item estara disponible? (stock)\nSi quieres que nunca acabe escribe `infinito`',
    '<:six:753796214889381978> Cuanto tiempo estara el item en la tienda?\nEscribe 1d, 3h.... etc, Escribe `infinito` para que nunca acabe',
    '<:seven:753796248691015690> Quieres que cuando se compre el item se otorge un rol?\nMenciona el rol, usa `skip` si no deseas un rol',
    '<:eight:753796279829790752> Quieres que cuando se compre el item se remueva un rol?\nMenciona el rol (No puedes repetir los roles de otorgar y remover), usa `skip` si no deseas un rol',
    ]

    let e = new Discord.MessageEmbed()
    .setColor(`RED`)
    .setFooter(`No debes usar el prefix, Para cancelar en cualquier momento escribe cancel`)
    .setTitle(`**Descripcion De El Item**`)

    let mensaje = await message.channel.send(preguntas[0], e)


    //PRIMER COLECTOR
    let filter = (m) => m.author.id === message.author.id && (m.content.length >= 3 && m.content.length <= 50)
    let collector = message.channel.createMessageCollector(filter, { idle: 120000 });

    collector.on('collect', async (m) => {

            nombre = m.content;
            e.addField(`**Nombre**`, nombre, true)
            await mensaje.edit(preguntas[1], e);
            collector.stop()

            //SEGUNDO COLECTOR
            let filter2 = (m) => m.author.id === message.author.id && (m.content.length >= 5 && m.content.length <= 150)  
            let collector2 = message.channel.createMessageCollector(filter2, { idle: 120000 });
        
            collector2.on('collect', async (m) => {
        
                descripcion = m.content;
                e.addField(`**Descripcion**`, descripcion, true)
                await mensaje.edit(preguntas[2], e);
                collector2.stop()

                //TERCER COLECTOR
                let filter3 = (m) => m.author.id === message.author.id && (!isNaN(m.content) && m.content >= 0 || m.content === 'skip'.toLocaleLowerCase())  
                let collector3 = message.channel.createMessageCollector(filter3, { idle: 120000 });
        
                collector3.on('collect', async (m) => {
        
                    if(m.content === 'skip'.toLocaleLowerCase()){
                        precio = 0
                    } if(!isNaN(m.content)) {
                        precio = parseInt(m.content);
                    }

                    e.addField(`**Precio**`, precio, true)
                    await mensaje.edit(preguntas[3], e);
                    collector3.stop()

                    //CUARTO COLLECTOR 
                    let filter4 = (m) => m.author.id === message.author.id && (m.content === 'si'.toLocaleLowerCase() || m.content === 'no'.toLocaleLowerCase())  
                    let collector4 = message.channel.createMessageCollector(filter4, { idle: 120000 });
        
                    collector4.on('collect', async (m) => {

                        if(m.content === 'si'.toLocaleLowerCase()){
                            showInInventory = true
                        }else if(m.content === 'no'.toLocaleLowerCase()){
                            showInInventory = false
                        }
                        let ai = {
                            true:'Si',
                            false:'No'
                        }

                        e.addField(`**Se Muestra En El Inventario?**`, ai[showInInventory], true)
                        await mensaje.edit(preguntas[4], e);
                        collector4.stop()

                        //QUINTO COLLECTOR 
                        let filter5 = (m) => m.author.id === message.author.id && (!isNaN(m.content) && m.content >= 0 || (m.content === 'infinito'.toLocaleLowerCase()))  
                        let collector5 = message.channel.createMessageCollector(filter5, { idle: 120000 });
        
                        collector5.on('collect', async (m) => {

                            if(m.content === 'infinito'){
                                stock = true
                            }
                            else if(isNaN(m.content)) {
                                stock = m.content;
                            }
                            let a = {
                                true:'Infinito'
                            }

                            e.addField(`**Stock**`, typeof stock === "number" ? stock : a[stock], true)
                            await mensaje.edit(preguntas[5], e);
                            collector5.stop()

                            //SEXTO COLLECTOR 
                            let filter6 = (m) => m.author.id === message.author.id && (!isNaN(ms(m.content)) && ms(m.content) <= 0 && ms(m.content) >= milisegFromDays(12) || (m.content === 'infinito'.toLocaleLowerCase()))  
                            let collector6 = message.channel.createMessageCollector(filter6, { idle: 120000 });
        
                            collector6.on('collect', async (m) => {

                                let tiempofalso

                                if(m.content === 'infinito'){
                                    tiempo = true
                                    tiempofalso = true
                                }else {
                                    tiempo = ms(m.content)
                                    tiempofalso = ms(tiempo)
                                }
                                let a = {
                                    true:'Infinito'
                                }

                                e.addField(`**Duracion**`, typeof tiempo === "number" ? tiempofalso : a[tiempofalso], true)
                                await mensaje.edit(preguntas[6], e);
                                collector6.stop()

                                //SEPTIMO COLECTOR
                                    let filter7 = (m) => m.author.id === message.author.id && (message.guild.roles.resolve(m.content) || (m.content === 'skip'.toLocaleLowerCase()))  
                                    let collector7 = message.channel.createMessageCollector(filter7, { idle: 120000 });
        
                                    collector7.on('collect', async (m) => {

                                    if(m.content === 'skip'){
                                        roleOtorgar = false
                                    }else {
                                        let rolOtorgarColector = message.guild.roles.resolve(m.content);

                                        roleOtorgar = rolOtorgarColector.id
                                    }

                                    if(!m.content === 'skip'){
                                        e.addField(`**Rol A Otorgar**`, rolOtorgarColector, true)
                                    }
                                    await mensaje.edit(preguntas[7], e);
                                    collector7.stop()

                                //OCTAVO COLECTOR
                                let filter8 = (m) => m.author.id === message.author.id && (message.guild.roles.resolve(m.content) || (m.content === 'skip'.toLocaleLowerCase()))  
                                    let collector8 = message.channel.createMessageCollector(filter8, { idle: 120000 });
        
                                    collector8.on('collect', async (m) => {

                                    
                                    if(m.content === 'skip'){
                                        roleRemover = false
                                    }else {
                                        let rolRemoverColector = message.guild.roles.resolve(m.content);
                                        if(rolOtorgarColector.id === roleOtorgar){
                                            return message.channel.send({embed: {color: client.colors.error, description: `El rol que mencionaste para remover no puede ser igual que el que elegiste para otorgar`}})
                                        }
                                        roleRemover = rolRemoverColector.id
                                    }

                                    if(!m.content === 'skip'){
                                        e.addField(`**Rol A Remover**`, rolRemoverColector, true)
                                    }
                                    message.channel.send({embed: {color: client.colors.succes, description: `El item se creo exitosamente`}})
                                    collector8.stop()

                                    let nuevo = new shopModel({
                                        servidor: message.guild.id,
                                        nombre: nombre,
                                        descripcion: descripcion,
                                        precio: parseInt(precio),
                                        stock: parseInt(stock),
                                        showInInventory: showInInventory,
                                        tiempo: tiempo,
                                        roleOtorgar: roleOtorgar,
                                        roleRemover: roleRemover
                                    })
                                
                                    nuevo.save().catch((err) => console.log(err))
                                
                                
                                })
                            })
                        })
                    })
                })
            })
        })
    })
    }
}

module.exports.help = {
name: 'create-item',
description: 'Crea un item para la tienda',
cooldown: [],
alias: [],
usage: '',
example: ''
}