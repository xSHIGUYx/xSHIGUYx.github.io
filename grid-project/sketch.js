// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let gridSize = 9;
let grid;
let cellSize;
let state;
let walls = [];
let timer;

class Timer {
  constructor(timeToWait) {
    this.timeToWait = timeToWait;
    this.startTime = millis();
    this.endTime = this.startTime + this.timeToWait;
  }

  isDone() {
    return millis() >= this.endTime;
  }
}

class Wall {
  constructor(openWallX, wallY, speed, doesItMove) {
    this.openWallX = openWallX;
    this.wallY = wallY;
    this.speed = speed;
    this.doesItMove = doesItMove;
  }

  move() {
    if (this.doesItMove) {
      for (let i = 0; i < this.speed; i++) {
        grid[this.wallY].shift();
      }
      let counter = 0;
      for (let i = 0; i < grid[this.wallY].length; i++) {
        if (grid[this.wallY][i] !== 2) {
          counter = 1;
        }
      }
      if (counter === 1) {
        for (let i = 0; i < this.speed; i++) {
          grid[this.wallY].push(2);
        }
      }
      else {
        for (let i = 0; i < this.speed; i++) {
          grid[this.wallY].push(0);
        }
      }
    }
  }
}

function setup() {
  if (windowWidth > windowHeight) {
    createCanvas(windowHeight, windowHeight);
  }
  else {
    createCanvas(windowWidth, windowWidth);
  }
  cellSize = width/gridSize;
  let wall1 = new Wall(4, 4, 1, true);
  let wall2 = new Wall(5, 5, 1, true);
  walls.push(wall1);
  walls.push(wall2);
  grid = create2DArray(gridSize, gridSize);
  state = "gamePlay";
  timer = new Timer(500);
}

function draw() {
  if (state === "gamePlay") {
    displayGrid();
    if (timer.isDone()) {
      for (let i = 0; i < walls.length; i++) {
        walls[i].move();
      }
      timer = new Timer(500);
    }
    deathCheck();
  }
  else if (state === "gameOver") {
    background(255);
    textAlign(CENTER);
    textSize(140);
    fill(0);
    text("Game Over!", width/2, height/2);
    textSize(70);
    text("Press 'R' To Restart!", width/2, height/2 + 100);
  }
}

function deathCheck() {
  let counter = 0;
  for (let y = 0; y < gridSize; y++) {
    for (let x = 0; x < gridSize; x++) {
      if (grid[y][x] === 1) {
        counter = 1;
      }
    }
  }
  if (counter === 0) {
    state = "gameOver";
  }
}

function create2DArray(cols, rows) {
  let emptyArray = [];
  for (let i = 0; i < rows; i++) {
    emptyArray.push([]);
    for (let j = 0; j < cols; j++) {
      ///Wall Create
      for (let w = 0; w < walls.length; w++) {
        if (j === walls[w].openWallX && i === walls[w].wallY) {
          emptyArray[i].push(2);
          print(walls[w]);
        }
      }
      ///Player create
      if (j === 4 && i === 2) {
        emptyArray[i].push(1);
      }
      ///Blank Space Create
      else {
        emptyArray[i].push(0);
      }
    }
  }
  return emptyArray;
}

function displayGrid() {
  for (let y = 0; y < gridSize; y++) {
    for (let x = 0; x < gridSize; x++) {
      if (grid[y][x] === 1 || grid[y][x] === 2) {
        if (grid[y][x] === 2) {
          fill(255, 0, 0);
        }
        else {
          fill(0);
        }
      }
      else {
        fill(255);
      }
      rect(x * cellSize, y * cellSize, cellSize, cellSize);
    }
  }
}

function keyPressed() {
  ///Leftwards Movement
  if (key === "a" || key === "A") {
    for (let y = 0; y < gridSize; y++) {
      for (let x = 0; x < gridSize; x++) {
        if (grid[y][x] === 1) {
          if (grid[y][x - 1] === 0) {
            grid[y][x] = 0;
            grid[y][x - 1] = 1;
          }
        }
      }
    }
  }
  ///Rightwards Movement
  if (key === "d" || key === "D") {
    for (let y = 0; y < gridSize; y++) {
      for (let x = 0; x < gridSize; x++) {
        if (grid[y][x] === 1) {
          if (grid[y][x + 1] === 0) {
            grid[y][x] = 0;
            grid[y][x + 1] = 1;
            break;
          }
        }
      }
    }
  }
  ///Upwards Movement
  if (key === "w" || key === "W") {
    for (let y = 0; y < gridSize; y++) {
      for (let x = 0; x < gridSize; x++) {
        if (grid[y][x] === 1) {
          if (grid[y - 1][x] === 0) {
            grid[y][x] = 0;
            grid[y - 1][x] = 1;
          }
        }
      }
    }
  }
  ///Downwards Movement
  if (key === "s" || key === "S") {
    for (let y = 0; y < gridSize; y++) {
      let counter = 0;
      for (let x = 0; x < gridSize; x++) {
        if (grid[y][x] === 1) {
          if (grid[y + 1][x] === 0) {
            grid[y][x] = 0;
            grid[y + 1][x] = 1;
            counter = 1;
          }
        }
      }
      if (counter === 1) {
        break;
      }
    }
  }

  //Restart
  if (key === "r" || key === "R") {
    if (state === "gameOver") {
      grid = create2DArray(gridSize, gridSize);
      state = "gamePlay";
    }
  }
}