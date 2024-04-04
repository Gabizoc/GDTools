const Discord = require('discord.js');

module.exports = async (client, interaction, args) => {
  const perms = await client.checkPerms({
    flags: [Discord.PermissionsBitField.Flags.BanMembers],
    perms: [Discord.PermissionsBitField.Flags.BanMembers]
  }, interaction)

  if (perms == false) return;

  interaction.guild.bans.fetch().then(async banned => {
    let list = banned.map(banUser => `${banUser.user.tag}・**Réson :** ${banUser.reason || 'Pas de réson'}`);

    if (list.length == 0) return client.errNormal({
      error: `Ce serveur n'a pas de ban`,
      type: 'editreply'
    }, interaction)

    await client.createLeaderboard(`🔧・Banlist - ${interaction.guild.name}`, list, interaction);
  }).catch(error => {
    console.log(error)
  })
}

 