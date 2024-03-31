
module.exports = async (client, interaction, args) => {
    var result = Math.ceil(Math.random() * 100);

    client.embed({
        title: `💨・Taux de puanteur`,
        desc: `Tu es ${result}% puant !`,
        type: 'editreply'
    }, interaction)
}

 