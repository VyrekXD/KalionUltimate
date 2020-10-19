const Discord = require('discord.js')
const puppeteer = require('puppeteer');
const used = new Map();

module.exports = {
aliases: ['cloudfarestatus','cstatus','cloudfarest'],
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
      const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
      
      const page = await browser.newPage();
  
      await page.goto('https://www.cloudflarestatus.com/');
  
      const img = await page.screenshot({path: 'example.png'});
  
      
    let mensaje = await message.channel.send({embed: {color: 'RANDOM', description: '<a:loadingoogle:744334507242422302> Cargando...'}})
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
name: 'cloudfare-status',
description: 'Obtiene el status de cloudfare lo que proteje a discord',
cooldown: [1],
alias: ['cloudfarestatus','cstatus','cloudfarest'],
usage: 'cstatus',
example: 'cstatus'
}