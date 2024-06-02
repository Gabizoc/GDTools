const Discord = require('discord.js');
const moment = require("moment");
require("moment-duration-format");

module.exports = async (client, interaction, args) => {
    const promises = [
        client.shard.broadcastEval(client => client.guilds.cache.size),
        client.shard.broadcastEval(client => client.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0)),
        client.shard.broadcastEval(client => client.channels.cache.size),
        client.shard.broadcastEval(client => client.voice.adapters.size)
    ];
    return Promise.all(promises)
        .then(async results => {
            const totalGuilds = results[0].reduce((acc, guildCount) => acc + guildCount, 0);
            const totalMembers = results[1].reduce((acc, memberCount) => acc + memberCount, 0);
            const totalChannels = results[2].reduce((acc, channelCount) => acc + channelCount, 0);
            const totalVoice = results[3].reduce((acc, voiceCount) => acc + voiceCount, 0);

            const duration = moment.duration(client.uptime).format("\`D\` [jours], \`H\` [heures], \`m\` [minutes], \`s\` [secondes]");

            client.embed({
                title: `ℹ・Information sur le bot`,
                desc: `____________________________`,
                thumbnail: client.user.avatarURL({ size: 1024 }),
                fields: [
                {
                    name: "_____ \n\n│Général",
                    value: `_____`,
                    inline: false,
                },
                {
                    name: "🤖┆Nom du Bot",
                    value: `${client.user.username}`,
                    inline: true,
                },
                {
                    name: "🆔┆ID du bot",
                    value: `${client.user.id}`,
                    inline: true,
                },
                {
                    name: "🔧┆Developer du Bot",
                    value: `<@!826133033069051954> `,
                    inline: true,
                },
                {
                    name: "💻┆Commandes",
                    value: `\`${client.commands.size}\` commandes`,
                    inline: true,
                },
                {
                    name: "🌐┆Serveurs",
                    value: `\`${totalGuilds}\` serveurs`,
                    inline: true,
                },
                {
                    name: "👥┆Membres",
                    value: `\`${totalMembers}\` membres`,
                    inline: true,
                },
                {
                    name: "🔊┆Vocal connecter",
                    value: `\`${totalVoice}\` channels`,
                    inline: true,
                },
                {
                    name: "📺┆Channels",
                    value: `\`${totalChannels}\` channels`,
                    inline: true,
                },
                {
                    name: "📅┆Crée",
                    value: `<t:${Math.round(client.user.createdTimestamp / 1000)}>`,
                    inline: true,
                },

                {
                    name: "_____ \n\n│Systéme",
                    value: `_____`,
                    inline: false,
                },

                {
                    name: "⌛┆Vitesse de l'API:",
                    value: `\`${client.ws.ping}\`ms`,
                    inline: true,
                },
                {
                    name: "🏷┆Version du Bot",
                    value: `\`${require(`${process.cwd()}/package.json`).version}\``,
                    inline: true,
                },
                {
                    name: "🏷┆Version de Node.js",
                    value: `\`${process.version}\``,
                    inline: true,
                },
                {
                    name: "📂┆Version de Discord.js",
                    value: `\`${Discord.version}\``,
                    inline: true,
                },
                {
                    name: "💾┆RAM du Bot",
                    value: `\`${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}\` MB`,
                    inline: true,
                },
                {
                    name: "🔗┆Liens",
                    value: `Ajoute moi : [[ICI]](${client.config.discord.botInvite})`,
                    inline: false,
                }],
                type: 'editreply'
            }, interaction)
        })
}

 
