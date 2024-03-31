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
                desc: `I have ${result}, You win!`,
                type: 'editreply'
            }, interaction);

            if (result == "pierre") return client.embed({
                title: `${client.emotes.normal.papier}・Pierre, Papier, Ciseau`,
                desc: `I have ${result}, It's a draw!`,
                type: 'editreply'
            }, interaction);
            break;

        case "papier":
            if (result == "papier") return client.embed({
                title: `${client.emotes.normal.papier}・Pierre, Papier, Ciseau`,
                desc: `I have ${result}, It's a draw!`,
                type: 'editreply'
            }, interaction);

            if (result == "ciseau") return client.embed({
                title: `${client.emotes.normal.papier}・Pierre, Papier, Ciseau`,
                desc: `I have ${result}, I win!`,
                type: 'editreply'
            }, interaction);

            if (result == "pierre") return client.embed({
                title: `${client.emotes.normal.papier}・Pierre, Papier, Ciseau`,
                desc: `I have ${result}, You win!`,
                type: 'editreply'
            }, interaction);
            break;

        case "ciseau":
            if (result == "papier") return client.embed({
                title: `${client.emotes.normal.papier}・Pierre, Papier, Ciseau`,
                desc: `I have ${result}, You win!`,
                type: 'editreply'
            }, interaction);

            if (result == "ciseau") return client.embed({
                title: `${client.emotes.normal.papier}・Pierre, Papier, Ciseau`,
                desc: `I have ${result}, It's a draw!`,
                type: 'editreply'
            }, interaction);

            if (result == "pierre") return client.embed({
                title: `${client.emotes.normal.papier}・Pierre, Papier, Ciseau`,
                desc: `I have ${result}, I win!`,
                type: 'editreply'
            }, interaction);
            break;
    }
}

 