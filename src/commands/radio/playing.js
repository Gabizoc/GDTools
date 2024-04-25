const Discord = require('discord.js');

module.exports = async (client, interaction, args) => {
    client.embed({
        title: `📻・Radio information`,
        desc: `Tous les infos sur la radio dans ce serveur :`,
        fields: [{
            name: "👤┆Ecouteurs :",
            value: `${interaction.member.voice.channel.members.size} membre écoute la radio`,
            inline: true
        },
        {
            name: "📺┆Vocal :",
            value: `${interaction.member.voice.channel} (${interaction.member.voice.channel.name})`,
            inline: true
        },
        {
            name: "🎶┆Radio :",
            value: `[A modif](https://www.volaille-francaise.fr/wp-content/uploads/2021/05/nouveau-projet-21.jpg)`,
            inline: true
        },
        ],
       type: 'editreply'
    }, interaction)
}

 