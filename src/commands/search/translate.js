const Discord = require('discord.js');
const translate = require('@iamtraction/google-translate');

module.exports = async (client, interaction, args) => {

    const language = interaction.options.getString('language');
    const text = interaction.options.getString('text');

    translate(text, { to: language }).then(res => {
        client.embed({
            title: `${client.emotes.normal.check}・Succès !`,
            desc: `J'ai bien traduit :`,
            fields: [
                {
                    name: "📥 - Texte :",
                    value: `${text}`,
                    inline: false,
                },
                {
                    name: "📤 - Traduction :",
                    value: `${res.text}`,
                    inline: false,
                },
            ],
            type: 'editreply'
        }, interaction);

    }).catch(err => {
        console.log(err)
        client.errNormal({
            error: "Veuillez fournir un code de langue ISO valide !",
            type: 'editreply'
        }, interaction);
    })
}

 