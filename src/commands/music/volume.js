const Discord = require('discord.js');

module.exports = async (client, interaction, args) => {
    const player = client.player.players.get(interaction.guild.id);

    const channel = interaction.member.voice.channel;
    if (!channel) return client.errNormal({
        error: `Tu n'es pas dans un vocal`,
        type: 'editreply'
    }, interaction);

    if (player && (channel.id !== player?.voiceChannel)) return client.errNormal({
        error: `Vous n'étes pas dans le même channel`,
        type: 'editreply'
    }, interaction);

    if (!player || !player.queue.current) return client.errNormal({
        error: "<:cross:1220075609493868544> Pas de musique à jouer",
        type: 'editreply'
    }, interaction);

    let amount = interaction.options.getNumber('amount');

    if (!amount) return client.simpleEmbed({
        desc: `${client.emotes.normal.volume}┆Le volume est à **${player.volume}%**`,
        type: 'editreply'
    }, interaction);

    if (isNaN(amount) || amount === 'Infinity') return client.errNormal({
        text: `Entrer un vrai nombre !`,
        type: 'editreply'
    }, interaction);

    if (Math.round(parseInt(amount)) < 1 || Math.round(parseInt(amount)) > 1000) return client.errNormal({
        text: "Le volume ne peux pas dépasser 1000%",
        type: 'editreply'
    }, interaction);

    player.setVolume(parseInt(amount))

    client.succNormal({
        text: `Le volume a été mit sur **${amount}%**`,
        type: 'editreply'
    }, interaction);
}

 