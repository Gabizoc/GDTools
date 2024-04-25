const Discord = require('discord.js');
const pop = require("popcat-wrapper");

module.exports = async (client, interaction, args) => {

    let name = interaction.options.getString('name');

    const r = await pop.github(name).catch(() => {
        return client.errNormal({
            error: `Impossible de trouvé un compte comme nom : ${name}`,
            type: 'editreply'
        }, interaction)
    
    })

    client.embed({
        title: `🏷️・${r.name}`,
        thumbnail: r.avatar,
        url: r.url,
        fields: [
            {
                name: "💬┇Nom :",
                value: `${r.name}`,
                inline: true,
            },
            {
                name: "🧑‍💼┇Groupe :",
                value: `${r.company}`,
                inline: true,
            },
            {
                name: "💬┇Bio :",
                value: `${r.bio}`,
                inline: true,
            },
            {
                name: "📁┇Reposites :",
                value: `${r.public_repos}`,
                inline: true,
            },
            {
                name: "⏰┇Créer le :",
                value: `<t:${Math.round(new Date(r.created_at).getTime() / 1000)}>`,
                inline: true,
            },
        ], type: 'editreply'
    }, interaction)
}

 