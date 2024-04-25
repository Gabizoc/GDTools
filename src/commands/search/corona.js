const Discord = require('discord.js');
const fetch = require('node-fetch');

module.exports = async (client, interaction, args) => {

    let countries = interaction.options.getString('country');

    fetch(`https://covid19.mathdro.id/api/countries/${countries}`)
        .then(response => response.json())
        .then(data => {
            let confirmed = data.confirmed.value.toLocaleString()
            let recovered = data.recovered.value.toLocaleString()
            let deaths = data.deaths.value.toLocaleString()


            return client.embed({
                title: `💉・COVID-19 - ${countries}`,
                fields: [{
                    name: "✅┇Cas confirmé :",
                    value: `${confirmed}`,
                    inline: true,
                },
                {
                    name: "🤗┇Soigné :",
                    value: `${recovered}`,
                    inline: true,
                },
                {
                    name: "💀┇Mort :",
                    value: `${deaths}`,
                    inline: true,
                },
                ], type: 'editreply'
            }, interaction);

        }).catch(e => {
            return client.errNormal({ error: `Pays fourni non valide !`, type: 'editreply' }, interaction);
        })
}

 