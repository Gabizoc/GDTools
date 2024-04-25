const Discord = require('discord.js');

module.exports = async (client, interaction, args) => {

    let name = encodeURIComponent(interaction.options.getString('name'));
    let link = `https://www.youtube.com/results?search_query=${name}`;

    client.succNormal({
        text: `J'ai trouvé ça : \`${name}\``,
        fields: [
            {
                name: `🔗┇Lien :`,
                value: `[Click ici](${link})`,
                inline: true,
            }
        ], type: 'editreply'
    }, interaction);

}

 