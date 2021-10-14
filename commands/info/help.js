const {Command} = require('discord.js-commando');

module.exports = class HelpCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'help',
            group: 'info',
            memberName: 'help',
            description: 'Responde con información sobre los comandos.',
        });
    }

    run(message) {
        return message.embed({
            "title": "Commands",
            "fields": [{
                "name": "help",
                "value": "Muestra el panel de ayuda. Uso: `help`"
            }, {
                "name": "invite",
                "value": "Muestra la invitación al bot. Uso: `invite`"
            }, {
                "name": "bypass",
                "value": "Obtenga lo que hay detrás del enlace. Uso: `bypass link[, link[, link]]`"
            }, {
                "name": "ping",
                "value": "Obtenga el ping para el bot y el bypass de linkvertise. Uso: `ping`"
            }, {
                "name": "info",
                "value": "Obtén información sobre el bot."
            }],
            "author": {
                "name": "Bypasser",
                "url": "https://github.com/SP-Network",
                "icon_url": "https://cdn.discordapp.com/attachments/893255403314479114/893482286387957761/bypasser.jpg"
            }
        });
    }
};