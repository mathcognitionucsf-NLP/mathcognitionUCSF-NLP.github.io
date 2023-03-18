let inputWords;
let particles = [];
let questionColorIndex;
let questionAsked = false;
let feedback = '';

function generateRandomSentences(numSentences, wordList) {
  let sentences = [];
  for (let i = 0; i < numSentences; i++) {
    let sentenceLength = 3;
    let sentence = [];
    for (let j = 0; j < sentenceLength; j++) {
      sentence.push(wordList[Math.floor(random(wordList.length))]);
    }
    sentences.push(sentence.join(' '));
  }
  return sentences.join(' ');
}

function setup() {
  createCanvas(windowWidth/1.01, windowHeight/1.01);
  background(0);
  textSize(64);
  textAlign(CENTER, CENTER);

  let wordList = ['acai', 'tongue', 'rio', 'saopaulo', 'beach', 'sex', 'love', 'pedro', 'stef', 'mouth', 'smell', 'fish', 'beauty'];
  let randomSentences = generateRandomSentences(1, wordList);
  inputWords = randomSentences.split(' ');

  let hueStep = 360 / inputWords.length;
  for (let index = 0; index < inputWords.length; index++) {
    let word = inputWords[index];
    let wordColor = color('hsl(' + (index * hueStep) % 360 + ', 100%, 50%)');

    for (let i = 0; i < word.length; i++) {
      particles.push(new Particle(word[i], wordColor));
    }
  }

  // After 10 seconds, ask the user to guess the word
  setTimeout(() => {
    questionColorIndex = Math.floor(random(inputWords.length));
    let questionColor = color('hsl(' + (questionColorIndex * hueStep) % 360 + ', 100%, 50%)');
    let colorDisplay = document.getElementById("color-display");
    colorDisplay.style.backgroundColor = questionColor.toString("#rrggbb");

    let colorModal = document.getElementById("color-modal");
    colorModal.style.display = "block";

    let submitGuess = document.getElementById("submit-guess");
    submitGuess.addEventListener("click", () => {
      let wordGuess = document.getElementById("word-guess");
      if (wordGuess.value === inputWords[questionColorIndex]) {
        feedback = 'Correct!';
      } else {
        feedback = 'Incorrect!';
      }
      colorModal.style.display = "none";
      questionAsked = true;
    });
  }, 10000);
}

function draw() {
  if (!inputWords) {
    return;
  }

  background(0, 25);

  for (let particle of particles) {
    particle.update();
    particle.display();
  }

  // Display feedback
  if (questionAsked) {
    textSize(32);
    fill(255);
    text(feedback, width / 2, height / 2 - 40);

    // Display the whole sentence with original colors
    textSize(24);
    let sentence = inputWords.join(" ");
    let sentenceWidth = textWidth(sentence);
    let sentencePosX = (width - sentenceWidth) / 2;

    for (let i = 0, wordStart = sentencePosX; i < inputWords.length; i++) {
      let wordColor = color('hsl(' + (i * 360 / inputWords.length) % 360 + ', 100%, 50%)');
      fill(wordColor);
      text(inputWords[i], wordStart, height / 2);
      wordStart += textWidth(inputWords[i] + " ");
    }
  }
}





class Particle {
  constructor(char, wordColor) {
    this.char = char;
    this.wordColor = wordColor;
    this.pos = createVector(random(width), random(height));
    this.vel = createVector(random(-1, 1), random(-1, 1));
    this.acc = createVector();
  }

  update() {
    this.pos.add(this.vel);
    this.vel.add(this.acc);
    this.acc.mult(0);

    let margin = 40;

    if (this.pos.x < margin || this.pos.x > width - margin) {
      this.vel.x *= -1;
    }

    if (this.pos.y < margin || this.pos.y > height - margin) {
      this.vel.y *= -1;
    }
  }

  display() {
    fill(this.wordColor);
    text(this.char, this.pos.x, this.pos.y);
  }
}
