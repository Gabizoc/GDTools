
module.exports = async (client, interaction, args) => {

    const image = interaction.options.getString('image-url');
    const channel = interaction.options.getChannel('channel');

    if (!channel) return client.errNormal({ error: `Channel introuvable`, type: 'editreply' }, interaction)

    client.succNormal({
        text: `Image bien envoyé dans ${channel}`,
        type: 'editreply'
    }, interaction)

    client.simpleEmbed({
        image: `${image}`
    }, channel)
}

 