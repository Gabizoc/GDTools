const Discord = require('discord.js');
const lyricsFinder = require("lyrics-finder");

module.exports = async (client, interaction, args) => {
    let search = "";

        const player = client.player.players.get(interaction.guild.id);

        const channel = interaction.member.voice.channel;
        if (!channel) return client.errNormal({
            error: `<:cross:1220075609493868544> Tu n'es pas dans un vocal !`,
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

        if (!interaction.options.getString('song')) {
            search = player.queue.current.title;
        }
        else {
            search = interaction.options.getString('song');
        }

        let lyrics = "";

        try {
            lyrics = await lyricsFinder(search, "");
            if (!lyrics) lyrics = `<:cross:1220075609493868544> Pas de paroles trouver pour la musique : ${search}`;
        } catch (error) {
            lyrics = `<:cross:1220075609493868544> Pas de paroles trouver pour la musique : ${search}`;
        }

        client.embed({
            title: `${client.emotes.normal.music}・Paroles de ${search}`,
            desc: lyrics,
            type: 'editreply'
        }, interaction)
}

 