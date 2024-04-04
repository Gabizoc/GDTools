const Discord = require('discord.js');

const Schema = require("../../database/models/messages");

module.exports = async (client, interaction, args) => {
    let user = interaction.options.getUser('user');
    let amount = interaction.options.getNumber('amount');

    const perms = await client.checkUserPerms({
        flags: [Discord.PermissionsBitField.Flags.ManageMessages],
        perms: [Discord.PermissionsBitField.Flags.ManageMessages]
    }, interaction)

    if (perms == false) return;

    const data = await Schema.findOne({ Guild: interaction.guild.id, User: user.id });
    if (data) {
        data.Messages -= amount;
        await data.save();
    }
    else {
        return client.errNormal({
            error: `Pas données trouvé pour ${user}`,
            type: 'editreply'
        }, interaction);
    }

    client.succNormal({
        text: `Suppresion de **${amount}** messages de ${user}`,
        fields: [
            {
                name: "💬┆Totals de messages :",
                value: `${data.Messages}`,
                inline: true,
            }
        ],
        type: 'editreply'
    }, interaction);
}

 