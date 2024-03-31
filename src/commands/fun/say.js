const Discord = require('discord.js');

module.exports = async (client, interaction, args) => {    
    const text = interaction.options.getString('text');

    if (text.length >= 2000) return client.errNormal({ 
        error: "Tu ne peux pas envoyé + de 2000 caractére !", 
        type: 'editreply' 
    }, interaction);

    await interaction.channel.send({ content: client.removeMentions(text) }).then(() => {
        client.succNormal({
            text: `Message bien envoyé !`,
            type: 'ephemeraledit'
        }, interaction)
    })
}

 