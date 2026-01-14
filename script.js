const noBtn = document.getElementById("noBtn");
const response = document.getElementById("response");
const canvas = document.getElementById("confetti");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

noBtn.addEventListener("mouseover", () => {
  const x = Math.random() * (window.innerWidth - noBtn.offsetWidth);
  const y = Math.random() * (window.innerHeight - noBtn.offsetHeight);
  noBtn.style.position = "absolute";
  noBtn.style.left = `${x}px`;
  noBtn.style.top = `${y}px`;
});

let confettiPieces = [];

function createConfetti() {
  confettiPieces = [];
  for (let i = 0; i < 200; i++) {
    confettiPieces.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 6 + 4,
      speed: Math.random() * 3 + 2,
      color: `hsl(${Math.random() * 360}, 100%, 70%)`
    });
  }
}

function drawConfetti() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  confettiPieces.forEach(p => {
    ctx.fillStyle = p.color;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    ctx.fill();
    p.y += p.speed;
    if (p.y > canvas.height) p.y = 0;
  });
  requestAnimationFrame(drawConfetti);
}

/* Flying hearts */
function launchHearts() {
  for (let i = 0; i < 40; i++) {
    const heart = document.createElement("div");
    heart.classList.add("heart");
    heart.innerText = "❤️";

    heart.style.left = Math.random() * window.innerWidth + "px";
    heart.style.fontSize = 20 + Math.random() * 25 + "px";
    heart.style.animationDuration = 2 + Math.random() * 2 + "s";

    document.body.appendChild(heart);

    setTimeout(() => {
      heart.remove();
    }, 4000);
  }
}

/* YES action */
function sayYes() {
  response.innerText = "She said YES 💍❤️ Forever starts now!";
  createConfetti();
  drawConfetti();
  launchHearts();
}
