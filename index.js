// -| Kalion Organizado |- //

const registerStructures = require('./util/Functions/registry')
const Discord = require('discord.js');

// -| Estructuras/Clases Extendidas |- //

require('./util/Functions/index.js')
registerStructures(Discord, "structures");

const bot = new Discord.Client({partials : ['GUILDS', "MESSAGE", "CHANNEL", "REACTION", 'USER'], ws: { intents: 32767} });

const path = require("path")

const Statcord = require("statcord.js");
const statcord = new Statcord.Client({
  client: bot,
  key: "statcord.com-Nh93RmOMRb17s1yznEhD",
});

const postStats = require('./util/Functions/postStats')

const nekosLife = require('nekos.life')

const { Player } = require("discord-player");
const player = new Player(bot);
bot.player = player;

let canal
 
const moment = require('moment')
moment.updateLocale('es', {
  months: 'Enero_Febrero_Marzo_Abril_Mayo_Junio_Julio_Agosto_Septiembre_Octubre_Noviembre_Diciembre'.split('_'),
  monthsShort: 'Enero._Feb._Mar_Abr._May_Jun_Jul._Ago_Sept._Oct._Nov._Dec.'.split('_'),
  weekdays: 'Domingo_Lunes_Martes_Miercoles_Jueves_Viernes_Sabado'.split('_'),
  weekdaysShort: 'Dom._Lun._Mar._Mier._Jue._Vier._Sab.'.split('_'),
  weekdaysMin: 'Do_Lu_Ma_Mi_Ju_Vi_Sa'.split('_')
}
);
moment.locale("es");

const fs = require("fs").promises;
const nfs = require('fs');

const puppeteer = require('puppeteer')

bot.comandos = new Discord.Collection();
bot.devcomandos = new Discord.Collection();
bot.config = require('./config.js');

bot.utilconfig = require('./util-config');
bot.emotes = bot.utilconfig.emojis;
bot.colors = bot.utilconfig.colors;

bot.invite = bot.utilconfig.invite;
bot.support = bot.utilconfig.support;

bot.nekos = new nekosLife();

// -| Comandos |- //

(async function handleCommands(dir = "comandos") {
  let files = await fs.readdir(path.join(__dirname, dir));
  for (let file of files) {
      let stat = await fs.lstat(path.join(__dirname, dir, file));
      if (stat.isDirectory()) {
          handleCommands(path.join(dir, file));
      } else {
          if (file.endsWith(".js")) {
              let name = file.slice(0, file.length - 3);
              let properties = require(path.join(__dirname, dir, file));
                bot.comandos.set(name, properties);
          }
      }

  }
})();

// -| Dev Commands |- //

(async function handleCommands(dir = "comandos/devs") {
  let files = await fs.readdir(path.join(__dirname, dir));
  for (let file of files) {
      let stat = await fs.lstat(path.join(__dirname, dir, file));
      if (stat.isDirectory()) {
          handleCommands(path.join(dir, file));
      } else {
          if (file.endsWith(".js")) {
              let name = file.slice(0, file.length - 3);
              let properties = require(path.join(__dirname, dir, file));
                bot.devcomandos.set(name, properties);
          }
      }

  }
})();

// -| Eventos |- //

(async function handleEvents(dir = "eventos") {
  let files = await fs.readdir(path.join(__dirname, dir));
  for (let file of files) {
      let stat = await fs.lstat(path.join(__dirname, dir, file));
      if (stat.isDirectory()) {
          handleEvents(path.join(dir, file));
      } else {
          if (!file.endsWith(".js")) return;
          let eventName = file.substring(0, file.indexOf(".js"));

          try {
            if(eventName === 'message'){
              let event = require(path.join(__dirname, dir, file));
              bot.on(eventName, event.run.bind(null, bot, statcord));
            } else {
              let event = require(path.join(__dirname, dir, file));
              bot.on(eventName, event.run.bind(null, bot));
            }
          } catch (err) {
            console.log(`Hubo un error cargando el evento ${eventName}`)
            console.log(err)
          }
      }


  }
})();

// -| Evento Ready |- //

bot.on("ready", async () => {
  
  canal = bot.channels.cache.get("748546391013457970")
  const browser = await puppeteer.launch({
    headless: true, defaultViewport: {
      width: 1440,
      height: 900
    }, args: ["--disable-gpu", "--no-sandbox", "--disable-setuid-sandbox"]
  });
  global.browser = browser
  
  console.log(`Kalion Ultimate esta en ${bot.guilds.cache.size} servidores.`);
  var OpcionesDeEstados = [
    `Moderando y Jugando con ${bot.users.cache.size} usuarios.`,
    `Usa k-help para ver la ayuda | Estoy en ${bot.guilds.cache.size} servers.`,
    `Mi creador es Vyrek._.XD#5058`
  ];
  let Estado = OpcionesDeEstados[Math.floor(Math.random() * OpcionesDeEstados.length)];

  setInterval(() => {
    bot.user.setPresence({activity: { name: Estado, type: "PLAYING"}, status: 'dnd'})
  }, 60000)

  setInterval(async() => {
    await postStats(bot)
  }, 60000 * 5);

  statcord.autopost();
  
  const snipeModel = require('./database/models/snipes')

  setInterval(async() => {
    await snipeModel.deleteMany()
  }, 10000);

})
const rootdb = require("./database/connect");
rootdb.then(() => console.log("Kalion Ultimate conectado a MongoDB"))

let totL = 0
      
function getLines(ruta){
    const files = nfs.readdirSync(ruta, { withFileTypes: true})

    for(const file of files){
        let rutaArchivo = `./${ruta}/${file.name}`

        if(file.name.endsWith('.js')){
            let cantidad = (nfs.readFileSync(rutaArchivo).toString().split('\n').length)

            totL += cantidad
        }else if(file.isDirectory()){
            if(file.name === 'node_modules' || file.name === 'etc') continue;

            getLines(rutaArchivo)
        }
    }
}      

getLines('./')

bot.allLines = totL;

//- Otros Eventos -//

statcord.on("autopost-start", () => {
  console.log("Autopost de statcord ha sido activado");
});

statcord.on("post", status => {
  if(status)console.log(status)
});

bot.on("error", e => {
  canal.send("Error: \n```"+ e + "```")
  console.log(e)
}
)
bot.on("warn", e => {
 
  canal.send("Warn: \n```"+ e + "```")
  console.log(e)
})


// -| Login |- //

bot.login(bot.config.token)
