const Discord = require('discord.js');

const Functions = require("../../database/models/functions");

module.exports = async (client, guild) => {
    const webhookClient = new Discord.WebhookClient({
        id: client.webhooks.serverLogs.id,
        token: client.webhooks.serverLogs.token,
    });

    if (guild == undefined) return;

    new Functions({
        Guild: guild.id,
        Prefix: client.config.discord.prefix
    }).save();

    try {
        const promises = [
            client.shard.broadcastEval(client => client.guilds.cache.size),
            client.shard.broadcastEval(client => client.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0)),
        ];
        Promise.all(promises)
            .then(async (results) => {
                const totalGuilds = results[0].reduce((acc, guildCount) => acc + guildCount, 0);
                const embed = new Discord.EmbedBuilder()
                    .setTitle("🟢・Ajout sur un nouveau serveur !")
                    .addFields(
                        { name: "Total de serveur :", value: `${totalGuilds}`, inline: true },
                        { name: "Nom du serveur :", value: `${guild.name}`, inline: true },
                        { name: "Id du serveur :", value: `${guild.id}`, inline: true },
                        { name: "Nombre de membre :", value: `${guild.memberCount}`, inline: true },
                        { name: "Propiétaire du serveur :", value: `<@!${guild.ownerId}> (${guild.ownerId})`, inline: true },
                    )
                    .setThumbnail("https://cdn.discordapp.com/attachments/843487478881976381/852419422392156210/BotPartyEmote.png")
                    .setColor(client.config.colors.normal)
                webhookClient.send({
                    username: 'Bot Logs',
                    avatarURL: client.user.avatarURL(),
                    embeds: [embed],
                });
            })

        let defaultChannel = "";
        guild.channels.cache.forEach((channel) => {
            if (channel.type == Discord.ChannelType.GuildText && defaultChannel == "") {
                if (channel.permissionsFor(guild.members.me).has(Discord.PermissionFlagsBits.SendMessages)) {
                    defaultChannel = channel;
                }
            }
        })

        let row = new Discord.ActionRowBuilder()
            .addComponents(
                new Discord.ButtonBuilder()
                    .setLabel("Invite moi !")
                    .setURL(client.config.discord.botInvite)
                    .setStyle(Discord.ButtonStyle.Link),

                new Discord.ButtonBuilder()
                    .setLabel("Serveur Support")
                    .setURL(client.config.discord.serverInvite)
                    .setStyle(Discord.ButtonStyle.Link),
            );

        client.embed({
            title: "Merci de m'avoir invité !",
            image: "https://cdn.discordapp.com/attachments/843487478881976381/874694194474668052/bot_banner_invite.jpg",
            fields: [{
                name: "❓┆Comment me configuré en place ?",
                value: 'Le prefix par default est \`/\` \nPour commencer la configuration : \`/setup\`',
                inline: false,
            },
            {
                name: "☎️┆Tu as besoin d'aide ?",
                value: `Tu peux contacter le support via le serveur : [Serveur Support](${client.config.discord.serverInvite})`,
                inline: false,
            },
            {
                name: "💻┆Les commandes ?",
                value: 'Tu peux voir toutes les commandes en faisant : \`/help\`',
                inline: false,
            },
            {
                name: "📨┆Invite moi !",
                value: `Invite moi en cliquant [ici](${client.config.discord.botInvite})`,
                inline: false,
            },
            ],
            components: [row], 
        }, defaultChannel)
    }
    catch (err) {
        console.log(err);
    }


};