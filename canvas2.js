const canvas2 = document.getElementById('canvas2');
const context2 = canvas2.getContext('2d');
let hue = 0; //color

canvas2.style = 'position: absolute; top:0; left:0; background: transparent';

canvas2.width = window.innerWidth;
canvas2.height = window.innerHeight;
window.addEventListener('resize', function () {
  canvas2.width = window.innerWidth;
  canvas2.height = window.innerHeight;
});

// Additional functions
let practicleArray = [];
const mouse = { x: null, y: null };

// ES6
class Practicle {
  constructor() {
    this.x = mouse.x;
    this.y = mouse.y;
    // this.x = Math.random() * canvas2.width;
    // this.y = Math.random() * canvas2.height;

    this.size = Math.random() * 8 + 5;
    this.speedX = Math.random() * 3 - 1.5;
    this.speedY = Math.random() * 3 - 1.5;
    this.color = 'hsl(' + hue + ', 100%, 50%)';
  };
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.size >= 4) this.size -= 0.1;
  };
  draw() {
    context2.fillStyle = this.color;
    context2.beginPath();
    context2.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    context2.fill();
  };
};

function handlePractical() {
  for (let i = 0; i < practicleArray.length; i++) {
    practicleArray[i].update();
    practicleArray[i].draw();
    for (let j = i; j < practicleArray.length; j++) {
      const dx = practicleArray[i].x - practicleArray[j].x;
      const dy = practicleArray[i].y - practicleArray[j].y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      if (distance < 50) {
        context2.strokeStyle = practicleArray[i].color;
        context2.lineWidth = 0.2;
        context2.beginPath();
        context2.moveTo(practicleArray[i].x, practicleArray[i].y);
        context2.lineTo(practicleArray[j].x, practicleArray[j].y);
        context2.stroke();
        context2.closePath();
      }
    }
    if (practicleArray[i].size <= 4) {
      practicleArray.splice(i, 1);
      i--; //can't be used
    };
  };
};

function animate() {
  context2.clearRect(0, 0, canvas2.width, canvas2.height);
  handlePractical();
  requestAnimationFrame(animate);
  hue += 5;
};
animate();

// function init() {
//   for (let i = 0; i < 20; i++) {
//     practicleArray.push(new Practicle());
//   };
// };
// init();

canvas2.addEventListener('click', function (event) {
  mouse.x = event.x;
  mouse.y = event.y;
  for (let i = 0; i < 5; i++) {
    practicleArray.push(new Practicle);
  };
});

// canvas2.addEventListener('mousemove', function (event) {
//   mouse.x = event.x;
//   mouse.y = event.y;
//   for (let i = 0; i < 1; i++) {
//     practicleArray.push(new Practicle);
//   };
// });