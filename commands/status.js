// filepath: commands/status.js
const { SlashCommandBuilder } = require("discord.js");
const db = require("../database/serverData");
const embed = require("../utils/embed");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("status")
    .setDescription("Show configured AI channel"),

  async execute(interaction, client) {
    const guildId = interaction.guild.id;
    const aiChannelId = db.getAIChannel(guildId);
    const language = db.getLanguage(guildId);

    let channelName = "Not configured";
    if (aiChannelId) {
      const channel = interaction.guild.channels.cache.get(aiChannelId);
      channelName = channel ? `#${channel.name}` : "Channel not found";
    }

    await interaction.reply({
      embeds: [embed.status(channelName, language)],
    });
  },
};
