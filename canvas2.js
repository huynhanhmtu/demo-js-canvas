var canvas2 = document.getElementById('canvas2');
var context2 = canvas2.getContext('2d');
var hue = 0; //color

canvas2.style = 'position: absolute; top:0; left:0; background: transparent';

canvas2.width = window.innerWidth;
canvas2.height = window.innerHeight;
window.addEventListener('resize', function () {
  canvas2.width = window.innerWidth;
  canvas2.height = window.innerHeight;
});

// Additional functions
var practicleArray = [];
var mouse = { x: null, y: null };

function Practicle() {
  this.x = mouse.x;
  this.y = mouse.y;
  // this.x = Math.random() * canvas2.width;
  // this.y = Math.random() * canvas2.height;

  this.size = Math.random() * 8 + 5;
  this.speedX = Math.random() * 3 - 1.5;
  this.speedY = Math.random() * 3 - 1.5;
  this.color = 'hsl(' + hue + ', 100%, 50%)';
  this.update = function () {
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.size >= 4) this.size -= 0.1;
  };
  this.draw = function () {
    context2.fillStyle = this.color;
    context2.beginPath();
    context2.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    context2.fill();
  };
};

function handlePractical() {
  for (var i = 0; i < practicleArray.length; i++) {
    practicleArray[i].update();
    practicleArray[i].draw();
    for (var j = i; j < practicleArray.length; j++) {
      var dx = practicleArray[i].x - practicleArray[j].x;
      var dy = practicleArray[i].y - practicleArray[j].y;
      var distance = Math.sqrt(dx * dx + dy * dy);
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
//   for (var i = 0; i < 20; i++) {
//     practicleArray.push(new Practicle());
//   };
// };
// init();

// canvas2.addEventListener('click', function (event) {
//   mouse.x = event.x;
//   mouse.y = event.y;
//   for (var i = 0; i < 5; i++) {
//     practicleArray.push(new Practicle);
//   };
// });

canvas2.addEventListener('mousemove', function (event) {
  mouse.x = event.x;
  mouse.y = event.y;
  for (var i = 0; i < 5; i++) {
    practicleArray.push(new Practicle);
  };
});