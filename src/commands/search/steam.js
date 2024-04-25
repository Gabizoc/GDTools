const Discord = require('discord.js');
const pop = require("popcat-wrapper");

module.exports = async (client, interaction, args) => {
    await interaction.deferReply({ fetchReply: true });

    const name = interaction.options.getString('name');

    const s = await pop.steam(name).catch(e => {
        return client.errNormal({
            error: "Application non trouvé !",
            type: 'editreply'
        }, interaction)
    });

    await client.embed({
        title: `🎮・${s.name}`,
        thumbnail: s.thumbnail,
        fields: [
            {
                name: `💬┇Nom :`,
                value: `${s.name}`,
                inline: true,
            },
            {
                name: `📃┇Capital :`,
                value: `${s.description}`,
                inline: false,
            },
            {
                name: "💻┇Developeurs :",
                value: `${s.developers.join(", ")}`,
                inline: true,
            },
            {
                name: "☁┇Publisher :",
                value: `${s.publishers.join(", ")}`,
                inline: true,
            },
            {
                name: "🪙┇Prix :",
                value: `${s.price}`,
                inline: true,
            }
        ],
        type: 'editreply'
    }, interaction)
}

 