const { Collection } = require("discord.js");
const fs = require("fs");
const path = require("path");
const getAllFiles = (d, a = []) => {fs.readdirSync(path.join(__dirname, d)).filter(e => fs.lstatSync(path.join(__dirname, d, e)).isDirectory() || (e.endsWith(".js") || e.endsWith(".cjs"))).forEach(f => fs.lstatSync(path.join(__dirname, d, f)).isDirectory() ? (a = getAllFiles(`${d}/${f}`, a)) : a.push(path.join(__dirname, d, "/", f)));return a;};

function registerStructures(Discord, dir) {
    for (const e of getAllFiles(dir)) {
      const p = path.basename(e, ".js");
      try {
        let run = require(e);
        Discord.Structures.extend(p, run);
      } catch (err) {
        console.error(`Estructura ${p} no funciona: ${err}`);
      }
    }
  }

module.exports = registerStructures;