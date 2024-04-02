const Discord = require('discord.js');
const fetch = require("node-fetch");

module.exports = async (client, interaction, args) => {

    fetch(
        `https://some-random-api.com/img/fox`
    )
        .then((res) => res.json()).catch({})
        .then(async (json) => {
            client.embed({
                title: `🦊・Renard Random`,
                image: json.link,
                type: 'editreply'
            }, interaction)
        }).catch({})
}

 