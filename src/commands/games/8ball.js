const Discord = require('discord.js');

module.exports = async (client, interaction, args) => {

    const question = interaction.options.getString('question');

    var antwoorden = [
        "Oui !",
        "Malheureusement, ce n'est pas le cas",
        "Vous avez tout à fait raison !",
        "Non, désolé.",
        "Je suis d'accord",
        "Aucune idée !",
        "Je ne suis pas très malin.",
        "Mes sources disent que non !",
        "C'est sûr !",
        "Vous pouvez compter sur elle",
        "Probablement pas",
        "Tout indique qu'il s'agit d'un non",
        "Sans aucun doute",
        "Absolument",
        "Je ne sais pas"
    ];
    var resultaat = Math.floor((Math.random() * antwoorden.length));

    client.embed({
        title: `${client.emotes.normal.ball}・8ball`,
        desc: `Répond à ta question !`,
        fields: [
            {
                name: `💬┆Ta question :`,
                value: `\`\`\`${question}\`\`\``,
                inline: false
            },
            {
                name: `🤖┆Réponse :`,
                value: `\`\`\`${antwoorden[resultaat]}\`\`\``,
                inline: false
            }
        ],
        type: 'editreply'
    }, interaction);
}

 