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
      emptyArray[i].push(0);
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

function update() {
  if (updating) {
    let nextTurn = create2DArray(gridSize, gridSize);

    for (let y = 0; y < gridSize; y++) {
      for (let x = 0; x < gridSize; x++) {
        let neighbors = 0;
  
        ///look at the 3x3 grid around the current location
        for(let i = -1; i <= 1; i++) {
          for (let j = -1; j <= 1; j++) {
            if (y+i >= 0 && y+i < gridSize && x+j >= 0 && x+j < gridSize) {
              neighbors += grid[y+i][x+j];
            }
          }
        }
  
        neighbors -= grid[y][x];
  
        //appplying the rules of the game
        if (grid[y][x] === 1) {//alive
          if(neighbors === 2|| neighbors === 3) {
            nextTurn[y][x] = 1;
          }
          else {
            nextTurn[y][x] = 0;
          }
        }
        else {//dead
          if (neighbors === 3) {
            nextTurn[y][x] = 1;
          }
          else {
            nextTurn[y][x] = 0;
          }
        }
      }
    }
  
    grid = nextTurn;
  }
}

function loadingComplete() {
  loop();
}