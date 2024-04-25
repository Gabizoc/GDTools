const Discord = require('discord.js');
const fetch = require("node-fetch");

module.exports = async (client, interaction, args) => {

    const ip = interaction.options.getString('ip');

    if (ip == null) return client.errUsage({ usage: "Statut du serveur minecraft : [ip]", type: 'editreply' }, interaction)

    fetch(`https://api.mcsrvstat.us/2/${ip}`)
        .then((res) => res.json()).catch({})
        .then(async (json) => {

            if (!json.players) return client.errNormal({ error: "Impossible de trouvé le serveur", type: 'editreply' }, interaction)

            return client.embed({
                title: `📁・${ip}`,
                thumbnail: `https://eu.mc-api.net/v3/server/favicon/${ip}`,
                fields: [{
                    name: "En ligne :",
                    value: `${json.online}`,
                    inline: true,
                },
                {
                    name: "🏷️┇Version :",
                    value: `${json.version}`,
                    inline: true,
                },
                {
                    name: "👤┇Joueurs en ligne :",
                    value: `${json.players.online}/${json.players.max}`,
                    inline: true,
                },
                ], type: 'editreply'
            }, interaction)
        }).catch({})
}

 