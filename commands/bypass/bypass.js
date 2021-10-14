const { Message, MessageFlags } = require('discord.js');
const {Command} = require('discord.js-commando'),
    fs = require('fs');
require("dotenv").config();

module.exports = class BypassCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'bypass',
            aliases: ['bp', 'b'],
            group: 'bypass',
            memberName: 'bypass',
            description: 'Encuentra lo que hay detrás del enlace.',
            throttling: {
                usages: 3,
                duration: 45,
            },
            args: [{
                key: 'link',
                prompt: '¿Qué enlace le gustaría bypassear?',
                type: 'string'
            }, ]
        });
    }
    run(msg, {
        link
    }) {
        msg.channel.startTyping();
        const ipLoggers = [
                "viral.over-blog.com",
                "gyazo.in",
                "ps3cfw.com",
                "urlz.fr",
                "webpanel.space",
                "steamcommumity.com",
                "imgur.com.de",
                "fuglekos.com",
                "grabify.link",
                "leancoding.co",
                "stopify.co",
                "freegiftcards.co",
                "joinmy.site",
                "curiouscat.club",
                "catsnthings.fun",
                "catsnthings.com",
                "xn--yutube-iqc.com",
                "gyazo.nl",
                "yip.su",
                "iplogger.com",
                "iplogger.org",
                "iplogger.ru",
                "2no.co",
                "02ip.ru",
                "iplis.ru",
                "iplo.ru",
                "ezstat.ru",
                "whatstheirip.com",
                "hondachat.com",
                "bvog.com",
                "youramonkey.com",
                "pronosparadise.com",
                "freebooter.pro",
                "blasze.com",
                "blasze.tk",
                "ipgrab.org",
                "gyazos.com",
                "discord.kim",
                "goo.gl",
                "zzb.bz",
                "grabify.link"
            ],
            fetch = require('node-fetch');

        let o;

       
        if(msg.channel.type != "dm") { 
            if(!msg.guild.me.hasPermission("ADMINISTRATOR")) {
                return createErrorEmbed("No tengo permisos de ``ADMINISTRADOR``. Esto significa que no puedo ejecutar este comando. ¡Perdón! Por favor, dame el permiso y vuelve a intentarlo.")
            }
            msg.delete({timeout: 50})
        }

        
        function createBypassEmbed(url, bypassedUrl, time) {
            msg.channel.stopTyping()
            msg.author.send({
                embed: {
                    "title": `Este link fue Bypasseado en ${new Date().getTime()-time}ms.`,
                    "color": 1964014,
                    "footer": {
                        "icon_url": "https://cdn.discordapp.com/attachments/893255403314479114/893486319320317982/github.png",
                        "text": `EnzooSP#7246`
                    },
                    "author": {
                        "name": "Bypasser",
                        "url": "https://github.com/SP-Network",
                        "icon_url": "https://cdn.discordapp.com/attachments/893255403314479114/893482286387957761/bypasser.jpg"
                    },
                    "fields": [{
                            "name": "Link Original:",
                            "value": "[" + url.href + "](" + url.href + ")"
                        },
                        {
                            "name": "Bypassed Link:",
                            "value": "[" + bypassedUrl + "](" + bypassedUrl + ")"
                        }
                    ]
                }
            }).catch(err => {
                createErrorEmbed("¡No tienes DM habilitados! No puedo enviarle su enlace bypasseado. Habilite los mensajes directos y continúe.")
            })
            if (msg.channel.type != "dm") msg.embed({ 
                "title": `Link Bypassed!`,
                "color": 1964014,
                "footer": {
                    "icon_url": "https://cdn.discordapp.com/attachments/893255403314479114/893486319320317982/github.png",
                    "text": `EnzooSP#7246`
                },
                "author": {
                    "name": "Bypasser",
                    "url": "https://github.com/SP-Network",
                    "icon_url": "https://cdn.discordapp.com/attachments/893255403314479114/893482286387957761/bypasser.jpg"
                },
                "description": "He enviado el enlace bypasseado a su DM!"
            }).then(m => (m.delete({timeout: 10000})))
        }

        function createErrorEmbed(errorInfo) { 
            msg.channel.stopTyping()
            return msg.embed({
                "title": "ERROR!",
                "description": errorInfo,
                "color": 15158332,
                "footer": {
                    "icon_url": "https://cdn.discordapp.com/attachments/893255403314479114/893486319320317982/github.png",
                    "text": `Entra a nuestro servidor! https://discord.gg/${process.env.invite}`
                },
                "author": {
                    "name": "Bypasser",
                    "url": "https://github.com/SP-Network",
                    "icon_url": "https://cdn.discordapp.com/attachments/893255403314479114/893482286387957761/bypasser.jpg"
                }
            }).then(m => (m.delete({timeout: 10000})))
        }

        function validateUrl(url) { //Esto simplemente validará los enlaces para asegurarse de que sean correctos y seguros.
            try {
                url = url + " "
                let urls = [...new Set(url.split(' '))].filter(Boolean);
                if (urls.length > 3) { // Este código asegura que solo envíe 3 URL. Si no lo hace, devuelve un error.
                    return createErrorEmbed("¡Proporcionó demasiados enlaces! (Limite: 3)");
                }
                urls.forEach(url => {
                    url = new URL(url);
                    if (ipLoggers.includes(url.host)) return createErrorEmbed(`El enlace que has dado (${url.host}) Está registrado como ``IP LOGGER``. Por favor no intente esto.`); //This is what is sent if an IPLogger is sent.
                    bypass(url)
                })
            } catch (e) {
                createErrorEmbed(`El link es invalido.`); 
            }
        }

        function adshrinkit(html, url, timestamp) { //Bypass para AdShrinkIt
            createBypassEmbed(url, html.split('url\\":\\"')[1].split('\\\",')[0].replace(/\\/g, ""), timestamp)
        }

        function rekonise(url, timestamp) { //Bypass Code para Rekonise
            fetch("https://api.rekonise.com/unlocks/"+url.pathname).then(r=>r.json()).then(j=>{
                createBypassEmbed(url, j.url, timestamp)
            })
        }

        function shortconnect(html, url, timestamp) { //Bypass code para ShortConnect
            createBypassEmbed(url, html.split('seconds, <a href="')[1].split('"\>')[0], timestamp)
        }

        function boostink(html, url, timestamp) { //Bypass code para BoostInk
            createBypassEmbed(url, Buffer.from(html.split('version=')[1].split('"')[1], 'base64').toString('ascii'), timestamp)
        }

        function mboost(html, url, timestamp) { //Bypass code para mBoost
            createBypassEmbed(url, html.split('{"pageProps":{"data":{"targeturl":"')[1].split('"')[0], timestamp)
        }

        function adfly(html, url, timestamp) { //Bypass code para AdFly
            let a, m, I = "",
                X = "",
                r = html.split(`var ysmm = `)[1].split('\'')[1]
            for (m = 0; m < r.length; m++) {
                if (m % 2 == 0) {
                    I += r.charAt(m)
                } else {
                    X = r.charAt(m) + X
                }
            }
            r = I + X
            a = r.split("")
            for (m = 0; m < a.length; m++) {
                if (!isNaN(a[m])) {
                    for (var R = m + 1; R < a.length; R++) {
                        if (!isNaN(a[R])) {
                            let S = a[m] ^ a[R]
                            if (S < 10) {
                                a[m] = S
                            }
                            m = R
                            R = a.length
                        }
                    }
                }
            }
            r = a.join('')
            r = Buffer.from(r, 'base64').toString('ascii');
            r = r.substring(r.length - (r.length - 16));
            r = r.substring(0, r.length - 16);
            if (new URL(r).search.includes("dest=")) {
                if(r.includes("linkvertise.com")){
                    linkvertise(new URL(decodeURIComponent(r.split('dest=')[1])));
                }
                return createBypassEmbed(url, decodeURIComponent(r.split('dest=')[1]), timestamp, msg)
            }
            if(r.includes("linkvertise.com")){
                linkvertise(new URL(r));
            }
            createBypassEmbed(url, r, timestamp, msg)
        }
        
        function s2u(url, html, timestamp) { //Bypass code for Sub2Unlock
            createBypassEmbed(url, html.split('<div id="theGetLink" style="display: none">')[1].split('</div>')[0], timestamp)
        }

        function linkvertise(url) { //Bypass code for Linkvertise
            let ping = new Date().getTime(),
                path = `/${url.pathname.replace('/download','').split('/')[1]}/${url.pathname.replace('/download','').split('/')[2]}`;
            fetch('https://publisher.linkvertise.com/api/v1/redirect/link/static' + path, {
                method: "GET",
                headers: {
                    "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.1 Mobile/15E148 Safari/604.1"
                },
            }).then(r => r.json().catch(() => createErrorEmbed('Linkvertise tiene límite de velocidad o el enlace proporcionado no es válido. Pruebe con otro y, si vuelve a suceder, póngase en contacto con el desarrollador del bot.'))).then(json => {
                if (json._idleTimeout) return;
                o = Buffer.from(JSON.stringify({
                    "timestamp": new Date().getTime(),
                    "random": "6548307",
                    "link_id": json.data.link.id
                }), 'utf-8').toString('base64');
            }).then(() => {
                if (!o) return;
                try {
                fetch('https://publisher.linkvertise.com/api/v1/redirect/link' + path + '/target?serial=' + o, {
                    method: "post",
                    headers: {
                        "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.1 Mobile/15E148 Safari/604.1"
                    },
                }).then(r => r.json()).then(json => {
                    if (json._idleTimeout) return msg.channel.send("Un ``error`` ha ocurrido. Por favor, inténtelo de nuevo más tarde.").msg.delete({timeout: 5000});
                    let bypassedLink = json.data.target;
                    createBypassEmbed(url, bypassedLink, ping)
                    msg.channel.stopTyping()
                })
                }catch(e) {
                    console.log(e)
                }
            })
        }

        async function bypass(url) { 
            try {
                if (!msg.channel.type === 'dm') msg.delete().catch(() => {
                    createErrorEmbed('Por favor, dame el permiso ``Administrar mensajes`` para que pueda eliminar mis mensajes de omisión.', originalCommand)
                });
                let timestamp = new Date().getTime(),
                    resp = await fetch(url.href),
                    html = await resp.text();
                if (url.hostname.includes("mboost.me")) return mboost(html, new URL(resp.url), timestamp);
                if (html.includes('<title>Create Free Social Unlocks - Rekonise</title>')) return rekonise(url, timestamp)
                if (html.includes('<title>shorten and protect links</title>')) return shortconnect(html, url, timestamp)
                if (html.includes('<meta name="description" content="Shrink your URLs and get paid!" />')) return adfly(html, new URL(resp.url), timestamp)
                if (html.includes(' - Sub2Unlock - ')) return s2u(new URL(resp.url), html, timestamp);
                if (html.includes('<title>Boost.ink - Complete the steps to proceed</title>')) return boostink(html, new URL(resp.url), timestamp);
                if (html.includes('<title>AdShrink.it - </title>')) return adshrinkit(html, new URL(resp.url), timestamp);
                if (html.includes('<title>Loading... | Linkvertise</title>')) {
                    if (url.href.includes("dynamic")) {
                        return createBypassEmbed(url, Buffer.from(new URLSearchParams(url.search).get("r"), 'base64').toString('ascii'), timestamp);
                    }
                    linkvertise(new URL(resp.url));
                } else {
                    if (url.href == new URL(resp.url)) return createErrorEmbed('El enlace que proporcionaste no es válido. Por favor revise su enlace y vuelva a intentarlo.')
                    createBypassEmbed(url, resp.url, timestamp)
                }
            } catch (err) {
                createErrorEmbed(`El enlace (${url.href}) es invalido.`)
            }
        }
        validateUrl(link)
}
};
