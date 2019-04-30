// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"
let playerRun1, playerRun2;

function preLoad() {
  playerRun1 = loadImage("assets/player-running-1.png");
  playerRun2 = loadImage("assets/player-running-2.png");
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
    this.x = x;
    this.speed = speed;
    this.move_right = false;
    this.move_left = false;
  }

  move() {
    if (this.move_right) {
      this.x += this.speed;
    }
    if (this.move_left && this.x - this.width/2 >= 0) {
      this.x += -this.speed;
    }
  }

  draw() {
    image(playerRun1, this.x, height * 0.75, this.width, this.width);
  }
}
let player1;
let timer;

function setup() {
  createCanvas(windowWidth, windowHeight);
  player1 = new Player(25, 2);
}

function draw() {
  background(220);
  playerFunctions();
}

function playerFunctions() {
  player1.draw();
  player1.move();
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