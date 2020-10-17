const Discord = require('discord.js');
const mineriaModel = require('../../../database/models/mineria')
const { milisegFromMinutes } = require('../../../util/Functions/convertTime')
const used = new Map();

module.exports = {
  permisos: ['VIEW_CHANNEL','SEND_MESSAGES','EMBED_LINKS'],
  run: async(client, message, args) => {

  const Duration = require("humanize-duration");
	if (used.has(message.author.id)) { 
    const cooldown = used.get(message.author.id);          
		 const remaining = Duration(cooldown - Date.now(), { units: ['h','m','s'], language: 'es', conjunction: ' y ', serialComma: false, round: true});
		 return message.channel.send(`Necesitas esperar ${remaining} para volver a usar este comando`).then(async(msg) => {
			  setTimeout(() => {
			  msg.delete();
			}, 5000)
			});  
		 }
		else{
      let usuario = message.author
    let servidor = message.guild;
    let consulta = await mineriaModel.findOne({servidor: servidor.id, usuario: usuario.id})
  
  const embed = new Discord.MessageEmbed()
  .setAuthor(usuario.tag, usuario.displayAvatarURL())
  .setDescription(`Empiezas a minar...`)
  .setColor('f0e8e8')
  .setFooter(`Para ver los minerales que te pueden tocar usa k!minerales`)

  const embed2 = new Discord.MessageEmbed()
  .setAuthor(usuario.tag, usuario.displayAvatarURL())
  .setDescription(`Empiezas a minar...`)
  .setColor('f0e8e8')
  .setFooter(`Sabias que todos los datos curiosos son reales?`)


  let i = ['piedra','piedra','piedra','piedra','piedra','carbon','carbon','carbon','hierro','esmeralda','diamante','zafiro','ruby']
  let c = i[Math.floor(i.length * Math.random())]

  if(c === 'piedra'){
      let ca = Math.floor(Math.random() * 100)
      const embed1 = new Discord.MessageEmbed()
      .setAuthor(usuario.tag, usuario.displayAvatarURL())
      .setDescription(`Encontraste:\n<:piedra:741084392696446976> Piedra: ${ca}`)
      .setColor('6b6969')
      .setFooter(`Dato Curioso: Es piedra -_-`)

      message.channel.send({embed: embed}).then(msg => {
          setTimeout(() => {
              msg.edit({embed: embed2})
            }, 3000)
          setTimeout(() => {
            msg.edit({embed: embed1})
          }, 6000)
        })
        if(consulta){
          await mineriaModel.updateOne({servidor: servidor.id, usuario: usuario.id}, {$inc: {piedra: parseInt(ca)}})
        } else {
          let nuevo = new mineriaModel({servidor: servidor.id, usuario: usuario.id, piedra: parseInt(ca)})
          nuevo.save()
        }
        
  }else 
  if(c === 'carbon'){
      let ca = Math.floor(Math.random() * 75)
      const embed1 = new Discord.MessageEmbed()
      .setAuthor(usuario.tag, usuario.displayAvatarURL())
      .setColor('2b2727')
      .setDescription(`Encontraste:\n<:carbon:741084392444919980> Carbon: ${ca}`)
      .setFooter(`Dato Curioso: Si el carbon se calienta a cierta temperatura se puede crear diamante O.o`)

      message.channel.send({embed: embed}).then(msg => {
          setTimeout(() => {
              msg.edit({embed: embed2})
            }, 3000)
          setTimeout(() => {
            msg.edit({embed: embed1})
          }, 6000)
        })
        if(consulta){
          await mineriaModel.updateOne({servidor: servidor.id, usuario: usuario.id}, {$inc: {carbon: parseInt(ca)}})
        } else {
          let nuevo = new mineriaModel({servidor: servidor.id, usuario: usuario.id, carbon: parseInt(ca)})
          nuevo.save()
        }
        
  }
else if(c === 'hierro'){
    let ca = Math.floor(Math.random() * 80)
    const embed1 = new Discord.MessageEmbed()
    .setAuthor(usuario.tag, usuario.displayAvatarURL())
    .setDescription(`Encontraste:\n<:ironingot:741084392927002755> Hierro: ${ca}`)
    .setColor('6b6969')
    .setFooter(`Dato Curioso: El hierro fue unos de los primeros materiales encontrados`)

    message.channel.send({embed: embed}).then(msg => {
        setTimeout(() => {
            msg.edit({embed: embed2})
          }, 3000)
        setTimeout(() => {
          msg.edit({embed: embed1})
        }, 6000)
      })
      if(consulta){
        await mineriaModel.updateOne({servidor: servidor.id, usuario: usuario.id}, {$inc: {hierro: parseInt(ca)}})
      } else {
        let nuevo = new mineriaModel({servidor: servidor.id, usuario: usuario.id, hierro: parseInt(ca)})
        nuevo.save()
      }
      
}
else if(c === 'diamante'){
      let ca = Math.floor(Math.random() * 40)
      const embed1 = new Discord.MessageEmbed()
      .setAuthor(usuario.tag, usuario.displayAvatarURL())
      .setColor('2287b8')
      .setDescription(`Encontraste:\n<:diamante:741084392667217950> Diamante: ${ca}`)
      .setFooter(`Dato Curioso: Aunque se dice que el diamante es la piedra preciosa mas rara es mentira hay piedras preciosas mas raras y caras`)

      message.channel.send({embed: embed}).then(msg => {
          setTimeout(() => {
              msg.edit({embed: embed2})
            }, 3000)
          setTimeout(() => {
            msg.edit({embed: embed1})
          }, 6000)
        })
        if(consulta){
          await mineriaModel.updateOne({servidor: servidor.id, usuario: usuario.id}, {$inc: {diamante: parseInt(ca)}})
        } else {
          let nuevo = new mineriaModel({servidor: servidor.id, usuario: usuario.id, diamante: parseInt(ca)})
          nuevo.save()
        }
        
  }else
  if(c === 'esmeralda'){
      let ca = Math.floor(Math.random() * 30)
      const embed1 = new Discord.MessageEmbed()
      .setAuthor(usuario.tag, usuario.displayAvatarURL())
      .setColor('28a012')
      .setDescription(`Encontraste:\n<:esmeralda:741084391983415398> Esmeralda: ${ca}`)
      .setFooter(`Dato Curioso: Las esmeraldas son tan raras que se toleran inclusiones`)

      message.channel.send({embed: embed}).then(msg => {
          setTimeout(() => {
              msg.edit({embed: embed2})
            }, 3000)
          setTimeout(() => {
            msg.edit({embed: embed1})
          }, 6000)
        })
        if(consulta){
          await mineriaModel.updateOne({servidor: servidor.id, usuario: usuario.id}, {$inc: {esmeralda: parseInt(ca)}})
        } else {
          let nuevo = new mineriaModel({servidor: servidor.id, usuario: usuario.id, esmeralda: parseInt(ca)})
          nuevo.save()
        }
        
  }else
  if(c === 'zafiro'){
      let can = Math.floor(Math.random() * 3)
      if(can === 2){
          const embedd = new Discord.MessageEmbed()
          .setAuthor(usuario.tag, usuario.displayAvatarURL())
          .setDescription(`Encontraste:\n<:zafiro:741084392449114183> Zafiro, Oh no el zafiro esta dañado D;`)
          .setColor('af1b18')
          .setFooter(`Dato curioso: Si tienes una piedra preciosa pero se te daña el valor disminuye muchisimo o literalmente ya no vale nada`)

          message.channel.send({embed: embed}).then(msg => {
              setTimeout(() => {
                  msg.edit({embed: embed2})
                }, 3000)
              setTimeout(() => {
                msg.edit({embed: embedd})
              }, 000)
            })
      return
      }
      if(can === 0){
        can = 1
      }
      if(can === 1){
      let ca = Math.floor(Math.random() * 7)
      const embed1 = new Discord.MessageEmbed()
      .setAuthor(usuario.tag, usuario.displayAvatarURL())
      .setDescription(`Encontraste:\n<:zafiro:741084392449114183> Zafiro: ${ca}`)
      .setColor('264cc0')
      .setFooter(`Dato Curioso: El zafiro es la segunda piedra con un color y precio mas escepcional de el mundo`)

      message.channel.send({embed: embed}).then(msg => {
          setTimeout(() => {
              msg.edit({embed: embed2})
            }, 3000)
          setTimeout(() => {
            msg.edit({embed: embed1})
          }, 6000)
        })
        if(consulta){
          await mineriaModel.updateOne({servidor: servidor.id, usuario: usuario.id}, {$inc: {zafiro: parseInt(ca)}})
        } else {
          let nuevo = new mineriaModel({servidor: servidor.id, usuario: usuario.id, zafiro: parseInt(ca)})
          nuevo.save()
        }
      }
  }else
  if(c === 'ruby'){
      let can = Math.floor(Math.random() * 2)
      if(can === 2){
          const embedd = new Discord.MessageEmbed()
          .setAuthor(usuario.tag, usuario.displayAvatarURL())
          .setDescription(`Encontraste:\n<:ruby:741084392490795029> Ruby, Oh no el ruby esta dañado D;`)
          .setColor('af1b18')
          .setFooter(`Dato curioso: Si tienes una piedra preciosa pero se te daña el valor disminuye muchisimo o literalmente ya no vale nada`)

          message.channel.send({embed: embed}).then(msg => {
              setTimeout(() => {
                  msg.edit({embed: embed2})
                }, 3000)
              setTimeout(() => {
                msg.edit({embed: embedd})
              }, 000)
            })
      
      }
      if(can === 0){
        can = 1
      }
      if(can === 1){
        let ca = Math.floor(Math.random() * 5)
      const embed1 = new Discord.MessageEmbed()
      .setAuthor(usuario.tag, usuario.displayAvatarURL())
      .setDescription(`Encontraste:\n<:ruby:741084392490795029> Ruby: ${ca}`)
      .setColor('af1b18')
      .setFooter(`Dato curioso: El ruby es la piedra preciosa mas cara y rara de el planeta`)

      message.channel.send({embed: embed}).then(msg => {
          setTimeout(() => {
              msg.edit({embed: embed2})
            }, 3000)
          setTimeout(() => {
            msg.edit({embed: embed1})
          }, 000)
        })
        if(consulta){
          await mineriaModel.updateOne({servidor: servidor.id, usuario: usuario.id}, {$inc: {ruby: parseInt(ca)}})
        } else {
          let nuevo = new mineriaModel({servidor: servidor.id, usuario: usuario.id, ruby: parseInt(ca)})
          nuevo.save()
        }
      }
        
    }
    
    
		  used.set(message.author.id, Date.now() + milisegFromMinutes(30));
		  setTimeout(()=> used.delete(message.author.id), milisegFromMinutes(30));
    }


}
}