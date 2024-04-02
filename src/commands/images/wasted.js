module.exports = async (client, interaction, args) => {

    let link = `https://some-random-api.com/canvas/wasted/?avatar=${interaction.user.avatarURL({ size: 1024, extension: 'png' })}`

    client.embed({
        title: `🖼・Image Genererateur `,
        image: link,
        type: 'editreply'
    }, interaction)
}

 