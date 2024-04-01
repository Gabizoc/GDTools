const Discord = require('discord.js');

const Schema = require("../../database/models/guessWord");

module.exports = async (client, interaction, args) => {
    let wordList = client.config.wordList;

    Schema.findOne({ Guild: interaction.guild.id, Channel: interaction.channel.id }, async (err, data) => {
        if (data) {
            try {
                wordList = wordList.split("\n");
                var word = wordList[Math.floor(Math.random() * wordList.length)];
                var shuffled = word.split('').sort(function () { return 0.5 - Math.random() }).join('');

                data.Word = word;
                data.save();

                client.succNormal({ 
                    text: `Mot bien sotter !`,
                    type: 'ephemeral'
                }, interaction);

                return client.embed({ 
                    title: `💬・Trouve le mot !`, 
                    desc: `Met les lettres dans le bon ordre ! \n\n🔀 ${shuffled.toLowerCase()}`,
                }, interaction.channel)
            }
            catch { }
        }
        else {
            client.errNormal({
                error: "Ce n'est pas dans le bon channel !",
                type: 'editreply'
            }, interaction)
        }
    })
}

 