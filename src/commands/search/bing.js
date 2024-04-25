const Discord = require('discord.js');

module.exports = async (client, interaction, args) => {

    let name = encodeURIComponent(interaction.options.getString('name'));
    let link = `https://www.bing.com/search?q=${name}`;

    client.succNormal({
        text: `J'ai trouvé ça pour : \`${name}\``,
        fields: [
            {
                name: `🔗┇Lien :`,
                value: `[Click ici](${link})`,
                inline: true,
            }
        ], type: 'editreply'
    }, interaction);

}

 