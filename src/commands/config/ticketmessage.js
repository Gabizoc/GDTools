const Discord = require('discord.js');

const Schema = require("../../database/models/ticketMessage");

module.exports = async (client, interaction, args) => {
    const perms = await client.checkUserPerms({
        flags: [Discord.PermissionsBitField.Flags.ManageMessages],
        perms: [Discord.PermissionsBitField.Flags.ManageMessages]
    }, interaction)

    if (perms == false) return;

    const type = interaction.options.getString('type');
    const message = interaction.options.getString('message');

    if (type == "open") {
        if (message.toUpperCase() == "DEFAULT") {
            const data = await Schema.findOne({ Guild: interaction.guild.id })

            if (data) {
                data.openTicket = "Le support fait son possible pour réponde à votre question le plus vite possible \n\n🔒 - Fermerle  ticket \n✋ - Claim ticket \n📝 - Transcrire \n🔔 - Envoyé une notification";
                data.save();

                client.succNormal({
                    text: `Le message du ticket à été configuré !`,
                    fields: [
                        {
                            name: `📘┆Type de message :`,
                            value: `${type}`,
                            inline: true
                        },
                        {
                            name: `💬┆Message :`,
                            value: `${data.openTicket}`,
                            inline: true
                        },
                    ],
                    type: 'editreply'
                }, interaction)
            }
            else {
                client.errNormal({
                    error: `Pas de message de ticket trouvé !`,
                    type: 'editreply'
                }, interaction)
            }

            return;
        }

        Schema.findOne({ Guild: interaction.guild.id }, async (err, data) => {
            if (data) {
                data.openTicket = message;
                data.save();
            }
            else {
                new Schema({
                    Guild: interaction.guild.id,
                    openTicket: message
                }).save();
            }
        })

        client.succNormal({
            text: `Le message du ticket à été configuré !`,
            fields: [
                {
                    name: `📘┆Type de message :`,
                    value: `${type}`,
                    inline: true
                },
                {
                    name: `💬┆Message :`,
                    value: `${message}`,
                    inline: true
                },
            ],
            type: 'editreply'
        }, interaction)
    }
    else if (type == "close") {
        if (message.toUpperCase() == "DEFAULT") {
            const data = await Schema.findOne({ Guild: interaction.guild.id })

            if (data) {
                data.dmMessage = "Voici la transcription de votre ticket, conservez-la si vous souhaitez !";
                data.save();

                client.succNormal({
                    text: `Le message du ticket à été configuré !`,
                    fields: [
                        {
                            name: `📘┆Type de message :`,
                            value: `${type}`,
                            inline: true
                        },
                        {
                            name: `💬┆Message :`,
                            value: `${data.dmMessage}`,
                            inline: true
                        },
                    ],
                    type: 'editreply'
                }, interaction)
            }
            else {
                client.errNormal({
                    error: `Pas de lessage de ticket trouvé !`,
                    type: 'editreply'
                }, interaction)
            }

            return;
        }

        Schema.findOne({ Guild: interaction.guild.id }, async (err, data) => {
            if (data) {
                data.dmMessage = message;
                data.save();
            }
            else {
                new Schema({
                    Guild: interaction.guild.id,
                    dmMessage: message
                }).save();
            }
        })

        client.succNormal({
            text: `Le message du ticket à été configuré !`,
            fields: [
                {
                    name: `📘┆Type de message :`,
                    value: `${type}`,
                    inline: true
                },
                {
                    name: `💬┆Message`,
                    value: `${message}`,
                    inline: true
                },
            ],
            type: 'editreply'
        }, interaction)
    }
}

 