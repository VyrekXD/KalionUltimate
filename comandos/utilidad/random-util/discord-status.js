const Discord = require('discord.js')
const puppeteer = require('puppeteer');
const used = new Map();

module.exports = {
aliases: ['discordstatus','dstatus','discordst'],
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
      const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
      
      const page = await browser.newPage();
  
      await page.goto('https://discordstatus.com/');
  
      const img = await page.screenshot({path: 'example.png'});
  
      setTimeout(async () => {
      
        const attach = new Discord.MessageAttachment(img)
        mensaje.edit(`Ping: ${Date.now() - message.createdAt}`, attach)
      }, 3 * 1000);
      
          used.set(message.author.id, Date.now() + milisegFromSeconds(1));
          setTimeout(()=> used.delete(message.author.id), milisegFromSeconds(1));
        }
        
   
    }
}

module.exports.help = {
name: 'discord-status',
description: 'Obtiene el status de la api de discord y mas',
cooldown: [1],
alias: ['discordstatus','dstatus','discordst'],
usage: 'dstatus',
example: 'dstatus'
}