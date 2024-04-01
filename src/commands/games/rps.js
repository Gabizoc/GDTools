const Discord = require('discord.js');

module.exports = async (client, interaction, args) => {
    const option = interaction.options.getString("option");

    let options = ["pierre", "papier", "ciseau"];
    const result = options[Math.floor(Math.random() * options.length)];

    switch (option) {
        case "pierre":
            if (result == "papier") return client.embed({
                title: `${client.emotes.normal.papier}・Pierre, Papier, Ciseau`,
                desc: `J'ai ${result}, J'ai gagné !`,
                type: 'editreply'
            }, interaction);

            if (result == "ciseau") return client.embed({
                title: `${client.emotes.normal.papier}・¨Pierre, Papier, Ciseau`,
                desc: `J'ai ${result}, Tu gagnes !`,
                type: 'editreply'
            }, interaction);

            if (result == "pierre") return client.embed({
                title: `${client.emotes.normal.papier}・Pierre, Papier, Ciseau`,
                desc: `J'ai ${result}, Égalité !`,
                type: 'editreply'
            }, interaction);
            break;

        case "papier":
            if (result == "papier") return client.embed({
                title: `${client.emotes.normal.papier}・Pierre, Papier, Ciseau`,
                desc: `J'ai ${result}, Égalité`,
                type: 'editreply'
            }, interaction);

            if (result == "ciseau") return client.embed({
                title: `${client.emotes.normal.papier}・Pierre, Papier, Ciseau`,
                desc: `J'ai ${result}, j'ai gagné !`,
                type: 'editreply'
            }, interaction);

            if (result == "pierre") return client.embed({
                title: `${client.emotes.normal.papier}・Pierre, Papier, Ciseau`,
                desc: `J'ai ${result}, Tu gagne !`,
                type: 'editreply'
            }, interaction);
            break;

        case "ciseau":
            if (result == "papier") return client.embed({
                title: `${client.emotes.normal.papier}・Pierre, Papier, Ciseau`,
                desc: `J'ai ${result}, tu gagnes !`,
                type: 'editreply'
            }, interaction);

            if (result == "ciseau") return client.embed({
                title: `${client.emotes.normal.papier}・Pierre, Papier, Ciseau`,
                desc: `J'ai ${result}, Égalité !`,
                type: 'editreply'
            }, interaction);

            if (result == "pierre") return client.embed({
                title: `${client.emotes.normal.papier}・Pierre, Papier, Ciseau`,
                desc: `J'ai ${result}, j'ai gagné !`,
                type: 'editreply'
            }, interaction);
            break;
    }
}

 