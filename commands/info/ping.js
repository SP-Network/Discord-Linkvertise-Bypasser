const {Command} = require('discord.js-commando');

module.exports = class PingCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'ping',
            group: 'info',
            memberName: 'ping',
            description: 'Responde con el ping de la API de Discord y el ping de bypass de linkvertise.',
        });
    }

    run(message) {
        const fetch = require('node-fetch');
        let o;

        function createErrorEmbed(errorInfo, msg) {
            return msg.embed({
                "title": "ERROR",
                "description": errorInfo,
                "color": 15158332,
                "footer": {
                    "icon_url": "https://cdn.discordapp.com/attachments/893255403314479114/893485277908201482/discord-logo.png",
                    "text": `Entra a nuestro servidor! https://discord.gg/${process.env.invite}`
                },
                "author": {
                    "name": "Bypasser",
                    "url": "https://github.com/SP-Network",
                    "icon_url": "https://cdn.discordapp.com/attachments/893255403314479114/893482286387957761/bypasser.jpg"
                }
            }).then(msg => setTimeout(() => msg.delete(), 5000))
        }

        function ping(msg) {
            let ping = Date.now();
            fetch('https://publisher.linkvertise.com/api/v1/redirect/link/static/180849/respecting', {
                headers: {
                    "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.1 Mobile/15E148 Safari/604.1"
                }
            }).then(r => r.json().catch(() => createErrorEmbed('Linkvertise tiene un límite de velocidad. Póngase en contacto con el desarrollador del bot.', msg))).then(json => {
                    msg.channel.stopTyping();
                    return msg.embed({
                        "title": "Pings",
                        "fields": [{
                            "name": "Discord API",
                            "value": Date.now() - msg.createdTimestamp + " ms"
                        },
                        {
                            "name": "Linkvertise Bypass",
                            "value": Date.now() - ping + " ms"
                        }]
                    })
                })
        }


        message.channel.startTyping();
        ping(message);
        message.channel.stopTyping();
    }
};