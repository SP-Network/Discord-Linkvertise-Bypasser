// npm i
// npm i node-fetch
// npm i discord.js-commando
// npm i dotenv
// npm i path
// npm i discord.js
// npm i fs

require('dotenv').config();

const { CommandoClient } = require('discord.js-commando'),
    client = new CommandoClient({
        commandPrefix: process.env.prefix,
        owner: process.env.owner,
        invite: 'https://discord.gg/'+process.env.invite,
    }),
    path = require('path');
let status = 1;
function statusSwitch() {
    if (status == 1) {
        status = 2;
        client.user.setActivity(`${process.env.prefix}bypass`, {type: "LISTENING"});
    } else if (status == 2) {
        status = 1;
        client.user.setActivity(client.guilds.cache.size + " Servidores", {
            type: "WATCHING"
        });
    }
}

client.once("ready", () => {
    console.log("Ready!");
    statusSwitch()
    setInterval(() => statusSwitch(), 60000)
});

client.on('error', error => {
    console.warn('El bot crasheo debido a ' + error)
});

client.registry
    .registerDefaultTypes()
    .registerDefaultGroups()
    .registerDefaultCommands({
        help: false,
        ping: false
    })
    .registerGroups([
        ['info', 'Informacion del bot.'],
        ['bypass', 'Comando para bypass links.']
    ])
    .registerCommandsIn(path.join(__dirname, 'commands'));

client.login(process.env.token);