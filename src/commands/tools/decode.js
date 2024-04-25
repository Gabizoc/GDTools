const Discord = require('discord.js');

module.exports = async (client, interaction, args) => {

    const code = interaction.options.getString('code');

    if (isNaN(parseInt(code))) return client.errNormal({
        error: `Vous pouvez seulement décodé un code binaire !`,
        type: 'editreply'
    }, interaction);

    let decode = code.split(' ')
        .map(bin => String.fromCharCode(parseInt(bin, 2)))
        .join('');

    client.embed({
        title: `${client.emotes.normal.check}・Succé !`,
        desc: `Voilà ce que ça donne :`,
        fields: [
            {
                name: "📥 - Envoie :",
                value: `\`\`\`${code}\`\`\``,
                inline: false,
            },
            {
                name: "📥 - Sortie :",
                value: `\`\`\`${decode}\`\`\``,
                inline: false,
            },
        ],
        type: 'editreply'
    }, interaction)

}

 