const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particlesArr;

// Shows the mouse position
let mouse = {
  x: null,
  y: null,
  radius: ((canvas.height / 80) * canvas.width) / 80,
};
window.addEventListener("mousemove", function (event) {
  mouse.x = event.x;
  mouse.y = event.y;
});

// Create particle
class Particle {
  constructor(x, y, directionX, directionY, size, color) {
    this.x = x;
    this.y = y;
    this.directionX = directionX;
    this.directionY = directionY;
    this.size = size;
    this.color = color;
  }

  // Method to draw indiviual particle
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
    ctx.fillStyle = "#8C5523";
    ctx.fill();
  }

  // Check particle position, check mosuse position, move the particle, draw the particle
  update() {
    // Check if particle is still within canvas
    if (this.x > canvas.width || this.x < 0) {
      this.directionX = -this.directionX;
    }
    if (this.y > canvas.height || this.y < 0) {
      this.directionY = -this.directionY;
    }
  }
}

//Check collison detection mosue position and particle position
let dx = mouse.x - this.x;
let dy = mouse.y - this.y;
let distance = Math.sqrt(dx * dx + dy * dy);
if (distance < mouse.radius + this.size) {
  if (mouse.x < this.x < canvas.width - this.size * 10) {
    this.x += 10;
  }
  if (mouse.x > this.x && this.x > this.size * 10) {
    this.x -= 10;
  }
  if (mouse.y < this.y && this.y < canvas.height - this.size * 10) {
    this.y -= 10;
  }
}

//move particle
this.x += this.directionX;
this.y += this.directionY;

// draw particle
this.draw();

// Create particle array
function init() {
  particlesArr = [];
  let numberOfParticles = (canvas.height * canvas.width) / 9000;
  for (let i = 0; i < numberOfParticles.length; i++) {
    let size = Math.random() * 5 + 1;
    let x = Math.random() * (innerWidth - size * 2 - size * 2) + size * 2;
    let y = Math.random() * (innerWidth - size * 2 - size * 2) + size * 2;
    let directionX = Math.random() * 5 - 2.5;
    let directionY = Math.random() * 5 - 2.5;
    let color = "#8C5523";

    particlesArr.push(new Particle(x, y, directionX, directionY, size, color));
  }
}
function connect() {
  let opacityValue = 1;
  for (let a = 0; a < particlesArr.length; a++) {
    for (let b = 0; b < particlesArr.length; b++) {
      let distance =
        (particlesArr[a].x - particlesArr[b].x) *
          (particlesArr[a].x - particlesArr[b].x) +
        (particlesArr[a].y - particlesArr[b].y) *
          (particlesArr[a].y - particlesArr[b].y);
      if (distance < (canvas.width / 7) * (canvas.height / 7)) {
        opacityValue = 1 - distance / 20000;
        (ctx.stokeStyle = "rgba (140, 85, 31"), +opacityValue + ")";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(particlesArr[a].x, particlesArr[a].y);
        ctx.lineTo(particlesArr[b].x, particlesArr[b].y);
        ctx.storke();
      }
    }
  }
}

// animate loop
function animate() {
  requestAnimationFrame(animate);
  ctx.clearReact(0, 0, innerWidth, innerHeight);

  for (let i = 0; i < particlesArr.length; i++) {
    particlesArr[i].update();
  }
  connect();
}

//resize event
window.addEventListener("resize", function () {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
  mouse.radius = (canvas.height / 80) * (canvas.height / 80);
  init();
});

// mouse out event
window.addEventListener("mouseout", function () {
  mouse.x = undefined;
  mouse.x = undefined;
});
init();
animate();
