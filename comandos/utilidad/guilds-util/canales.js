const { Util } = require("discord.js");
const used = new Map();

module.exports = {
  permisos: ['VIEW_CHANNEL','SEND_MESSAGES','EMBED_LINKS'],
  guildOnly: true,
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
      if(!message.guild) return message.channel.send("El unico canal que puedo ver es este (ツ)_/¯")

   
      let text = "";
      
    
      let member =
        message.mentions.members.first() ||
        message.guild.members.cache.get(args[1]) ||
        message.guild.members.cache.find(m => m.nickname === args.slice(1).join(" ")) ||
        message.guild.members.cache.find(m => m.user.tag === args.slice(1).join(" ")) ||
        message.guild.members.cache.find(m => m.user.username === args.slice(1).join(" "));
      
      let col;
      if(member) {
        
        col = message.guild.channels.cache.filter(c => c.type === "category" ? (c.children.some(r => r.permissionsFor(member).has("VIEW_CHANNEL"))) : (c.permissionsFor(member).has("VIEW_CHANNEL")));
  
      } else {
      
        if(args[1]) member = await message.guild.members.fetch(args[1]).catch(err => {});
       
        if(member) col = message.guild.channels.cache.filter(c => c.type === "category" ? (c.children.some(r => r.permissionsFor(member).has("VIEW_CHANNEL"))) : (c.permissionsFor(member).has("VIEW_CHANNEL")));
  
        //Fallback a todos los canales del servidor
        else col = message.guild.channels.cache;
      }
  
      const wocat = Util.discordSort(col.filter(c => !c.parent && c.type !== "category"))
      const textnp = wocat.filter(c => ['text', 'store', 'news'].includes(c.type));
      const voicenp = wocat.filter(c => c.type === "voice");
      
      if(wocat.size >= 1) {
       
        text += textnp.map(advancedmap).join("\n");
        text += voicenp.map(advancedmap).join("\n");
      };
  
   
      let cats = Util.discordSort(col.filter(c => c.type === "category"));
      cats.each(c => {
       
        const children = c.children.intersect(col);
  
        //Separar....
        const textp = children.filter(c => ['text', 'store', 'news'].includes(c.type));
        const voicep = children.filter(c => c.type === "voice");
        
        text += "\n[📂] " + c.name;
        text += textp.size ? ("\n\t" + Util.discordSort(textp).map(advancedmap).join("\n\t")) : ""
        text += voicep.size ? ("\n\t" + Util.discordSort(voicep).map(advancedmap).join("\n\t")) : ""
      })
     
      const split = Util.splitMessage(text)
  
      
      for (let i in split) {
        await message.channel.send("\nEstructura de canales " + message.guild.name + (member ? (" para " + member.user.tag) : ""), { code: split[i] })
      }
      
          used.set(message.author.id, Date.now() + milisegFromSeconds(3));
          setTimeout(()=> used.delete(message.author.id), milisegFromSeconds(3));
        }
  }
}


function advancedmap(c) {
        
        let r = "";
        
        switch(c.type) {
          case "news":
            r += "[📰] " + c.name;
            break;
          case "text":
            r += "[📃] " + c.name;
            break;
          case "voice":
            r += "[🎤] " + c.name + (c.members.size ? (c.members.map(d => {
              if(d.user.bot) {
                return "\n\t\t[🙎] " + d.user.tag;
              } else {
                return "\n\t\t[🤖] " + d.user.tag;
              }
            })).join("") : "")
            break;
          case "store":
            r += "[🏪] " + c.name;
            break;
          default:
           
            r += "[?] " + c.name;
            break;
        }
        
        return r;
}