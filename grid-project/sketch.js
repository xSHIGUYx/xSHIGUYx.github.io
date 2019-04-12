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

class Wall {
  constructor(speed, openWallX, wallY) {
    this.speed = speed;
    this.openWallX = openWallX;
    this.wallY = wallY;
  }

  move() {
    grid[this.wallY].shift();
    let counter = 0;
    for (let i = 0; i < grid[this.wallY].length; i++) {
      if (grid[this.wallY][i] !== 2) {
        counter = 1;
      }
    }
    if (counter === 1) {
      grid[this.wallY].push(2);
    }
    else {
      grid[this.wallY].push(0);
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
  grid = create2DArray(gridSize, gridSize);
  state = "gamePlay";
  window.setInterval(moveWall, 400);
  window.setInterval(moveWall2, 200);
}

function draw() {
  if (state === "gamePlay") {
    displayGrid();
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

function moveWall() {
  grid[4].shift();
  let counter = 0;
  for (let i = 0; i < grid[4].length; i++) {
    if (grid[4][i] !== 2) {
      counter = 1;
    }
  }
  if (counter === 1) {
    grid[4].push(2);
  }
  else {
    grid[4].push(0);
  }
}

function moveWall2() {
  grid[6].shift();
  let counter = 0;
  for (let i = 0; i < grid[6].length; i++) {
    if (grid[6][i] !== 2) {
      counter = 1;
    }
  }
  if (counter === 1) {
    grid[6].push(2);
  }
  else {
    grid[6].push(0);
  }
}

function create2DArray(cols, rows) {
  let emptyArray = [];
  for (let i = 0; i < rows; i++) {
    emptyArray.push([]);
    for (let j = 0; j < cols; j++) {
      ///Player create
      if (j === 4 && i === 2) {
        emptyArray[i].push(1);
      }
      ///Wall create
      if (j !== 2 && i === 4) {
        emptyArray[i].push(2);
      }
      else if (j !== 3 && i === 6) {
        emptyArray[i].push(2);
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