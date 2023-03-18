let inputWord;
let particles = [];
let inputElement;

function setup() {
  createCanvas(windowWidth/2.6, windowHeight/1.1);
  background(0);
  textSize(32); // Change this value to make the text larger
  textAlign(CENTER, CENTER);

  inputElement = document.getElementById("input-word");
  inputElement.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      inputWord = inputElement.value;
      inputElement.style.display = "none";

      for (let i = 0; i < inputWord.length; i++) {
        particles.push(new Particle(inputWord[i]));
      }
    }
  });
}

function draw() {
  if (!inputWord) {
    return;
  }

  background(0, 25);

  for (let particle of particles) {
    particle.update();
    particle.display();
  }
}

class Particle {
  constructor(char) {
    this.char = char;
    this.pos = createVector(random(width), random(height));
    this.vel = createVector(random(-1, 1), random(-1, 1));
    this.acc = createVector();
  }

  update() {
    this.pos.add(this.vel);
    this.vel.add(this.acc);
    this.acc.mult(0);

    if (this.pos.x < 0 || this.pos.x > width) {
      this.vel.x *= -1;
    }

    if (this.pos.y < 0 || this.pos.y > height) {
      this.vel.y *= -1;
    }
  }

  display() {
    fill(255);
    text(this.char, this.pos.x, this.pos.y);
  }
}
