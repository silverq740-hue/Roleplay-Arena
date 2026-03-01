const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

// Load characters
const CHAR_PATH = path.join(__dirname, '../characters.json');

// GET /chat/characters
router.get('/characters', (req, res) => {
  const data = fs.readFileSync(CHAR_PATH);
  const characters = JSON.parse(data);
  res.json(characters);
});

// POST /chat - simple echo AI
router.post('/', (req, res) => {
  const { userId, message, character } = req.body;
  // For now, just echo for testing
  res.json({ reply: `Echoing from ${character}: ${message}` });
});

module.exports = router;
