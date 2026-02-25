const express = require('express');
const router = express.Router();
const { Configuration, OpenAIApi } = require('openai');

const configuration = new Configuration({ apiKey: process.env.OPENAI_API_KEY });
const openai = new OpenAIApi(configuration);

let memory = {}; // userId -> chat messages
let characters = [
  { name: 'Gojo', public: true },
  { name: 'Levi', public: true },
  { name: 'Jungkook', public: true }
];

// Fetch public characters
router.get('/characters', (req, res) => {
  res.json(characters.filter(c => c.public));
});

// Chat endpoint
router.post('/', async (req, res) => {
  try {
    const { userId, message, character } = req.body;
    if(!memory[userId]) memory[userId] = [];
    memory[userId].push({ role:'user', content: `${character}: ${message}` });

    const response = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: memory[userId]
    });

    const reply = response.data.choices[0].message.content;
    memory[userId].push({ role:'assistant', content: reply });

    res.json({ reply });
  } catch(err) {
    console.error(err);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

// Create custom character
router.post('/character', (req, res) => {
  const { name, userId, public = false, imagePath } = req.body;
  characters.push({ name, public, creator: userId, image: imagePath });
  res.json({ success: true });
});

module.exports = router;
