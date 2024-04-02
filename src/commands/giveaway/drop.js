const Discord = require('discord.js');
const ms = require('ms');

module.exports = async (client, interaction, args) => {
    const gchannel = interaction.options.getChannel('channel');
    const duration = interaction.options.getString('duration');
    const winnerCount = interaction.options.getNumber('winners');
    const prize = interaction.options.getString('prize');

    client.giveawaysManager.start(gchannel, {
        duration: ms(duration),
        prize: `${client.emotes.normal.gift} - ${prize}`,
        lastChance: {
            enabled: true,
            content: `${client.emotes.normal.error} **Dernière chance pour rejoindre !** ${client.emotes.normal.error}`,
            threshold: 5000,
            embedColor: '#FF0000'
        },
        pauseOptions: {
            isPaused: true,
            content: '⚠️ **Ce giveaway est en pause !** ⚠️',
            unPauseAfter: null,
            embedColor: '#FFFF00'
        },
        winnerCount: parseInt(winnerCount),
        hostedBy: interaction.user,
        thumbnail: interaction.guild.iconURL({ dynamic: true, size: 1024 }),
        isDrop: true,
        messages: {
            giveaway: `${client.emotes.normal.party} **Giveaway** ${client.emotes.normal.party}`,
            giveawayEnded: `${client.emotes.normal.party} **Giveaway Fini** ${client.emotes.normal.party}`,
            drawing: `${client.emotes.normal.clock} - Fini dans : **{timestamp}** !`,
            dropMessage: `Soit le premier en appuyant sur 🥳`,
            winMessage: "Félicitation {winners} ! Tu as gagné **{this.prize}** !",
            embedFooter: "Giveaway !",
            embedColor: client.config.colors.normal,
            noWinner: "Giveaway annuler, pas assez de participant. \n",
            hostedBy: `${client.emotes.normal.party} - Lancer par : {this.hostedBy}`,
            winners: `🏆 - Gagnant(s)`,
            endedAt: "Fini dans ::",
            units: {
                seconds: "seconds",
                minutes: "minutes",
                hours: "heures",
                days: "jours",
                pluralS: false
            },
        },

    }).then((gData) => {
        client.succNormal({ 
            text: `Giveaway lancé dans ${gchannel}`,
            type: 'ephemeraledit'
        }, interaction);
    });
}

 