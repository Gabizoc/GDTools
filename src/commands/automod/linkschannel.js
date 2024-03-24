const Discord = require('discord.js');

const Schema = require('../../database/models/channelList');

module.exports = async (client, interaction, args) => {
    const type = interaction.options.getString('type');
    const channel = interaction.options.getChannel('channel');

    if (type == "add") {
        Schema.findOne({ Guild: interaction.guild.id }, async (err, data) => {
            if (data) {
                if (data.Channels.includes(channel.id)) {
                    return client.errNormal({
                        error: `Le channel ${channel} est déja dans la base de donné`,
                        type: 'editreply'
                    }, interaction);
                }

                data.Channels.push(channel.id);
                data.save();
            }
            else {
                new Schema({
                    Guild: interaction.guild.id,
                    Channels: channel.id
                }).save();
            }
        })

        client.succNormal({
            text: `Le  channel est maintenant dans la liste blanche`,
            fields: [
                {
                    name: `📘┆Channel`,
                    value: `${channel} (${channel.name})`
                }
            ],
            type: 'editreply'
        }, interaction);
    }
    else if (type == "remove") {
        Schema.findOne({ Guild: interaction.guild.id }, async (err, data) => {
            if (data) {
                if (!data.Channels.includes(channel.id)) {
                    return client.errNormal({
                        error: `Le channel ${channel} n'est pas dans la base de donné`,
                        type: 'editreply'
                    }, interaction);
                }

                const filtered = data.Channels.filter((target) => target !== channel.id);

                await Schema.findOneAndUpdate({ Guild: interaction.guild.id }, {
                    Guild: interaction.guild.id,
                    Channels: filtered
                });


                client.succNormal({
                    text: `Le channel à bien été suppimer de la liste blanche`,
                    fields: [
                        {
                            name: `📘┆Channel`,
                            value: `${channel} (${channel.name})`
                        }
                    ],
                    type: 'editreply'
                }, interaction);
            }
            else {
                return client.errNormal({
                    error: `Ce serveur n'est pas dans la base de donné !`,
                    type: 'editreply'
                }, interaction);
            }
        })
    }
}

 