// --- Elemente holen ---
const eagle       = document.getElementById("eagle");
const obstacle    = document.getElementById("obstacle");
const score       = document.getElementById("score");
const startBtn    = document.getElementById("startBtn");   // Start-Button
const startScreen = document.getElementById("startScreen");
const bg1         = document.getElementById("bg1");
const bg2         = document.getElementById("bg2");

// --- Spielzustand: anfangs gestoppt ---
let gameRunning  = false;
let gameInterval = null;
let colliding    = false;  // verhindert mehrfaches Auslösen der Kollision

// --- Sprung-Funktion ---
function jump() {
  // Verbesserung: Sprung nur möglich wenn gerade kein Sprung läuft
  if (!eagle.classList.contains("jump-animation") && gameRunning) {
    eagle.classList.add("jump-animation");
    // Nach 900ms (= Animationsdauer) Klasse wieder entfernen
    setTimeout(() => eagle.classList.remove("jump-animation"), 900);
  }
}

// --- Tastatur-Event für Sprung ---
document.addEventListener("keypress", (event) => {
  jump();
});

// --- Kollisions-Animation auslösen ---
function triggerCollision() {
  if (colliding) return;
  colliding = true;

  eagle.classList.add("collision-animation");
  console.log("Kollision! Score wird zurückgesetzt.");

  setTimeout(() => {
    eagle.classList.remove("collision-animation");
    colliding = false;
  }, 600);

  score.innerText = 0;
}

// --- Spiel starten ---
function startGame() {
  console.log("Start-Button wurde geklickt – Spiel startet!");

  gameRunning = true;

  // Start-Overlay ausblenden
  startScreen.style.display = "none";

  // Hintergrund-Scrolling aktivieren (nahtlos durch 2 Divs)
  bg1.classList.add("bg-scroll");
  bg2.classList.add("bg-scroll");

  // Hindernis-Animation aktivieren
  obstacle.classList.add("running");

  // Game-Loop starten
  gameInterval = setInterval(() => {
    if (!gameRunning) return;

    const eagleTop     = parseInt(window.getComputedStyle(eagle).getPropertyValue("top"));
    const obstacleLeft = parseInt(window.getComputedStyle(obstacle).getPropertyValue("left"));

    // Score hochzählen
    score.innerText = parseInt(score.innerText) + 2;

    // Hindernis ausblenden wenn ausserhalb
    if (obstacleLeft < 0) {
      obstacle.style.display = "none";
    } else {
      obstacle.style.display = "";
    }

    // Kollision prüfen
    if (obstacleLeft < 50 && obstacleLeft > 0 && eagleTop > 150) {
      triggerCollision();
    }

  }, 50);
}

// --- Click-Event für Start-Button ---
startBtn.addEventListener("click", () => {
  console.log("Start-Button wurde geklickt!");
  startGame();
});