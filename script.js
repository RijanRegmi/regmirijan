// 💬 Toggle the love message when heart is clicked
function toggleMessage(e) {
  e.stopPropagation();
  const message = document.getElementById("loveMessage");
  message.classList.toggle("show");

  const rect = e.target.getBoundingClientRect();
  const x = rect.left + rect.width / 2;
  const y = rect.top + rect.height / 2;

  burstHearts(x, y);
}

// 💖 Create burst hearts at position
function burstHearts(x, y) {
  const hearts = ['💗', '💖', '❤️', '💕'];

  for (let i = 0; i < 5; i++) {
    const particle = document.createElement("div");
    particle.classList.add("particle");
    particle.textContent = hearts[Math.floor(Math.random() * hearts.length)];

    const angle = Math.random() * 2 * Math.PI;
    const radius = Math.random() * 100 + 20;
    const offsetX = Math.cos(angle) * radius + 'px';
    const offsetY = Math.sin(angle) * radius + 'px';

    particle.style.setProperty('--x', offsetX);
    particle.style.setProperty('--y', offsetY);
    particle.style.left = `${x}px`;
    particle.style.top = `${y}px`;

    document.body.appendChild(particle);

    setTimeout(() => {
      particle.remove();
    }, 3000);
  }
}

// 🌟 Desktop click-and-drag
let isMouseDown = false;

document.body.addEventListener("mousedown", () => {
  isMouseDown = true;
});

document.body.addEventListener("mouseup", () => {
  isMouseDown = false;
});

document.body.addEventListener("mousemove", (e) => {
  if (isMouseDown) {
    burstHearts(e.clientX, e.clientY);
  }
});

// 📱 Mobile touch support
let isTouching = false;

document.body.addEventListener("touchstart", (e) => {
  isTouching = true;
  const touch = e.touches[0];
  burstHearts(touch.clientX, touch.clientY);
});

document.body.addEventListener("touchmove", (e) => {
  if (isTouching) {
    const touch = e.touches[0];
    burstHearts(touch.clientX, touch.clientY);
  }
});

document.body.addEventListener("touchend", () => {
  isTouching = false;
});

// 🌸 Floating background hearts
const bg = document.querySelector('.floating-hearts');
const heartEmojis = ['💗', '💖', '❤️', '💕'];

function createFloatingHeart() {
  const heart = document.createElement("span");
  heart.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
  heart.style.left = Math.random() * 100 + "vw";
  heart.style.fontSize = Math.random() * 20 + 15 + "px";
  heart.style.animationDuration = Math.random() * 10 + 5 + "s";
  bg.appendChild(heart);

  setTimeout(() => heart.remove(), 15000);
}

setInterval(createFloatingHeart, 500);
