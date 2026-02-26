document.addEventListener("DOMContentLoaded", () => {
  loadCharacters();
});

async function loadCharacters() {
  try {
    const response = await fetch("/characters.json");
    const characters = await response.json();
    renderCharacters(characters);
  } catch (error) {
    console.error("Error loading characters:", error);
  }
}

function renderCharacters(characters) {
  const container = document.getElementById("character-container");
  container.innerHTML = "";

  characters.forEach(char => {
    const card = document.createElement("div");
    card.classList.add("character-card");

    card.innerHTML = `
      <img src="${char.avatar}" alt="${char.name}" />
      <h2>${char.name}</h2>
      <h4>${char.title}</h4>
      <p>${char.description}</p>
      <button onclick="selectCharacter('${char.name}')">Enter</button>
    `;

    container.appendChild(card);
  });
}

function selectCharacter(name) {
  alert("Entering roleplay with " + name);
}
