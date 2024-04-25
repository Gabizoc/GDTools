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

    if (player.queue.size === 0) return client.errNormal({
        error: "Il n'y a pas de musique pour la mettre en boucle",
        type: 'editreply'
    }, interaction);

    player.queue.shuffle()

    client.succNormal({
        text: `Liste d'attente a été lancé en aléatoire !`,
        type: 'editreply'
    }, interaction);
}

 