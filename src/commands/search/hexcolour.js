const Discord = require('discord.js');
const axios = require('axios');

module.exports = async (client, interaction, args) => {

    const color = interaction.options.getString('color');

    const { data } = await axios.get(
        `https://some-random-api.com/canvas/rgb?hex=${color}`
    ).catch(e => {
        return client.errNormal({ 
            error: "Coleur introuvable",
            type: 'editreply'
        }, interaction)
    });

    client.embed({
        title: `🎨・Color info`,
        image: `https://some-random-api.com/canvas/colorviewer?hex=${color}`,
        color: `#${color}`,
        fields: [
            {
                name: "Hex code :",
                value: `#${color}`,
                inline: true,
            },
            {
                name: "RGB code :",
                value: `${data.r}, ${data.g}, ${data.b}`,
                inline: true,
            }
        ],
        type: 'editreply'
    }, interaction)
}

 