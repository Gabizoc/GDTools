const Discord = require('discord.js');

module.exports = (client, giveaway, member, reaction) => {
    client.errNormal({
        error: `Ce giveaway est déjà fini ! Tu ne peux plus participé`
    }, member).catch(() => { });
};