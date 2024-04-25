
module.exports = async (client, interaction, args) => {

    if (!interaction.member.voice.channel) return client.errNormal({ error: `Tu n'es pas dans un vocal !`, type: 'editreply' }, interaction);

    if (interaction.guild.members.me.voice.channel && interaction.member.voice.channel.id !== interaction.guild.members.me.voice.channel.id) return client.errNormal({ error: `Tu n'es pas dans le même vocal !`, type: 'editreply' }, interaction);

    client.soundboard(interaction.guild.id, interaction, "https://www.myinstants.com/media/sounds/jeff.mp3");

    client.succNormal({ text: "Lancement de la soundboard : **jeff**", type: 'editreply' }, interaction);
};