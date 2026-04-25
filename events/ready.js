// filepath: events/ready.js
const { Events } = require("discord.js");
const webhook = require("../utils/webhook");

module.exports = {
  name: Events.ClientReady,
  once: true,

  async execute(client) {
    console.log(`🤖 ${client.user.tag} is now online!`);
    console.log(`📊 Bot is in ${client.guilds.cache.size} server(s)`);

    // Log startup to webhook
    await webhook.logStartup(client);

    // Set bot status
    client.user.setPresence({
      activities: [
        {
          name: "/help for commands",
          type: 0, // Playing
        },
      ],
      status: "online",
    });
  },
};
