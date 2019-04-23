// Grid Based Wall Dodger
// Shiloh Berscheid
// 2019-04-23
///Grid based game where the player is a black square that is tasked with getting to the goal (yellow square).
///Red Squares block your path, and when moving can push you off the screen, resulting in a game over
///Make it through all the levels to win
///Press "R" to restart on death or win

let gridSize = 9;
let grid;
let cellSize;
let state;
let walls;
let timer;
let level;

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

class Wall {
  //Wall class with an inputted "blank spot" on the x axis. Inputted wall "y" position.
  /// A movement speed and whether or not the wall is capable of moving
  constructor(openWallX, wallY, speed, doesItMove) {
    this.openWallX = openWallX;
    this.wallY = wallY;
    this.speed = speed;
    this.doesItMove = doesItMove;
  }

  move() {
    ///Movement simply shifts the front of the array's value off and adds the value to the end
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

function setup() {
  if (windowWidth > windowHeight) {
    createCanvas(windowHeight, windowHeight);
  }
  else {
    createCanvas(windowWidth, windowWidth);
  }
  cellSize = width/gridSize;
  ///Wall and Grid Creation
  createLevelOne();
  textAlign(CENTER);
}

function createLevelOne() {
  /// Level creation effectively consists of wall placement and nothing else
  // Readability of code when it comes to walls is an issue
  // I would have liked to shove each level in a their own JSON files but i couldn't figure out how to work it without errors
  level = 1;
  walls = [];
  let wall = new Wall(gridSize + 1, 3, 2, true);
  walls.push(wall);
  wall = new Wall(gridSize + 1, 4, 1, true);
  walls.push(wall);
  wall = new Wall(2, 5, 1, false);
  walls.push(wall);
  wall = new Wall(2, 6, 1, false);
  walls.push(wall);
  wall = new Wall(gridSize + 1, 7, 1, true);
  walls.push(wall);

  ///Grid Creation
  grid = create2DArray(gridSize, gridSize);
  arrayCorrection();
  state = "gamePlay";
  timer = new Timer(500);
}

function createLevelTwo() {
  level += 1;
  walls = [];
  let wall = new Wall(2, 3, 2, false);
  walls.push(wall);
  wall = new Wall(gridSize + 1, 4, 1, true);
  walls.push(wall);
  wall = new Wall(gridSize + 1, 5, 1, true);
  walls.push(wall);
  wall = new Wall(2, 6, 1, false);
  walls.push(wall);
  wall = new Wall(gridSize + 1, 7, 1, true);
  walls.push(wall);

  ///Grid Creation
  grid = create2DArray(gridSize, gridSize);
  arrayCorrection();
  state = "gamePlay";
  timer = new Timer(500);
}

function createLevelThree() {
  gridSize = 18;
  cellSize = width/gridSize;
  level += 1;
  walls = [];
  let wall = new Wall(gridSize / 2, 2, 1, false);
  walls.push(wall);
  wall = new Wall(gridSize + 1, 3, 1, true);
  walls.push(wall);
  wall = new Wall(gridSize + 1, 4, 1, true);
  walls.push(wall);
  wall = new Wall(gridSize + 1, 5, 1, true);
  walls.push(wall);
  wall = new Wall(2, 6, 1, false);
  walls.push(wall);
  wall = new Wall(gridSize / 2, 7, 2, true);
  walls.push(wall);
  wall = new Wall(gridSize / 2, 8, 2, true);
  walls.push(wall);
  wall = new Wall(gridSize - 5, 10, 2, true);
  walls.push(wall);
  wall = new Wall(gridSize - 8, 12, 1, true);
  walls.push(wall);
  wall = new Wall(gridSize - 8, 13, 1, true);
  walls.push(wall);
  wall = new Wall(gridSize - 10, 14, 1, false);
  walls.push(wall);
  wall = new Wall(gridSize - 7, 15, 3, true);
  walls.push(wall);
  wall = new Wall(gridSize - 7, 16, 3, true);
  walls.push(wall);

  ///Grid Creation
  grid = create2DArray(gridSize, gridSize);
  arrayCorrection();
  state = "gamePlay";
  timer = new Timer(500);
}

function draw() {
  ///Draw loop consists of states
  if (state === "gamePlay") {
    ///Gameplay state
    displayGrid();
    wallMove();
    deathCheck();
    goalCheck();
    arrayCorrection();
    levelDisplay();
  }
  else if (state === "gameOver") {
    ///Game over state
    background(255);
    textSize(140);
    fill(0);
    text("Game Over!", width/2, height/2);
    textSize(70);
    text("Press 'R' To Restart!", width/2, height/2 + 100);
  }
  else if (state === "win") {
    ///Win state
    background(255);
    textSize(140);
    fill(0);
    text("Game Won!", width/2, height/2);
    textSize(70);
    text("Press 'R' To Restart!", width/2, height/2 + 100);
  }
}

function levelDisplay() {
  /// Displays text depending on level
  if (level === 1) {
    textSize(100);
    fill(0);
    text("Level 1", width/2, height/gridSize);
  }
  else if (level === 2) {
    textSize(100);
    fill(0);
    text("Level 2", width/2, height/gridSize);
  }
  else if (level === 3) {
    textSize(100);
    fill(0);
    text("Level 3", width/2, height/gridSize + height/gridSize/2);
  }
}

function wallMove() {
  ///Moves all the walls capable of moving
  if (timer.isDone()) {
    for (let i = 0; i < walls.length; i++) {
      if (walls[i].doesItMove) {
        walls[i].move();
      }
    }
    timer = new Timer(500);
  }
}

function arrayCorrection() {
  /// Makes sure that no arrays are longer than required for the game to work
  for (let y = 0; y < gridSize; y++) {
    if (grid[y].length > gridSize) {
      grid[y].pop();
    }
  }
}

function deathCheck() {
  //Checks for player death by checking to see if the player is currently an active value in the 2 dimensional array
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

function goalCheck() {
  /// Checks to see if the goal still exists, if not then the player has collided with it and the next level begins
  let counter = 0;
  for (let y = 0; y < gridSize; y++) {
    for (let x = 0; x < gridSize; x++) {
      if (grid[y][x] === 3) {
        counter = 1;
      }
    }
  }
  if (counter === 0) {
    if (level === 1) {
      createLevelTwo();
    }
    else if (level === 2) {
      createLevelThree();
    }
    else {
      state = "win"
    }
  }
}

function create2DArray(cols, rows) {
  ///Creates 2d array by shoving arrays in an array (insert Xzibit meme here)
  let emptyArray = [];
  for (let i = 0; i < rows; i++) {
    emptyArray.push([]);
    for (let j = 0; j < cols; j++) {
      ///Wall Create
      //Creates walls by iterating through the "walls" array and changing the values within the grid accordingly
      for (let w = 0; w < walls.length; w++) {
        if (j !== walls[w].openWallX && i === walls[w].wallY) {
          emptyArray[i][j] = 2;
        }
      }
      ///Player create
      ///Shoves player in at x and y (4, 1)
      if (j === 4 && i === 1) {
        emptyArray[i].push(1);
      }
      ///Goal Create
      /// Creates the goal at the bottom of the level
      ///Goal position changes depending on level size
      else if (j === floor(gridSize / 2) && i === gridSize - 1) {
        emptyArray[i].push(3);
      }
      ///Blank Space Create
      ///Adds empty spaces to all remaining areas
      else {
        emptyArray[i].push(0);
      }
    }
  }
  return emptyArray;
}

function displayGrid() {
  ///Displays the grid depending on what values are in what places
  ///Walls are red
  ///Player is black
  ///Empty spaces are white
  ///The goal is yellow
  for (let y = 0; y < gridSize; y++) {
    for (let x = 0; x < gridSize; x++) {
      if (grid[y][x] === 1 || grid[y][x] === 2 || grid[y][x] === 3) {
        if (grid[y][x] === 2) {
          fill(255, 0, 0);
        }
        else if (grid[y][x] === 3) {
          fill(255, 255, 0);
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
          if (grid[y][x - 1] === 0 || grid[y][x - 1] === 3) {
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
          if (grid[y][x + 1] === 0 && grid[y][x] < gridSize || grid[y][x + 1] === 3 && grid[y][x] < gridSize) {
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
          if (grid[y - 1][x] === 0 || grid[y - 1][x] === 3) {
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
          if (grid[y + 1][x] === 0 || grid[y + 1][x] === 3) {
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
    if (state === "win") {
      gridSize = 9;
      cellSize = width/gridSize;
      createLevelOne();
    }
  }
}