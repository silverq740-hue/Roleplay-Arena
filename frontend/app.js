const landing = document.querySelector('.landing');
const enterBtn = document.getElementById('enter');
const charSelection = document.querySelector('.character-selection');
const charGrid = document.getElementById('character-grid');
const createCharBtn = document.getElementById('create-char');
const customCharDiv = document.querySelector('.custom-char');
const saveCharBtn = document.getElementById('save-char');
const chatContainer = document.querySelector('.chat-container');
const chatBox = document.getElementById('chat-box');
const chatInput = document.getElementById('chat-input');
const sendBtn = document.getElementById('send-btn');
const currentCharTitle = document.getElementById('current-char');
const charNameInput = document.getElementById('char-name');
const charImageInput = document.getElementById('char-image');
const charPublicCheckbox = document.getElementById('char-public');

let currentUser = { uid: 'demo-user' };
let currentCharacter = null;
let characters = [];

enterBtn.addEventListener('click', async () => {
  landing.classList.add('hidden');
  charSelection.classList.remove('hidden');
  await loadCharacters();
});

async function loadCharacters() {
  const res = await fetch('/chat/characters');
  characters = await res.json();
  charGrid.innerHTML = '';
  characters.forEach(c => {
    const div = document.createElement('div');
    div.classList.add('character-card');
    div.textContent = c.name;
    div.addEventListener('click', () => selectCharacter(c));
    charGrid.appendChild(div);
  });
}

createCharBtn.addEventListener('click', () => {
  charSelection.classList.add('hidden');
  customCharDiv.classList.remove('hidden');
});

saveCharBtn.addEventListener('click', async () => {
  const name = charNameInput.value.trim();
  if(!name) return alert('Enter a name');
  let imagePath = '';
  if(charImageInput.files[0]) {
    const formData = new FormData();
    formData.append('image', charImageInput.files[0]);
    const res = await fetch('/upload', { method:'POST', body: formData });
    const data = await res.json();
    imagePath = data.path;
  }
  const publicVal = charPublicCheckbox.checked;
  await fetch('/chat/character', {
    method:'POST',
    headers:{'Content-Type':'application/json'},
    body: JSON.stringify({ name, userId: currentUser.uid, public: publicVal, imagePath })
  });
  customCharDiv.classList.add('hidden');
  charSelection.classList.remove('hidden');
  await loadCharacters();
});

function selectCharacter(c) {
  currentCharacter = c.name;
  charSelection.classList.add('hidden');
  chatContainer.classList.remove('hidden');
  currentCharTitle.textContent = `Chatting with ${currentCharacter}`;
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
    body: JSON.stringify({ userId: currentUser.uid, message, character: currentCharacter })
  });
  const data = await res.json();
  appendMessage(`${currentCharacter}: ${data.reply}`);
}

function appendMessage(msg) {
  const p = document.createElement('p');
  p.textContent = msg;
  chatBox.appendChild(p);
  chatBox.scrollTop = chatBox.scrollHeight;
    }
