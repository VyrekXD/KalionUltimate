function react(message) {
    if (!(message instanceof (require("discord.js")).Message)) return null;
    let cpoint = "\uFE0F\u20E3";
    for (let i = 1; i < 10; i++) {
        message.react(i + cpoint);
    }
    return null;
}

module.exports = { react }

