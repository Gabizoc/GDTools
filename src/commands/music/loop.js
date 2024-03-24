const Discord = require('discord.js');

module.exports = async (client, interaction, args) => {
    const player = client.player.players.get(interaction.guild.id);

    const channel = interaction.member.voice.channel;
    if (!channel) return client.errNormal({
        error: `<:cross:1220075609493868544> Tu n'es pas dans un vocal`,
        type: 'editreply'
    }, interaction);

    if (player && (channel.id !== player?.voiceChannel)) return client.errNormal({
        error: `<:cross:1220075609493868544> Vous n'étes pas dans le même vocal`,
        type: 'editreply'
    }, interaction);

    if (!player || !player.queue.current) return client.errNormal({
        error: "<:cross:1220075609493868544> Pas de musique à jouer",
        type: 'editreply'
    }, interaction);

    player.setTrackRepeat(!player.trackRepeat);
    const trackRepeat = player.trackRepeat ? "Activé" : "Désactivé";

    client.succNormal({
        text: `Musique mise en boucle (**${trackRepeat}**)`,
        type: 'editreply'
    }, interaction);
}

 