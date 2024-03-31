const fetch = require("node-fetch");
const generator = require('generate-password');

module.exports = async (client, interaction, args) => {

    const password = generator.generate({
        length: 10,
        symbols: true,
        numbers: true
    });

    const user = interaction.options.getUser('user');

    if (!user) return client.errUsage({ usage: "hack [mention user]", type: 'editreply' }, interaction)

    function wait(ms) {
        let start = new Date().getTime();
        let end = start;
        while (end < start + ms) {
            end = new Date().getTime();
        }
    }

    client.embed({
        title: '💻・Hacking',
        desc: `Le haking de ${user} à commencé...`,
        type: 'editreply'
    }, interaction).then(msg => {

        wait(140);
        client.embed({
            title: '💻・Hacking',
            desc: `Recheche des informations...`,
            type: 'edit',
        }, msg).then(i => {

            wait(133);
            client.embed({
                title: '💻・Hacking',
                desc: `Recherche de l'ip...`,
                type: 'edit',
            }, msg).then(i => {

                wait(140);
                client.embed({
                    title: '💻・Hacking',
                    desc: `L'ip a été trouvé !`,
                    fields: [
                        {
                            name: '🔗┆Addresse IP',
                            value: `\`\`\`127.0.0.1\`\`\``,
                            inline: true,
                        }
                    ],
                    type: 'edit',
                }, msg).then(i => {

                    wait(60);
                    client.embed({
                        title: '💻・Hacking',
                        desc: `Recherche des logins discord...`,
                        type: 'edit',
                    }, msg).then(i => {

                        wait(230);
                        client.embed({
                            title: '💻・Hacking',
                            desc: `Login discord trouvé !`,
                            fields: [
                                {
                                    name: '📨┆Email :',
                                    value: `\`\`\`${user.username}.tcon@gmail.com\`\`\``
                                },
                                {
                                    name: '🔑┆Mot de passe :',
                                    value: `\`\`\`${password}\`\`\``
                                }
                            ],
                            type: 'edit',
                        }, msg).then(i => {

                            wait(200);
                            client.embed({
                                title: '💻・Hacking',
                                desc: `Recherche du token Discord...`,
                                type: 'edit'
                            }, msg).then(i => {

                                wait(200);
                                fetch(`https://some-random-api.com/bottoken?${user.id}`).then((res) => res.json()).catch({}).then(async (json) => {
                                    client.embed({
                                        title: '💻・Hacking',
                                        desc: `Discord token trouvé !`,
                                        fields: [
                                            {
                                                name: '🔧┆Token :',
                                                value: `\`\`\`${json.token}\`\`\``,
                                                inline: true
                                            }
                                        ],
                                        type: 'edit',
                                    }, msg).then(i => {

                                        wait(140);
                                        client.embed({
                                            title: '💻・Hacking',
                                            desc: `Signalement du compte à Discord pour avoir enfreint les CGU...`,
                                            type: 'edit',
                                        }, msg).then(i => {

                                            wait(180);
                                            client.succNormal({ text: `${user} a bien été hacker ! Informations envoyé en MD`, type: 'edit' }, msg);
                                            client.embed({
                                                title: '😂・Pranked',
                                                image: "https://tenor.com/fr/view/rick-roll-gif-24318291",
                                            }, interaction.user)
                                        })
                                    })
                                }).catch({})
                            })
                        })
                    })
                })
            })
        })
    })

}

 