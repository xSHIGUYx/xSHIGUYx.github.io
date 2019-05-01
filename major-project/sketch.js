// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"
let playerRun1, playerRun2;
let runCycle = [];

function preload() {
  playerRun1 = loadImage("assets/player-running-1.png");
  playerRun2 = loadImage("assets/player-running-2.png");
  runCycle = {currentImage: [playerRun1, playerRun2], imageNumber: 0};
}

class Timer {
  ///Simple timer class with a millisecond time input
  ///Returns true when inputted time has elapsed
  constructor(timeToWait) {
    this.timeToWait = timeToWait;
    this.startTime = millis();
    this.endTime = this.startTime + this.timeToWait;
  }

  isDone() {
    return millis() >= this.endTime;
  }
}

class Player {
  constructor(x, speed) {
    this.width = 50;
    this.y = height * 0.75;
    this.x = x;
    this.speed = speed;
    this.move_right = false;
    this.move_left = false;
  }

  move() {
    if (this.move_right && this.x + this.width/2 <= width) {
      this.x += this.speed;
    }
    if (this.move_left && this.x - this.width/2 >= 0) {
      this.x += -this.speed;
    }
  }

  draw() {
    if (this.move_right || this.move_left) {
      image(runSprite, this.x, this.y, this.width, this.width);
    }
    else {
      image(playerRun1, this.x, this.y, this.width, this.width);
    }
  }
}
let player1;
let runSprite;
let runCycleTimer;

function setup() {
  createCanvas(windowWidth, windowHeight);
  player1 = new Player(25, 2);
  runSprite = runCycle.currentImage[0];
  runCycleTimer = new Timer(250);
}

function draw() {
  background(220);
  playerFunctions();
}

function playerFunctions() {
  player1.draw();
  player1.move();
  if (runCycleTimer.isDone()) {
    if (runCycle.imageNumber <= runCycle.currentImage.length) {
      runSprite = runCycle.currentImage[runCycle.imageNumber];
      runCycle.imageNumber++;
    }
    // else {
    //   runCycle.imageNumber = 0;
    // }
    runCycleTimer = new Timer(250);
  }
}

function keyPressed() {
  if (keyCode === RIGHT_ARROW) {
    player1.move_right = true;
  }
  if (keyCode === LEFT_ARROW) {
    player1.move_left = true;
  }
}

function keyReleased() {
  if (keyCode === RIGHT_ARROW) {
    player1.move_right = false;
  }
  if (keyCode === LEFT_ARROW) {
    player1.move_left = false;
  }
}