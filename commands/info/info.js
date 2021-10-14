const {Command} = require('discord.js-commando');

module.exports = class InfoCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'info',
            group: 'info',
            memberName: 'info',
            description: 'Responde con información sobre el bot.',
        });
    }

    run(message) {
        return message.embed({
            "title": "Informacion",
            "fields": [{
                "name": "Hola! Soy Bypasser.",
                "value": ":wave:"
            }, {
                "name": "¡Encuentro lo que hay detrás de los enlaces, como adf.ly, bit.ly y Linkvertise!",
                "value": ":link:"
            }, {
                "name": "Encuentra cuáles son mis comandos ejecutando",
                "value": "El comando -help"
            },
            {

                "name": "Bypasses:",
                "value": "By EnzooSP#7246"
            }],
            "author": {
                "name": "Bypasser",
                "url": "https://github.com/SP-Network",
                "icon_url": "https://cdn.discordapp.com/attachments/893255403314479114/893482286387957761/bypasser.jpg"
            }
        });
    }
};
