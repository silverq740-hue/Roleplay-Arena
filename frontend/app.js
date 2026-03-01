document.addEventListener("DOMContentLoaded", () => {
  const landing = document.querySelector('.landing');
  const charGrid = document.querySelector('.character-grid');

  // auto load grid after landing
  setTimeout(() => {
    landing.classList.add('hidden');
    charGrid.classList.remove('hidden');
    loadCharacters();
  }, 2000);
});

const characters = [
  { name: "Adam Jones", title: "The Shadow Sovereign", description: "A billionaire by day. A silent ruler of the night." },
  { name: "Kael Varyn", title: "The Apex Soldier", description: "Feared on the battlefield. Unmatched. Unquestioned." },
  { name: "Orion Vale", title: "The Infinity Wielder", description: "Playful charm… limitless power." },
  { name: "Zareth", title: "The Cursed Monarch", description: "Darkness bends to his will." },
  { name: "James Wicks", title: "The Corporate Tyrant", description: "He owns the skyline—and everything beneath it." },
  { name: "Ashley Noir", title: "The Untouchable Queen", description: "Beauty, influence, and absolute control." },
  { name: "Grey Maddox", title: "The Phantom Racer", description: "Speed is his weapon. Fear doesn’t exist." },
  { name: "Luca Virelli", title: "The Devil in Silk", description: "Handsome. Wealthy. Dangerously persuasive." },
  { name: "Michael Castellano", title: "The Underworld King", description: "The city’s shadows answer to him." },
  { name: "Michelle Castellano", title: "The Crimson Heiress", description: "Princess of the underworld. Ruthless elegance." }
];

function loadCharacters() {
  const container = document.getElementById("characters");
  container.innerHTML = "";

  characters.forEach(c => {
    const card = document.createElement("div");
    card.classList.add("character-card");
    card.innerHTML = `<h3>${c.name}</h3><h4>${c.title}</h4><p>${c.description}</p>`;
    container.appendChild(card);
  });

  // Spotlight first character
  const spotlight = document.getElementById("spotlight-card");
  const first = characters[0];
  spotlight.innerHTML = `<h3>${first.name}</h3><h4>${first.title}</h4><p>${first.description}</p>`;
}
