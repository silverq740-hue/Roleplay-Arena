const charGrid = document.getElementById('character-grid');
const createCharBtn = document.getElementById('create-char');
const customCharDiv = document.querySelector('.custom-char');
const saveCharBtn = document.getElementById('save-char');
const chatContainer = document.querySelector('.chat-container');
const chatBox = document.getElementById('chat-box');
const chatInput = document.getElementById('chat-input');
const sendBtn = document.getElementById('send-btn');
const currentCharTitle = document.getElementById('current-char');

let currentUser = { uid: 'demo-user' };
let currentCharacter = null;
let characters = [];

document.addEventListener("DOMContentLoaded", () => loadCharacters());

// Load characters from backend
async function loadCharacters() {
  const res = await fetch('/chat/characters');
  characters = await res.json();
  renderCharacters();
}

function renderCharacters() {
  charGrid.innerHTML = '';
  characters.forEach(c => {
    const card = document.createElement('div');
    card.classList.add('character-card');
    card.innerHTML = `
      <h3>${c.name}</h3>
      <h4>${c.title}</h4>
      <p>${c.description}</p>
      <button onclick="selectCharacter('${c.name}')">Chat</button>
    `;
    charGrid.appendChild(card);
  });
}

function selectCharacter(name) {
  currentCharacter = characters.find(c => c.name === name);
  charGrid.parentElement.classList.add('hidden');
  chatContainer.classList.remove('hidden');
  currentCharTitle.textContent = `Chatting with ${currentCharacter.name}`;
}

sendBtn.addEventListener('click', sendMessage);
chatInput.addEventListener('keypress', e => { if(e.key==='Enter') sendMessage(); });

async function sendMessage() {
  const message = chatInput.value.trim();
  if(!message || !currentCharacter) return;
  appendMessage(`You: ${message}`);
  chatInput.value = '';

  const res = await fetch('/chat', {
    method:'POST',
    headers:{ 'Content-Type':'application/json' },
    body: JSON.stringify({ userId: currentUser.uid, message, character: currentCharacter.name })
  });
  const data = await res.json();
  appendMessage(`${currentCharacter.name}: ${data.reply}`);
}

function appendMessage(msg) {
  const p = document.createElement('p');
  p.textContent = msg;
  chatBox.appendChild(p);
  chatBox.scrollTop = chatBox.scrollHeight;
}

// Bottom nav functionality (simple)
document.getElementById('nav-grid').addEventListener('click', () => {
  chatContainer.classList.add('hidden');
  charGrid.parentElement.classList.remove('hidden');
});
