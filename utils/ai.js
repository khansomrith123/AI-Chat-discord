// filepath: utils/ai.js
const OpenAI = require("openai");
const config = require("../config/bot");
const db = require("../database/serverData");

class AI {
  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }

  // Get system prompt based on language
  getSystemPrompt(language) {
    if (language === "km") {
      return `You are SMOS GANG AI, a friendly and helpful AI assistant for a Discord server.
You MUST respond ONLY in Khmer (Cambodian) language. Use Khmer script (ខ្មែរ).
Be conversational, friendly, and helpful. Keep responses concise but informative.
You are part of the SMOS GANG community.`;
    }
    if (language === "both") {
      return `You are SMOS GANG AI, a friendly and helpful AI assistant for a Discord server.
You can respond in both Khmer (Cambodian) and English languages. Detect the user's language and respond in the same language.
Be conversational, friendly, and helpful. Keep responses concise but informative.
You are part of the SMOS GANG community.`;
    }
    // Default to English
    return `You are SMOS GANG AI, a friendly and helpful AI assistant for a Discord server.
Be conversational, friendly, and helpful. Keep responses concise but informative.
You are part of the SMOS GANG community.`;
  }

  // Generate AI response
  async generateResponse(guildId, userMessage) {
    try {
      const language = db.getLanguage(guildId);
      const conversationHistory = db.getConversationHistory(guildId);

      // Build messages array
      const messages = [
        { role: "system", content: this.getSystemPrompt(language) },
        ...conversationHistory,
        { role: "user", content: userMessage },
      ];

      // Call OpenAI API
      const completion = await this.openai.chat.completions.create({
        model: config.ai.model,
        messages: messages,
        max_tokens: config.ai.maxTokens,
        temperature: config.ai.temperature,
      });

      const response = completion.choices[0].message.content;

      // Save to conversation history
      db.addMessage(guildId, "user", userMessage);
      db.addMessage(guildId, "assistant", response);

      return response;
    } catch (error) {
      console.error("OpenAI API Error:", error);

      // Return fallback message based on language
      const language = db.getLanguage(guildId);
      if (language === "km") {
        return "សូមទោស ខ្ញុំមិនអាចឆ្លើយតបបានទេ។ សូមព្យាយាមម្តងទៀតនៅពេលក្រោយ!";
      }
      if (language === "both") {
        return "Sorry! I couldn't process your request. Please try again later! / សូមទោស ខ្ញុំមិនអាចឆ្លើយតបបានទេ។ សូមព្យាយាមម្តងទៀត!";
      }
      return "Sorry, I couldn't process your request. Please try again later!";
    }
  }

  // Check for spam (simple implementation)
  isSpam(message) {
    // Check for excessive caps
    const capsCount = (message.match(/[A-Z]/g) || []).length;
    if (message.length > 10 && capsCount / message.length > 0.7) {
      return true;
    }

    // Check for repeated characters
    if (/(.)\1{5,}/.test(message)) {
      return true;
    }

    // Check for common spam patterns
    const spamPatterns = [
      /discord\.gg\/[a-zA-Z0-9]+/i,
      /free nitro/i,
      /nitro giveaway/i,
      /click here.*free/i,
    ];

    for (const pattern of spamPatterns) {
      if (pattern.test(message)) {
        return true;
      }
    }

    return false;
  }
}

module.exports = new AI();
