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
      if (j === 3 && i === 2) {
        emptyArray[i].push(1);
      }
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
      if (grid[y][x] === 0) {
        fill(255);
      }
      else {
        fill(0);
      }
      rect(x * cellSize, y * cellSize, cellSize, cellSize);
    }
  }
}

function keyPressed() {
  if (key === "d") {
    for (let y = 0; y < gridSize; y++) {
      for (let x = 0; x < gridSize; x++) {
        
      }
    }
  }
}