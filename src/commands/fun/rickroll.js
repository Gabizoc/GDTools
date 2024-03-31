const Discord = require('discord.js');

module.exports = async (client, interaction, args) => {

        client.embed({
            title: `😂・Never gonna give you up ...`,
            image: `https://i.pinimg.com/originals/88/82/bc/8882bcf327896ab79fb97e85ae63a002.gif`,
            type: 'editreply',
        }, interaction);
}

 