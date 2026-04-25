// filepath: index.js
require("dotenv").config();

const {
  Client,
  Collection,
  GatewayIntentBits,
  Partials,
} = require("discord.js");
const config = require("./config/bot");
const eventHandler = require("./handlers/eventHandler");
const commandHandler = require("./handlers/commandHandler");

// Create Discord client
const client = new Client({
  intents: config.client.intents,
  partials: config.client.partials,
});

// Store commands in client
client.commands = new Collection();

// Load events
eventHandler.loadEvents(client);

// Load commands and register them
async function registerCommands() {
  await commandHandler.loadCommands(client);

  // Register commands globally (for all servers)
  // For single server, use: await client.guilds.cache.get(GUILD_ID)?.commands.set([...client.commands.values()].map(cmd => cmd.data));
  await client.application.commands.set(
    [...client.commands.values()].map((cmd) => cmd.data),
  );

  console.log("✅ Commands registered successfully");
}

// Login to Discord
client
  .login(process.env.DISCORD_TOKEN)
  .then(() => {
    console.log("🔄 Logging in to Discord...");
    registerCommands();
  })
  .catch((err) => {
    console.error("❌ Failed to login:", err);
    process.exit(1);
  });

// Handle process termination
process.on("SIGINT", () => {
  console.log("\n🛑 Shutting down bot...");
  client.destroy();
  process.exit(0);
});

process.on("SIGTERM", () => {
  console.log("\n🛑 Shutting down bot...");
  client.destroy();
  process.exit(0);
});

// Handle uncaught exceptions
process.on("uncaughtException", (error) => {
  console.error("Uncaught Exception:", error);
});

process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection at:", promise, "reason:", reason);
});
