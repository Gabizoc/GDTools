const Discord = require('discord.js');
const moment = require('moment');
const momentTimezone = require('moment-timezone');

const Schema = require("../../database/models/stats");

module.exports = async (client, interaction, args) => {
    const time = interaction.options.getString("timezone");

    if (!momentTimezone.tz.zone(time)) return client.errNormal({
        error: `La "timezone" n'est pas valide`,
        type: 'editreply'
    }, interaction)

    const timeNow = moment().tz(time).format("HH:mm (z)");

    var channelName = await client.getTemplate(interaction.guild);
    channelName = channelName.replace(`{emoji}`, "⏰")
    channelName = channelName.replace(`{name}`, `${timeNow}`)

    await interaction.guild.channels.create({
        name: channelName,
        type:  Discord.ChannelType.GuildVoice, permissionOverwrites: [
            {
                deny: [Discord.PermissionsBitField.Flags.Connect],
                id: interaction.guild.id
            },
        ],
    }).then(async (channel) => {
        new Schema({
            Guild: interaction.guild.id,
            TimeZone: time,
            Time: channel.id,
        }).save();

        client.succNormal({
            text: `L'heure à bien été créé !`,
            fields: [
                {
                    name: `📘┆Channel :`,
                    value: `${channel}`
                }
            ],
            type: 'editreply'
        }, interaction);
    })

}

 