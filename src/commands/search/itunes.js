const Discord = require('discord.js');
const pop = require("popcat-wrapper");

module.exports = async (client, interaction, args) => {

    const song = interaction.options.getString('song');

    const r = await pop.itunes(song).catch(e => {
        return client.errNormal({ 
            error: "Musique introuvable",
            type: 'editreply'
        }, interaction)
    });

    client.embed({
        title: `🎶・${r.name}`,
        thumbnail: r.thumbnail,
        url: r.url,
        fields: [
            {
                name: "💬┇Nom :",
                value: `${r.name}`,
                inline: true,
            },
            {
                name: "🎤┇Artiste :",
                value: `${r.artist}`,
                inline: true,
            },
            {
                name: "📁┇Album :",
                value: `${r.album}`,
                inline: true,
            },
            {
                name: "🎼┇Durée :",
                value: `${r.length}`,
                inline: true,
            },
            {
                name: "🏷️┇Genre :",
                value: `${r.genre}`,
                inline: true,
            },
            {
                name: "💵┇Prix :",
                value: `${r.price}`,
                inline: true,
            },
            {
                name: "⏰┇Date :",
                value: `<t:${Math.round(new Date(r.release_date).getTime() / 1000)}>`,
                inline: true,
            },
        ],
        type: 'editreply'
    }, interaction)
}

 