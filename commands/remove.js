// filepath: commands/remove.js
const { SlashCommandBuilder } = require("discord.js");
const db = require("../database/serverData");
const embed = require("../utils/embed");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("remove")
    .setDescription("Remove AI chat channel configuration (Admin only)"),

  async execute(interaction, client) {
    // Check if user has administrator permission
    if (!interaction.member.permissions.has("Administrator")) {
      return interaction.reply({
        embeds: [
          embed.error(
            "Permission Denied",
            "You need Administrator permission to use this command.",
          ),
        ],
        ephemeral: true,
      });
    }

    const guildId = interaction.guild.id;
    const aiChannelId = db.getAIChannel(guildId);

    // Check if AI channel is configured
    if (!aiChannelId) {
      return interaction.reply({
        embeds: [
          embed.warning(
            "Not Configured",
            "No AI chat channel is currently configured.",
          ),
        ],
      });
    }

    // Get channel name before removing
    const channel = interaction.guild.channels.cache.get(aiChannelId);
    const channelName = channel
      ? `#${channel.name}`
      : `Channel (${aiChannelId})`;

    // Remove AI channel from database
    db.setAIChannel(guildId, null);

    await interaction.reply({
      embeds: [
        embed.success(
          "Channel Removed",
          `AI chat channel **${channelName}** has been removed.`,
        ),
      ],
    });

    console.log(`✅ AI Channel removed in ${interaction.guild.name}`);
  },
};
