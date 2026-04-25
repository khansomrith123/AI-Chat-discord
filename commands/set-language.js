// filepath: commands/set-language.js
const { SlashCommandBuilder } = require("discord.js");
const db = require("../database/serverData");
const embed = require("../utils/embed");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("set-language")
    .setDescription("Set bot language (Khmer & English)")
    .addStringOption((option) =>
      option
        .setName("language")
        .setDescription("Select language mode")
        .setRequired(true)
        .addChoices(
          { name: "🇺🇿 Khmer & English (Both)", value: "both" },
          { name: "🇺🇸 English Only", value: "en" },
          { name: "🇰🇭 Khmer Only", value: "km" },
        ),
    ),

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

    const language = interaction.options.getString("language");
    const guildId = interaction.guild.id;

    // Save language to database
    db.setLanguage(guildId, language);

    const languageName =
      language === "km"
        ? "Khmer Only (🇰🇭)"
        : language === "en"
          ? "English Only (🇺🇸)"
          : "Khmer & English (🇰🇭🇺🇸)";

    await interaction.reply({
      embeds: [
        embed.success(
          "Language Updated",
          `Bot language has been set to **${languageName}**`,
        ),
      ],
    });

    console.log(
      `✅ Language set to ${languageName} in ${interaction.guild.name}`,
    );
  },
};
