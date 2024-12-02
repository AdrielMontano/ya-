// script.js

const cake = document.getElementById('cake');
const confettiCanvas = document.getElementById('confettiCanvas');
const ctx = confettiCanvas.getContext('2d');

// Ajustar tamaño del canvas al tamaño de la ventana
confettiCanvas.width = window.innerWidth;
confettiCanvas.height = window.innerHeight;

let confetti = [];
let colors = ['#FFC700', '#FF5733', '#28B463', '#5DADE2', '#AF7AC5'];

function createConfetti(x, y) {
    for (let i = 0; i < 300; i++) {
        confetti.push({
            x: x + Math.random() * 50 - 25, // Alrededor del pastel
            y: y,
            color: colors[Math.floor(Math.random() * colors.length)],
            size: Math.random() * 10 + 5,
            speedX: Math.random() * 4 - 2,
            speedY: Math.random() * -4 - 2,
            gravity: 0.05
        });
    }
}

function renderConfetti() {
    ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
    confetti.forEach((c, i) => {
        ctx.fillStyle = c.color;
        ctx.beginPath();
        ctx.arc(c.x, c.y, c.size, 0, Math.PI * 2);
        ctx.fill();

        c.x += c.speedX;
        c.y += c.speedY;
        c.speedY += c.gravity; // Gravedad

        if (c.y > confettiCanvas.height) confetti.splice(i, 1); // Eliminar confeti que sale de la pantalla
    });
    requestAnimationFrame(renderConfetti);
}

cake.addEventListener('click', (e) => {
    const rect = cake.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top;
    createConfetti(x, y);
    renderConfetti();
});
