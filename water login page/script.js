// ================== WATER RIPPLE BACKGROUND ==================
const canvas = document.getElementById("water");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let ripples = [];

class Ripple {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.radius = 0;
    this.alpha = 1;
  }

  update() {
    this.radius += 2;
    this.alpha -= 0.01;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.strokeStyle = `rgba(0, 229, 255, ${this.alpha})`;
    ctx.lineWidth = 2;
    ctx.stroke();
  }
}

function animate() {
  ctx.fillStyle = "rgba(0, 10, 30, 0.3)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ripples.forEach((r, i) => {
    r.update();
    r.draw();
    if (r.alpha <= 0) ripples.splice(i, 1);
  });

  requestAnimationFrame(animate);
}

canvas.addEventListener("click", (e) => {
  ripples.push(new Ripple(e.clientX, e.clientY));
});

animate();

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

// ================== GLASS BALL EFFECT ON LOGIN FORM ==================
const loginBox = document.getElementById("loginBox");

function applyGlassBallEffect() {
  // Glass bubble look
  loginBox.style.background = "rgba(255, 255, 255, 0.08)";
  loginBox.style.backdropFilter = "blur(25px)";
  loginBox.style.webkitBackdropFilter = "blur(25px)";
  loginBox.style.borderRadius = "50%";
  loginBox.style.padding = "70px 60px";
  loginBox.style.boxShadow = `
    0 0 40px rgba(0, 229, 255, 0.4), 
    inset 0 0 60px rgba(255, 255, 255, 0.1),
    inset -10px -10px 20px rgba(0, 229, 255, 0.2)
  `;
  loginBox.style.border = "2px solid rgba(255, 255, 255, 0.25)";
  loginBox.style.backgroundImage = `
    radial-gradient(circle at 30% 30%, rgba(255,255,255,0.5), rgba(255,255,255,0.05)),
    radial-gradient(circle at 70% 70%, rgba(0,229,255,0.2), transparent)
  `;
  loginBox.style.backgroundBlendMode = "overlay";
  loginBox.style.transition = "all 0.6s ease";

  // Floating animation (breathing)
  let scaleUp = true;
  setInterval(() => {
    loginBox.style.transform = scaleUp
      ? "translate(-50%, -50%) scale(1.05)"
      : "translate(-50%, -50%) scale(1)";
    scaleUp = !scaleUp;
  }, 3000);

  // Wobble on mouse move (feels like floating water)
  document.addEventListener("mousemove", (e) => {
    let x = (e.clientX / window.innerWidth - 0.5) * 20;
    let y = (e.clientY / window.innerHeight - 0.5) * 20;
    loginBox.style.transform = `translate(-50%, -50%) rotateX(${y}deg) rotateY(${x}deg) scale(1.03)`;
    clearTimeout(loginBox.wobbleTimeout);
    loginBox.wobbleTimeout = setTimeout(() => {
      loginBox.style.transform = "translate(-50%, -50%) scale(1)";
    }, 1000);
  });
}

// Apply after load
window.onload = applyGlassBallEffect;
