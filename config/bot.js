// filepath: config/bot.js
const { Client, GatewayIntentBits, Partials } = require("discord.js");

module.exports = {
  // Discord Client Configuration
  client: {
    intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMessages,
      GatewayIntentBits.MessageContent,
      GatewayIntentBits.GuildMembers,
    ],
    partials: [Partials.Channel, Partials.Message, Partials.User],
  },

  // Bot Settings
  bot: {
    name: process.env.BOT_NAME || "SMOS GANG AI",
    color: process.env.BOT_COLOR || "#5865F2",
    prefix: process.env.BOT_PREFIX || "!",
    cooldown: parseInt(process.env.COOLDOWN_TIME) || 3000,
  },

  // AI Settings
  ai: {
    model: process.env.AI_MODEL || "gpt-3.5-turbo",
    maxTokens: parseInt(process.env.AI_MAX_TOKENS) || 500,
    temperature: parseFloat(process.env.AI_TEMPERATURE) || 0.7,
  },

  // Command Configuration
  commands: {
    cooldown: new Map(),
    adminOnly: ["setup", "set-language"],
  },
};
