const express = require('express');
const router = express.Router();
const Groq = require('groq-sdk');

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY || 'missing_key' });

const systemPrompt = `You are a helpful AI assistant for a food ordering app called EchoEats. 
Your goal is to parse user input (either voice transcripts or text) and return ONLY a strict JSON object. Do not include any markdown formatting, no backticks, just the raw JSON.

The user might ask to navigate, order food, remove food, or just chat.
Here are the commands you can return in the "command" field: 'NAVIGATE', 'ORDER', 'REMOVE', 'LOGOUT', 'CHAT'.

If the user asks to navigate (e.g. "go to menu", "show cart", "go home"):
{
  "command": "NAVIGATE",
  "path": "/#items", (or "/", "/cart", "/login", "/profile", "/orders")
  "response": "Navigating to the menu."
}

If the user wants to order something (e.g. "add 2 pizzas and a burger"):
{
  "command": "ORDER",
  "items": [{"name": "pizza", "quantity": 2}, {"name": "burger", "quantity": 1}],
  "response": "I've added 2 pizzas and 1 burger to your cart."
}

If the user wants to chat or ask a question (e.g. "what do you recommend?", "hello"):
{
  "command": "CHAT",
  "response": "Hello! I recommend our Farmhouse Pizza. Would you like me to add it to your cart?"
}

Always keep the "response" friendly, short, and conversational.
ALWAYS RETURN VALID JSON ONLY.`;

// Basic keyword-based fallback parser
const fallbackParser = (transcript) => {
  const text = transcript.toLowerCase();
  
  if (text.includes('menu') || text.includes('food') || text.includes('items')) {
    return { command: 'NAVIGATE', path: '/#items', response: "Sure! Let's take a look at our menu." };
  }
  if (text.includes('cart') || text.includes('basket')) {
    return { command: 'NAVIGATE', path: '/cart', response: "Opening your cart now." };
  }
  if (text.includes('login') || text.includes('sign up')) {
    return { command: 'NAVIGATE', path: '/login', response: "Taking you to the login page." };
  }
  if (text.includes('profile') || text.includes('account')) {
    return { command: 'NAVIGATE', path: '/profile', response: "Opening your profile settings." };
  }
  if (text.includes('order') || text.includes('history')) {
    return { command: 'NAVIGATE', path: '/orders', response: "Let's check your order history." };
  }
  if (text.includes('logout') || text.includes('sign out')) {
    return { command: 'LOGOUT', response: "Logging you out. Have a great day!" };
  }
  
  // Basic ordering fallback
  if (text.includes('add') || text.includes('order')) {
    let item = "item";
    if (text.includes('pizza')) item = "pizza";
    else if (text.includes('burger')) item = "burger";
    else if (text.includes('drink') || text.includes('coke')) item = "beverage";
    
    return { 
      command: 'ORDER', 
      items: [{ name: item, quantity: 1 }], 
      response: `I've added one ${item} to your cart for you!` 
    };
  }

  // General Chat
  if (text.includes('hello') || text.includes('hi') || text.includes('hey')) {
    return { command: 'CHAT', response: "Hello there! I'm Echo, your AI assistant. I can help you find food, manage your cart, or navigate the site. What can I do for you?" };
  }

  return { command: 'CHAT', response: "I'm not quite sure how to help with that yet, but I'm learning! Try asking me to show the menu or add some food to your cart." };
};

// @desc    Process voice/text command
// @route   POST /api/voice
// @access  Public
router.post('/', async (req, res) => {
  try {
    const { transcript } = req.body;
    
    if (!transcript) {
      return res.status(400).json({ message: 'Transcript is required' });
    }

    // Use Groq if API Key is present
    if (process.env.GROQ_API_KEY && process.env.GROQ_API_KEY !== 'your_key_here') {
      try {
        const completion = await groq.chat.completions.create({
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: transcript }
          ],
          model: 'llama3-8b-8192',
          temperature: 0.2,
          max_tokens: 200,
        });

        const aiMessage = completion.choices[0]?.message?.content || "{}";
        const parsedResponse = JSON.parse(aiMessage.trim());
        return res.json({ aiResponse: parsedResponse });
      } catch (groqError) {
        console.error('Groq API Error, falling back to keyword parser:', groqError.message);
      }
    }

    // Fallback to keyword parser if no key or API fails
    const fallbackResponse = fallbackParser(transcript);
    res.json({ aiResponse: fallbackResponse });

  } catch (error) {
    console.error('Voice Route Error:', error);
    res.status(500).json({ message: 'Server error processing command', error: error.message });
  }
});

module.exports = router;
