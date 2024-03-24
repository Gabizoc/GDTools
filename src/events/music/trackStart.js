const Discord = require('discord.js');

module.exports = (client, player, track) => {
    let row = new Discord.ActionRowBuilder()
        .addComponents(
            new Discord.ButtonBuilder()
                .setEmoji(client.emotes.music.previous)
                .setCustomId("Bot-musicprev")
                .setStyle(Discord.ButtonStyle.Secondary),

            new Discord.ButtonBuilder()
                .setEmoji(client.emotes.music.pause)
                .setCustomId("Bot-musicpause")
                .setStyle(Discord.ButtonStyle.Secondary),

            new Discord.ButtonBuilder()
                .setEmoji(client.emotes.music.stop)
                .setCustomId("Bot-musicstop")
                .setStyle(Discord.ButtonStyle.Secondary),

            new Discord.ButtonBuilder()
                .setEmoji(client.emotes.music.next)
                .setCustomId("Bot-musicnext")
                .setStyle(Discord.ButtonStyle.Secondary),
        );

    const channel = client.channels.cache.get(player.textChannel);

    client.embed({
        title: `${client.emotes.normal.music}・${track.title}`,
        url: track.uri,
        desc: `Musique démarer dans <#${player.voiceChannel}>!`,
        thumbnail: track.thumbnail,
        fields: [
            {
                name: `<:personne:1220774612531548271>┆Demander par :`,
                value: `${track.requester}`,
                inline: true
            },
            {
                name: `${client.emotes.normal.clock}┆Fini dans :`,
                value: `<t:${((Date.now() / 1000) + (track.duration / 1000)).toFixed(0)}:f>`,
                inline: true
            },
            {
                name: `<:clap:1220774839497789510>┆Auteur :`,
                value: `${track.author}`,
                inline: true
            }
        ],
        components: [row],
    }, channel)
};