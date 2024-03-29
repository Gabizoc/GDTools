const Discord = require('discord.js');

const Schema = require("../../database/models/functions");

module.exports = async (client, interaction, args) => {
    const perms = await client.checkUserPerms({
        flags: [Discord.PermissionsBitField.Flags.Administrator],
        perms: [Discord.PermissionsBitField.Flags.Administrator]
    }, interaction)

    if (perms == false) return;

    const rawColor = interaction.options.getString('color');
    let color = "";

    if (rawColor.toUpperCase() == "DEFAULT") {
        color = client.config.colors.normal.replace("#", "");
    }
    else {
        color = rawColor
    }

    if (!isHexColor(color)) return client.errNormal({
        error: "Ce n'est pas le bon format (HEX couleur), Example : ff0000",
        type: 'editreply'
    }, interaction)

    Schema.findOne({ Guild: interaction.guild.id }, async (err, data) => {
        if (data) {
            data.Color = `#${color}`;
            data.save();
        }
        else {
            new Schema({
                Guild: interaction.guild.id,
                Color: `#${color}`
            }).save();
        }
    })

    client.succNormal({
        text: `La couleur de l'embed à bien été change !`,
        fields: [
            {
                name: `🎨┆Nouvel Couleur !`,
                value: `#${color}`,
                inline: true
            },
        ],
        type: 'editreply'
    }, interaction)
}

function isHexColor(hex) {
    return typeof hex === 'string'
        && hex.length === 6
        && !isNaN(Number('0x' + hex))
}

 