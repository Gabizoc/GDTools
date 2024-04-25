const Discord = require('discord.js');

module.exports = async (client, interaction, args) => {

    const text = interaction.options.getString('text');

    let encode = text.split("").map(x => x.charCodeAt(0).toString(2)).join(" ");

    client.embed({
        title: `${client.emotes.normal.check}・Succés !`,
        desc: `Voilà ce que ça donne :`,
        fields: [
            {
                name: "📥┇Envoie :",
                value: `\`\`\`${text}\`\`\``,
                inline: false,
            },
            {
                name: "📤┇Sortie :",
                value: `\`\`\`${encode}\`\`\``,
                inline: false,
            },
        ],
        type: 'editreply'
    }, interaction)

}

 