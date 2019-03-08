// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let x, y;
let dx, dy;
let radius;
let patrick;
let rectX, rectY;
let gameStart;
let buttonX, buttonY;
let buttonWidth, buttonHeight;

function preload() {
  patrick = loadImage("patrick.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
  x = windowWidth/2;
  y = windowHeight/2;
  dx = 2.5;
  dy = 2;
  rectX = patrick.width;
  rectY = patrick.height;
  background(0);
  gameStart = false;
  buttonWidth = 400;
  buttonHeight = 200;
  buttonX = windowWidth/2 - buttonWidth / 2;
  buttonY = windowHeight/2;
}

function draw() {
  if (gameStart === false) {
    displayMenu();
  }
  if (gameStart) {
    patrickTime();
  } 
}

function mouseClicked() {
  if (mouseX >= buttonX && mouseX <= buttonX + buttonWidth && mouseY >= buttonY && mouseY <= buttonY + buttonHeight) {
    gameStart = true;
  }
}

function displayMenu() {
  background(0);
  buttonX = windowWidth/2 - buttonWidth / 2;
  buttonY = windowHeight/2;
  if (mouseX >= buttonX && mouseX <= buttonX + buttonWidth && mouseY >= buttonY && mouseY <= buttonY + buttonHeight) {
    fill(255, 255, 0);
  } else {
    fill(255);
  }
  rect(buttonX, buttonY, buttonWidth, buttonHeight);
}

function patrickTime() {
  createCanvas(windowWidth, windowHeight);
  background(0);
  rect(x, y, rectX, rectY);
  image(patrick, x, y, rectX, rectY);
    
  x += dx;
  y += dy;
    
  if (x >= windowWidth - rectX || x <= 0) {
    dx *= -1;
    fill(random(255), random(255), random(255));
  }
  if (y >= windowHeight - rectY || y <= 0) {
    dy *= -1;
    fill(random(255), random(255), random(255));
  }
}