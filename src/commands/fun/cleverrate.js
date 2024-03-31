
module.exports = async (client, interaction, args) => {

    var result = Math.ceil(Math.random() * 100);

    client.embed({
        title: `💡・Inteligence`,
        desc: `Tu es ${result}% % inteligent`,
        type: 'editreply'
    }, interaction)
}

 