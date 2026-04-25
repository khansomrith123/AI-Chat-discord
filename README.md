# 🤖 SMOS GANG AI

A powerful Discord AI chatbot with OpenAI integration, built with Node.js and discord.js v14.

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![Node.js](https://img.shields.io/badge/Node.js-18%2B-green)
![Discord.js](https://img.shields.io/badge/discord.js-v14-purple)

## ✨ Features

- **AI Chat System** - Natural conversations with OpenAI GPT
- **Multi-language Support** - English and Khmer language
- **Modern Embed Design** - Professional SMOS GANG branding
- **Security** - Spam detection, cooldown system, bot filtering
- **Easy Setup** - Simple slash commands for configuration

## 📁 Project Structure

```
SMOS GANG AI/
├── commands/          # Slash command files
│   ├── setup.js
│   ├── reset-ai.js
│   ├── set-language.js
│   ├── help.js
│   ├── ping.js
│   └── status.js
├── events/            # Discord event handlers
│   ├── ready.js
│   ├── interactionCreate.js
│   └── messageCreate.js
├── handlers/          # Command and event loaders
│   ├── commandHandler.js
│   └── eventHandler.js
├── database/          # Data storage
│   └── serverData.js
├── config/            # Configuration files
│   └── bot.js
├── utils/             # Utility modules
│   ├── embed.js
│   ├── ai.js
│   └── cooldown.js
├── index.js           # Main entry point
├── .env               # Environment variables
├── package.json       # Dependencies
└── README.md          # This file
```

## 🚀 Installation

### Prerequisites

- Node.js 18 or higher
- npm or yarn
- Discord Bot Token
- OpenAI API Key

### Steps

1. **Clone or download this repository**

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Configure environment variables:**

   Open `.env` file and fill in your credentials:

   ```env
   DISCORD_TOKEN=your_discord_bot_token_here
   OPENAI_API_KEY=your_openai_api_key_here
   ```

4. **Get your Discord Bot Token:**
   - Go to [Discord Developer Portal](https://discord.com/developers/applications)
   - Create a new application
   - Go to "Bot" section
   - Copy the token

5. **Get your OpenAI API Key:**
   - Go to [OpenAI Platform](https://platform.openai.com/api-keys)
   - Create a new API key

6. **Invite the bot to your server:**
   - Go to [Discord Developer Portal](https://discord.com/developers/applications)
   - Go to "OAuth2" > "URL Generator"
   - Select `bot` and `applications.commands` scopes
   - Select `Administrator` permission
   - Copy the generated URL and visit it

## 🎮 Commands

| Command          | Description                | Permission |
| ---------------- | -------------------------- | ---------- |
| `/setup channel` | Set the AI chat channel    | Admin only |
| `/reset-ai`      | Reset conversation memory  | Everyone   |
| `/set-language`  | Choose Khmer or English    | Admin only |
| `/help`          | Show all commands          | Everyone   |
| `/ping`          | Check bot latency          | Everyone   |
| `/status`        | Show configured AI channel | Everyone   |

## 📝 Usage

### Setting Up the Bot

1. Run the bot:

   ```bash
   npm start
   ```

2. In your Discord server, use `/setup` to configure the AI chat channel:

   ```
   /setup channel #general
   ```

3. The bot will respond:
   ```
   ✅ AI Chat Channel has been set to #general
   ```

### Talking to the AI

- Send messages in the configured AI channel
- The bot will respond with AI-generated replies
- Use `/reset-ai` to clear conversation history
- Use `/set-language` to switch between English and Khmer

## ⚙️ Configuration

You can customize the bot by editing `.env`:

| Variable         | Description            | Default       |
| ---------------- | ---------------------- | ------------- |
| `DISCORD_TOKEN`  | Your Discord bot token | Required      |
| `OPENAI_API_KEY` | Your OpenAI API key    | Required      |
| `BOT_NAME`       | Bot display name       | SMOS GANG AI  |
| `BOT_COLOR`      | Embed color (hex)      | #5865F2       |
| `AI_MODEL`       | OpenAI model           | gpt-3.5-turbo |
| `AI_MAX_TOKENS`  | Max response tokens    | 500           |
| `AI_TEMPERATURE` | Response creativity    | 0.7           |
| `COOLDOWN_TIME`  | Cooldown in ms         | 3000          |

## 🔒 Security Features

- **Spam Detection** - Filters out spam messages
- **Cooldown System** - Prevents message flooding (3 seconds default)
- **Bot Filtering** - Ignores other bots
- **Permission Checks** - Admin-only commands are protected

## 🛠️ Hosting

### Local Hosting

```bash
npm start
```

### Production Hosting (PM2)

```bash
npm install -g pm2
pm2 start index.js
pm2 save
```

### Hosting Platforms

- [Railway](https://railway.app)
- [Render](https://render.com)
- [Heroku](https://heroku.com)
- [DigitalOcean](https://digitalocean.com)

## 📄 License

MIT License - Feel free to use and modify!

## 🤝 Support

For issues and questions:

- Create an issue on GitHub
- Join our Discord server

---

Made with ❤️ by **SMOS GANG**
