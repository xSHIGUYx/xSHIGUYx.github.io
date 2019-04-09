// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let gridSize = 8;
let grid;
let cellSize;
let updating = false;
let updateSpeed = 150;

function setup() {
  if (windowWidth > windowHeight) {
    createCanvas(windowHeight, windowHeight);
  }
  else {
    createCanvas(windowWidth, windowWidth);
  }
  cellSize = width/gridSize;
  grid = create2DArray(gridSize, gridSize);
}

function draw() {
  background(255);
  displayGrid();
}

function create2DArray(cols, rows) {
  let emptyArray = [];
  for (let i = 0; i < rows; i++) {
    emptyArray.push([]);
    for (let j = 0; j < cols; j++) {
      ///Player create
      if (j === 3 && i === 2) {
        emptyArray[i].push(1);
      }
      ///Wall create
      if (j !== 3 && i === 4) {
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
      if (grid[y][x] === 0 || grid[y][x] === 2) {
        if (grid[y][x] === 2) {
          fill(255, 0, 0);
        }
        else {
          fill(255);
        }
      }
      else {
        fill(0);
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
}