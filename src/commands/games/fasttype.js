const Discord = require('discord.js');
const ms = require('ms');

let timeLength = 50000;
module.exports = async (client, interaction, args) => {

    let list = `Parce que nous étions perdus, nous avons dû rebrousser chemin.
    Il fait partie d'un boys band, ce qui n'a pas beaucoup de sens pour un serpent.
    Un canard mort ne vole pas en arrière.
    Ne pisse pas dans mon jardin et dis-moi que tu essaies de faire pousser mes plantes.
    Son cri fit taire les adolescents turbulents.
    Les membres de l’équipe étaient difficiles à distinguer puisqu’ils portaient tous leurs cheveux en queue de cheval.
    J'ai entendu dire que Nancy est très jolie.
    Les colonies nudistes évitent la couture en feuilles de vigne.
    Une chanson peut faire ou gâcher la journée d’une personne si elle se laisse atteindre.
    Elle ne voyait aucune ironie en me demandant de changer mais en voulant que je l'accepte telle qu'elle est.
    Le passe-temps favori de mon oncle était de construire des voitures avec des nouilles.
    Finalement, il réalisa qu’il pouvait voir les sons et entendre les mots.
    Veuillez rechercher une recette de soupe au poulet sur Internet.
    Il n'a pas fallu longtemps à Gary pour comprendre que les voleurs étaient des amateurs.
    Comment as-tu été blessé ?
    Il était évident qu'elle avait chaud, qu'elle était en sueur et fatiguée.
    Il semblait confusément perplexe.
    L'amour n'est pas comme la pizza.
    C'était toujours dangereux de conduire avec lui car il insistait sur le fait que les cônes de sécurité étaient un parcours de slalom.
    Alors qu'il attendait que la douche se réchauffe, il remarqua qu'il pouvait entendre la température de l'eau changer.
    Salutations de la galaxie MACS0647-JD, ou de ce que nous appelons notre chez-soi.
    Le monde a beaucoup changé au cours des dix dernières années.
    En entrant dans l'église, il pouvait entendre la voix douce de quelqu'un qui chuchotait dans un téléphone portable.
    Maintenant, je dois réfléchir à mon existence et me demander si je suis vraiment réel
    Le temps d'hier était propice à l'escalade.
    Les gaufres sont toujours meilleures sans fourmis de feu ni puces.
    Nancy était fière d'avoir mené un naufrage serré.
    Il était tellement préoccupé de savoir s'il le pouvait ou non qu'il n'a pas pris le temps de se demander s'il le devait.
    Si manger des omelettes à trois œufs entraîne une prise de poids, les œufs de perruche sont un bon substitut.
    Je ne respecte personne qui ne sait pas faire la différence entre Pepsi et Coca.
    Il trouva l’extrémité de l’arc-en-ciel et fut surpris de ce qu’il y trouva.
    Il se demandait pourquoi, à 18 ans, il était assez vieux pour faire la guerre, mais pas assez pour acheter des cigarettes.
    Elle vivait sur Monkey Jungle Road et cela semblait expliquer toute son étrangeté.
    Julie veut un mari parfait.
    Puis-je t'offrir quelque chose à boire?
    Veuillez patienter à l'extérieur de la maison.
    Son fils a plaisanté en disant que les barres énergétiques n’étaient rien de plus que des barres chocolatées pour adultes.
    Ma sœur aînée ressemble à ma mère.
    Le feuillage épais et les vignes entrelacées rendaient la randonnée presque impossible.
    Un joyau scintillant ne suffit pas.
    Trente ans plus tard, elle pensait toujours qu’il était acceptable de mettre le rouleau de papier toilette en dessous plutôt qu’en haut.
    Chaque personne qui vous connaît a une perception différente de qui vous êtes.
    Descendez les escaliers avec précaution.
    Face à sa plus grande peur, il a mangé sa première guimauve.
    Elle a pleuré des diamants.
    Demain apportera quelque chose de nouveau, alors laissez aujourd'hui comme souvenir.
    Erin a accidentellement créé un nouvel univers.
    David souscrit à la stratégie « mettre votre tente dans le sac » plutôt que de la plier joliment.
    La serveuse ne fut pas amusée lorsqu'il commanda des œufs verts et du jambon.
    Tout ce que vous avez à faire est de prendre le stylo et de commencer.`;

    async function start() {
        const inGame = new Set();
        const filter = m => m.author.id === interaction.user.id;
        if (inGame.has(interaction.user.id)) return;
        inGame.add(interaction.user.id);
        var i;
        for (i = 0; i < 25; i++) {
            const time = Date.now();

            list = list.split("\n");
            let sentenceList = list[Math.floor(Math.random() * list.length)];

            let sentence = '';
            let ogSentence = sentenceList.toLowerCase().replace("    ", "");

            ogSentence.split(' ').forEach(argument => {
                sentence += '`' + argument.split('').join(' ') + '` '
            });

            await client.embed({
                title: `💬・dactylographie :`,
                desc: `Ecrit en moin de ${ms(timeLength, { long: true })}! \n${sentence}`,
                type: 'editreply'
            }, interaction)

            try {
                var msg = await interaction.channel.awaitMessages({
                    filter,
                    max: 1,
                    time: timeLength,
                    errors: ['time']
                });
            } catch (ex) {
                client.errNormal({
                    error: "Temps écoulé !",
                    type: 'editreply'
                }, interaction)
                inGame.delete(interaction.user.id)
                break;
            }

            if (['cancel', 'end'].includes(msg.first().content.toLowerCase().trim())) {
                msg.first().delete();
                client.succNormal({
                    text: "Fini !",
                    type: 'editreply'
                }, interaction)
                inGame.delete(interaction.user.id)
                break
            } else if (msg.first().content.toLowerCase().trim() === ogSentence.toLowerCase()) {
                msg.first().delete();
                client.succNormal({
                    text: `Vous l'avez fait en ${ms(Date.now() - time, { long: true })}!`,
                    type: 'editreply'
                }, interaction)
                break;
            } else {
                client.errNormal({
                    error: "Malheureusement, vous n'avez pas réussi !",
                    type: 'editreply'
                }, interaction)
                inGame.delete(interaction.user.id)
                break;
            }

            if (i === 25) {
                client.succNormal({ text: `Vous avez réussi !`, type: 'editreply' }, interaction)
                inGame.delete(interaction.user.id)
                break
            }
        }
    }

    start()
}

 