const Discord = require('discord.js');

const Counting = require("../../database/models/countChannel");
const GTN = require("../../database/models/guessNumber");
const GTW = require("../../database/models/guessWord");
const WordSnake = require("../../database/models/wordsnake");

module.exports = async (client, interaction, args) => {
    const choice = interaction.options.getString('setup');

    if (choice == "counting") {
        interaction.guild.channels.create({
            name: "counting",
            type: Discord.ChannelType.GuildText
        }).then((ch) => {
            client.embed({
                title: `🔢・Compte !`,
                desc: `C'est maintenant qu'il faut compter ! Le premier nombre est **1**`
            }, ch)

            client.createChannelSetup(Counting, ch, interaction)
        })
    }

    if (choice == "gtn") {
        interaction.guild.channels.create({
            name:"guess-the-number",
            type: Discord.ChannelType.GuildText
        }).then((ch) => {
            client.embed({
                title: `🔢・Trouve le nombre !`,
                desc: `Trouve le nombre entre **1** et **10.000** !`
            }, ch)

            client.createChannelSetup(GTN, ch, interaction)
        })
    }

    if (choice == "gtw") {
        interaction.guild.channels.create({
            name: "guess-the-word",
            type: Discord.ChannelType.GuildText
        }).then((ch) => {
            var word = "start";
            var shuffled = word.split('').sort(function () { return 0.5 - Math.random() }).join('');

            client.embed({
                title: `💬・Trouve le mot !`,
                desc: `Remet les lettres dans le bonne ordre`,
                fields: [
                    {
                        name: `🔀┆Mot`,
                        value: `${shuffled.toLowerCase()}`
                    }
                ],
            }, ch)

            client.createChannelSetup(GTW, ch, interaction)
        })
    }

    if (choice == "wordsnake") {
        interaction.guild.channels.create({
            name: "word-snake",
            type: Discord.ChannelType.GuildText
        }).then((ch) => {
            client.createChannelSetup(WordSnake, ch, interaction)
        })
    }
}

