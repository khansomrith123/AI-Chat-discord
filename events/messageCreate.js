// filepath: events/messageCreate.js
const { Events } = require("discord.js");
const db = require("../database/serverData");
const ai = require("../utils/ai");
const cooldown = require("../utils/cooldown");
const embed = require("../utils/embed");
const webhook = require("../utils/webhook");

module.exports = {
  name: Events.MessageCreate,
  async execute(message, client) {
    // Ignore bots
    if (message.author.bot) return;

    // Ignore if no guild
    if (!message.guild) return;

    const guildId = message.guild.id;
    const aiChannelId = db.getAIChannel(guildId);

    // Ignore if AI channel is not configured
    if (!aiChannelId) return;

    // Ignore if message is not in AI channel
    if (message.channel.id !== aiChannelId) return;

    // Check for spam
    if (ai.isSpam(message.content)) {
      return;
    }

    // Check cooldown
    const userId = message.author.id;
    if (cooldown.isOnCooldown(userId)) {
      const remaining = Math.ceil(cooldown.getRemainingTime(userId) / 1000);
      try {
        await message.reply({
          embeds: [
            embed.warning(
              "Cooldown",
              `Please wait ${remaining} seconds before sending another message.`,
            ),
          ],
          ephemeral: true,
        });
      } catch (error) {
        // Ignore if can't reply (no permission)
      }
      return;
    }

    // Set cooldown
    cooldown.setCooldown(userId);

    // Show typing indicator
    try {
      await message.channel.sendTyping();
    } catch (error) {
      // Ignore if can't send typing
    }

    try {
      // Generate AI response
      const response = await ai.generateResponse(guildId, message.content);

      // Log AI chat to webhook
      await webhook.logAIChat(message, response);

      // Send response
      await message.reply({
        embeds: [embed.aiResponse(response)],
      });
    } catch (error) {
      console.error("AI Response Error:", error);
      // Log error to webhook
      await webhook.logError(error, `AI Chat in #${message.channel.name}`);
      await message.reply({
        embeds: [
          embed.error(
            "Error",
            "Sorry, I encountered an error processing your message.",
          ),
        ],
      });
    }
  },
};
