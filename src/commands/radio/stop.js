const Discord = require('discord.js');
const Schema = require("../../database/models/music");

module.exports = async (client, interaction, args) => {
    const webhookClientLogs = new Discord.WebhookClient({
        id: client.webhooks.voiceLogs.id,
        token: client.webhooks.voiceLogs.token,
    });

    let channel = interaction.member.voice ? interaction.member.voice.channel : null;
    if (!channel) return client.errNormal({ error: `The channel does not exist!`, type: 'editreply' }, interaction);

    client.radioStop(channel);

    var remove = await Schema.deleteOne({ Guild: interaction.guild.id });

    client.embed({
        title: `📻・Radio arreté`,
        desc: `La radio s'est bien stopper \nPour la relancer faire \`/radio play\``,
        fields: [{
            name: "👤┆Stoppé par :",
            value: `${interaction.user} (${interaction.user.tag})`,
            inline: true
        },
        {
            name: "📺┆Channel :",
            value: `${channel} (${channel.name})`,
            inline: true
        }
        ],
        type: 'editreply'
    }, interaction)

    let embed = new Discord.EmbedBuilder()
        .setTitle(`📻・Radio arreté`)
        .setDescription(`_______________ \n\nLa radio s'est bien stopper`)
        .addFields(
            { name: "👤┆Stoppé par :", value: `${interaction.user} (${interaction.user.tag})`, inline: true },
            { name: "📺┆Channel :", value: `${channel} (${channel.name})`, inline: true },
            { name: "⚙️┆Serveur :", value: `${interaction.guild.name} (${interaction.guild.id})`, inline: true },
        )
        .setColor(client.config.colors.normal)
        .setTimestamp();
    webhookClientLogs.send({
        username: 'Bot Logs',
        embeds: [embed],
    });
}

 