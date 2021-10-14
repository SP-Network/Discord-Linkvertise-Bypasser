const {Command} = require('discord.js-commando');

module.exports = class InviteCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'invite',
            group: 'info',
            memberName: 'invite',
            description: 'Responde con la invitación del bot.',
        });
    }

    run(message) {
        return message.embed({
            "title": "Invite",
            "description": "[Invitame!](https://discord.com/api/oauth2/authorize?client_id=893481649352880198&permissions=8&scope=bot)",
            "author": {
                "name": "Bypasser",
                "url": "https://github.com/SP-Network",
                "icon_url": "https://cdn.discordapp.com/attachments/893255403314479114/893482286387957761/bypasser.jpg"
            }
        });
    }
};