const Discord = require('discord.js');
const generator = require('generate-password');

module.exports = async (client, interaction, args) => {

    const password = generator.generate({
        length: 12,
        symbols: true,
        numbers: true
    });

    client.succNormal({ text: `J'ai créé un bon mot de passe, chek tes mp`, type: 'editreply' }, interaction);

    client.succNormal({
        text: `Ton mot de passe :`,
        fields: [
            {
                name: "🔑┇Mot de passe :",
                value: `${password}`,
                inline: true,
            },
            {
                name: "👣┇Longueur :",
                value: `12`,
                inline: true,
            }
        ]
    }, interaction.user)

}

 