const Discord = require('discord.js');
const axios = require("axios");

const model = require('../../database/models/badge');

module.exports = async (client, interaction, args) => {
  let Emojis = "";
  let EmojisAnimated = "";
  let EmojiCount = 0;
  let Animated = 0;
  let OverallEmojis = 0;

  function Emoji(id) {
    return client.emojis.cache.get(id).toString();
  }

  interaction.guild.emojis.cache.forEach((emoji) => {
    OverallEmojis++;
    if (emoji.animated) {
      Animated++;
      EmojisAnimated += Emoji(emoji.id);
    } else {
      EmojiCount++;
      Emojis += Emoji(emoji.id);
    }
  });

  client.embed({
    title: `😛・Emojis !`,
    desc: `${OverallEmojis} Emojis - ${interaction.guild.name}`,
    fields: [
      {
        name: `Animé : [${Animated}]`,
        value: EmojisAnimated.substr(0, 1021) + "...",
        inline: false,
      },
      {
        name: `Normal : [${EmojiCount}]`,
        value: Emojis.substr(0, 1021) + "...",
        inline: false,
      },
    ],
    type: 'editreply'
  }, interaction)
}

 