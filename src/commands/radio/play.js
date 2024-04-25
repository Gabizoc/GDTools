const Discord = require('discord.js');
const Schema = require("../../database/models/music");

module.exports = async (client, interaction, args) => {
    const webhookClientLogs = new Discord.WebhookClient({
        id: client.webhooks.voiceLogs.id,
        token: client.webhooks.voiceLogs.token,
    });

    let channel = interaction.member.voice ? interaction.member.voice.channel : null;
    if (!channel) return client.errNormal({ text: `Ce vocal n'existe pas !`, type: 'editreply' }, interaction);

    client.radioStart(channel);

    Schema.findOne({ Guild: interaction.guild.id }, async (err, data) => {
        if (data) {
            data.Channel = channel.id;
            data.save();
        }
        else {
            new Schema({
                Guild: interaction.guild.id,
                Channel: channel.id,
            }).save();
        }
    })

    client.embed({
        title: `📻・Radio lancé`,
        desc: `La radio a bien été démaré \nPour stopper la radio faire : \`/radio stop\``,
        fields: [{
            name: "👤┆Lancé par :",
            value: `${interaction.user} (${interaction.user.tag})`,
            inline: true
        },
        {
            name: "📺┆Vocal :",
            value: `${channel} (${channel.name})`,
            inline: true
        },
        {
            name: "🎶┆Radio :",
            value: `[A modif](https://test.net)`,
            inline: true
        },
        ],
        type: 'editreply'
    }, interaction)

    let embed = new Discord.EmbedBuilder()
        .setTitle(`📻・Radio lancé`)
        .setDescription(`_______________ \n\nLa radio a bien été lancé`)
        .addFields(
            { name: "👤┆Lancé par :", value: `${interaction.user} (${interaction.user.tag})`, inline: true },
            { name: "📺┆Vocal :", value: `${channel} (${channel.name})`, inline: true },
            { name: "⚙️┆Serveur :", value: `${interaction.guild.name} (${interaction.guild.id})`, inline: true },
        )
        .setColor(client.config.colors.normal)
        .setTimestamp();
    webhookClientLogs.send({
        username: 'Bot Logs',
        embeds: [embed],
    });
}

 