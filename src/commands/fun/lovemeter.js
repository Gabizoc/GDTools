
module.exports = async (client, interaction, args) => {

    const user1 = interaction.options.getUser('user1');
    const user2 = interaction.options.getUser('user2');

    if (!user1 || !user2) return client.errUsage({ usage: "lovemeter [user1]", type: 'editreply' }, interaction);

    if (user1 == user2) return client.errNormal({ error: "You cannot give 2 of the same names!", type: 'editreply' }, interaction);

    var result = Math.ceil(Math.random() * 100);

    client.embed({
        title: `${client.emotes.normal.heart}・Calculateur d'amour`,
        desc: "Regardez combien de % vous matcher !",
        fields: [
            {
                name: "Membre 1",
                value: `${user1}`,
                inline: true,
            },
            {
                name: "Membre 2",
                value: `${user2}`,
                inline: true,
            },
            {
                name: "Resultat",
                value: `**${user2}** et **${user2}** match à **${result}%**`,
                inline: false,
            },
        ],
        type: 'editreply'
    }, interaction)
}

     