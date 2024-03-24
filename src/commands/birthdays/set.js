const Discord = require('discord.js');

const Schema = require("../../database/models/birthday");

module.exports = async (client, interaction, args) => {
    const months = {
        1: "Janvier",
        2: "Février",
        3: "Mars",
        4: "Avril",
        5: "May",
        6: "Juin",
        7: "Juillet",
        8: "Août",
        9: "Septembre",
        10: "Octobre",
        11: "Novembre",
        12: "Decembre"
    };

    const day = interaction.options.getNumber('day');
    const month = interaction.options.getNumber('month');

    if (!day || day > 31) return client.errNormal({ 
        error: "Mauvais format des jours",
        type: 'editreply'
    }, interaction);

    if (!month || month > 12) return client.errNormal({
        error: "Mauvais format des mois",
        type: 'editreply'
    }, interaction);

    const convertedDay = suffixes(day);
    const convertedMonth = months[month];
    const birthdayString = `${convertedDay} of ${convertedMonth}`;

    Schema.findOne({ Guild: interaction.guild.id, User: interaction.user.id }, async (err, data) => {
        if (data) {
            data.Birthday = birthdayString;
            data.save();
        }
        else {
            new Schema({
                Guild: interaction.guild.id,
                User: interaction.user.id,
                Birthday: birthdayString
            }).save();
        }
    })

    client.succNormal({ 
        text: `Ton aniversaire a bien été enregistré`,
        fields: [
            {
                name: `${client.emotes.normal.birthday}┆Aniversaire`,
                value: `${birthdayString}`
            }
        ],
        type: 'editreply'
    }, interaction);
}

function suffixes(number) {
    const converted = number.toString();

    const lastChar = converted.charAt(converted.length - 1);

    return lastChar == "1" ?
        `${converted}` : lastChar == "2" ?
            `${converted}` : lastChar == '3'
                ? `${converted}` : `${converted}`
}

 