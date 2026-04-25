// filepath: utils/embed.js
const { EmbedBuilder } = require("discord.js");
const config = require("../config/bot");

class Embed {
  constructor() {
    this.botName = config.bot.name;
    this.botColor = config.bot.color;
  }

  // Create a success embed
  success(title, description) {
    return new EmbedBuilder()
      .setColor("#00CC66")
      .setTitle(`✅ ${title}`)
      .setDescription(description)
      .setTimestamp()
      .setFooter({
        text: this.botName,
        iconURL: "https://i.imgur.com/AfFp7pu.png",
      });
  }

  // Create an error embed
  error(title, description) {
    return new EmbedBuilder()
      .setColor("#FF4444")
      .setTitle(`❌ ${title}`)
      .setDescription(description)
      .setTimestamp()
      .setFooter({
        text: this.botName,
        iconURL: "https://i.imgur.com/AfFp7pu.png",
      });
  }

  // Create an info embed
  info(title, description) {
    return new EmbedBuilder()
      .setColor(this.botColor)
      .setTitle(`ℹ️ ${title}`)
      .setDescription(description)
      .setTimestamp()
      .setFooter({
        text: this.botName,
        iconURL: "https://i.imgur.com/AfFp7pu.png",
      });
  }

  // Create a warning embed
  warning(title, description) {
    return new EmbedBuilder()
      .setColor("#FFAA00")
      .setTitle(`⚠️ ${title}`)
      .setDescription(description)
      .setTimestamp()
      .setFooter({
        text: this.botName,
        iconURL: "https://i.imgur.com/AfFp7pu.png",
      });
  }

  // Create a setup confirmation embed
  setup(channel) {
    return new EmbedBuilder()
      .setColor("#00CC66")
      .setTitle("✅ AI Chat Channel Configured")
      .setDescription(`AI Chat Channel has been set to ${channel}`)
      .addFields(
        { name: "📍 Channel", value: channel.toString(), inline: true },
        { name: "🤖 Bot", value: this.botName, inline: true },
      )
      .setTimestamp()
      .setFooter({
        text: this.botName,
        iconURL: "https://i.imgur.com/AfFp7pu.png",
      });
  }

  // Create a help embed
  help() {
    return new EmbedBuilder()
      .setColor(this.botColor)
      .setTitle("🤖 SMOS GANG AI Commands")
      .setDescription("Here are all available commands:")
      .addFields(
        {
          name: "/setup channel",
          value: "Set the AI chat channel (Admin only)",
          inline: false,
        },
        {
          name: "/remove",
          value: "Remove AI channel config (Admin only)",
          inline: false,
        },
        {
          name: "/reset-ai",
          value: "Reset conversation memory",
          inline: false,
        },
        {
          name: "/set-language",
          value: "Set Khmer, English, or Both",
          inline: false,
        },
        { name: "/help", value: "Show this help message", inline: false },
        { name: "/ping", value: "Check bot latency", inline: false },
        { name: "/status", value: "Show configured AI channel", inline: false },
      )
      .setTimestamp()
      .setFooter({
        text: this.botName,
        iconURL: "https://i.imgur.com/AfFp7pu.png",
      });
  }

  // Create a status embed
  status(channel, language) {
    return new EmbedBuilder()
      .setColor(this.botColor)
      .setTitle("📊 Bot Status")
      .addFields(
        { name: "🤖 Bot Name", value: this.botName, inline: true },
        {
          name: "📍 AI Channel",
          value: channel || "Not configured",
          inline: true,
        },
        {
          name: "🌐 Language",
          value:
            language === "km"
              ? "🇰🇭 Khmer Only"
              : language === "both"
                ? "🇰🇭🇺🇸 Khmer & English"
                : "🇺🇸 English Only",
          inline: true,
        },
      )
      .setTimestamp()
      .setFooter({
        text: this.botName,
        iconURL: "https://i.imgur.com/AfFp7pu.png",
      });
  }

  // Create a ping embed
  ping(latency) {
    return new EmbedBuilder()
      .setColor(this.botColor)
      .setTitle("🏓 Pong!")
      .addFields(
        { name: "Bot Latency", value: `${latency}ms`, inline: true },
        {
          name: "Status",
          value:
            latency < 100
              ? "🟢 Excellent"
              : latency < 200
                ? "🟡 Good"
                : "🔴 Slow",
          inline: true,
        },
      )
      .setTimestamp()
      .setFooter({
        text: this.botName,
        iconURL: "https://i.imgur.com/AfFp7pu.png",
      });
  }

  // Create AI response embed
  aiResponse(message) {
    return new EmbedBuilder()
      .setColor(this.botColor)
      .setDescription(message)
      .setTimestamp()
      .setFooter({
        text: this.botName,
        iconURL: "https://i.imgur.com/AfFp7pu.png",
      });
  }
}

module.exports = new Embed();
