const Discord = require('discord.js');
const puppeteer = require('puppeteer');

module.exports = {
permisos: ['VIEW_CHANNEL','SEND_MESSAGES','EMBED_LINKS'],
aliases: ['ss'],
guildOnly: true,
run: async (bot, message, args) => {

    if(!args[0])return message.channel.send('Necesitas ingresar una url!')

    let regex = new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_\+.~#?&\/\/=]*)/)

    if(!args[0].match(regex))return message.channel.send('Necesitas ingresar una url!')
    const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });

    const page = await browser.newPage();
  
    await page.goto(args[0]);
  
    const img = await page.screenshot({path: 'example.png'});

    let mensaje = await message.channel.send({embed: {color: 'RANDOM', description: '<a:loadingoogle:744334507242422302> Cargando...'}})
    setTimeout(() => {
      mensaje.delete()
      const attach = new Discord.MessageAttachment(img)
      message.chanenl.send(`Ping: ${bot.ws.ping}`, attach)
    }, 3 * 1000);
    }
} 

module.exports.help = {
name: 'screenshot',
description: 'Toma una screenshot',
cooldown: [],
alias: ['ss'],
usage: 'screenshot [url]',
example: 'screenshot https://www.google.com'
}