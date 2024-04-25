const Discord = require('discord.js');
const pop = require("popcat-wrapper");

module.exports = async (client, interaction, args) => {

    const name = interaction.options.getString('name');

    const r = await pop.npm(name).catch(e => {
        return client.errNormal({ 
            error: "Package non trouvé",
            type: 'editreply'
        }, interaction)
    });

    client.embed({
        title: `📁・${r.name}`,
        fields: [
            {
                name: "💬┇Nom :",
                value: `${r.name}`,
                inline: true,
            },
            {
                name: "🏷️┇Version :",
                value: `${r.version}`,
                inline: true,
            },
            {
                name: "📃┇Description :",
                value: `${r.description}`,
                inline: true,
            },
            {
                name: "⌨️┇Mot clé :",
                value: `${r.keywords}`,
                inline: true,
            },
            {
                name: "💻┇Autheur ;:",
                value: `${r.author}`,
                inline: true,
            },
            {
                name: "📁┇Téléchargement :",
                value: `${r.downloads_this_year}`,
                inline: true,
            },
            {
                name: "⏰┇Dérniére publication :",
                value: `<t:${Math.round(new Date(r.last_published).getTime() / 1000)}>`,
                inline: true,
            },
        ],
        type: 'editreply'
    }, interaction)
}

 