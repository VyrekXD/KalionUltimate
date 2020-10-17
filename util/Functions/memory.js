const OS = require('os');
const maxMemory = OS.totalmem()

function memory(bytes = 0) {
    const gigaBytes = bytes / 1024 ** 3;
    
    if(gigaBytes > 1) {
        return `${gigaBytes.toFixed(1)} GB`;
    }

    const megaBytes = bytes / 1024 ** 2;
    
    if(megaBytes < 10) return `${megaBytes.toFixed(2)} MB`; 
        
    if(megaBytes < 100) return `${megaBytes.toFixed(1)} MB`; 
        
     return `${Math.floor(megaBytes)} MB`;
}

function getMemoryUsage() {
    const free = OS.freemem();

    return {
        max: memory(maxMemory),
        free: memory(free),
        used: memory(maxMemory - free),
        usedByProcess: memory(process.memoryUsage().rss)
    }
}

module.exports = { getMemoryUsage }