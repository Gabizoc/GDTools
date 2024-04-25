const discord = require('discord.js');

const ticketChannels = require("../../database/models/ticketChannels");

module.exports = async (client, channel) => {
    let types = {
        0: "Text Channel",
        2: "Vocal",
        4: "Catégorie",
        5: "Channel d'Annonce",
        10: "Nouveau Fil",
        11: "Nouveau Fil Public",
        12: "Fil Privé",
        13: "Conférence",
        14: "Catégorie",
    }
    
    const logsChannel = await client.getLogs(channel.guild.id);
    if (!logsChannel) return;

    client.embed({
        title: `🔧・Channel supprimé`,
        desc: `Un channel a été supprimé :`,
        fields: [
            {
                name: `> Nom :`,
                value: `- ${channel.name}`
            },
            {
                name: `> ID :`,
                value: `- ${channel.id}`
            },
            {
                name: `> Categorie :`,
                value: `- ${channel.parent}`
            },
            {
                name: `> Type :`,
                value: `- ${types[channel.type]}`
            }
        ]
    }, logsChannel).catch(() => { })

    try {
        ticketChannels.findOne({ Guild: channel.guild.id, channelID: channel.id }, async (err, data) => {
            if (data) {
                var remove = await ticketChannels.deleteOne({ Guild: channel.guild.id, channelID: channel.id });
            }
        })
    }
    catch { }
};