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

    let count = 0;
    let status;

    if (player.queue.length == 0) {
        status = "Il n'y as plus de musique dans la liste d'attente !";
    }
    else {
        status = player.queue.map((track) => {
            count += 1;
            return (`**[#${count}]**┆${track.title.length >= 45 ? `${track.title.slice(0, 45)}...` : track.title} (Demandé par <@!${track.requester.id}>)`);
        }).join("\n");
    }

    if (player.queue.current.thumbnail) thumbnail = player.queue.current.thumbnail;
    else thumbnail = interaction.guild.iconURL({ size: 1024 });

    client.embed({
        title: `${client.emotes.normal.music}・Liste d'attente - ${interaction.guild.name}`,
        desc: status,
        thumbnail: thumbnail,
        fields: [
            {
                name: `${client.emotes.normal.music} Musique en cours :`,
                value: `${player.queue.current.title} (Démandé par <@!${player.queue.current.requester.id}>)`
            }
        ],
        type: 'editreply'
    }, interaction)
}

 