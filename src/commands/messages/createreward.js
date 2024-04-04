const Discord = require('discord.js');

const Schema = require("../../database/models/messageRewards");

module.exports = async (client, interaction, args) => {
    let messages = interaction.options.getNumber('amount');
    let role = interaction.options.getRole('role');

    const perms = await client.checkUserPerms({
        flags: [Discord.PermissionsBitField.Flags.ManageMessages],
        perms: [Discord.PermissionsBitField.Flags.ManageMessages]
    }, interaction)

    if (perms == false) return;
    
    Schema.findOne({ Guild: interaction.guild.id, Messages: messages }, async (err, data) => {
        if (data) {
            return client.errNormal({ 
                error: "Ce palier de message a déjà une récompense !",
                type: 'editreply'
            }, interaction);
        }
        else {
            new Schema({
                Guild: interaction.guild.id,
                Messages: messages,
                Role: role.id
            }).save();

            client.succNormal({ 
                text: `Récompense de message ajouté !`,
                fields: [
                    {
                        name: "📘┆Rôle :",
                        value: `${role}`,
                        inline: true,
                    }
                ],
                type: 'editreply'
            }, interaction);
        }
    })
}

 