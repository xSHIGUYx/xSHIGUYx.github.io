// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


let playerX, playerY;
let playerWidth, playerHeight;
let gravity, verticalSpeed;
let verticalAcceleration, verticalSpeedMax;
let horizontalSpeed, horizontalSpeedMax, horizontalAcceleration;

function setup() {
  createCanvas(windowWidth, windowHeight);
  playerX = 150;
  playerY = 0;
  playerWidth = windowWidth / 37.5;
  playerHeight = windowHeight / 10;
  gravity = 0.5;
  verticalSpeed = 0;
  verticalAcceleration = 0.35;
  verticalSpeedMax = 25;
  horizontalSpeed = 0;
  horizontalSpeedMax = 6.0;
  horizontalAcceleration = 0.4;
}

function draw() {
  background(0);
  
  rect(playerX, playerY, playerWidth, playerHeight);
  console.log("HSP: " + horizontalSpeed, "VSP: " + verticalSpeed);
  console.log("GRV: " + gravity, "VSPACC: " + verticalAcceleration);
  
  ///Horizontal Calculations
  if (keyIsPressed && keyCode === RIGHT_ARROW || keyIsPressed && keyCode === LEFT_ARROW) {
    if (keyCode === RIGHT_ARROW) {
      horizontalSpeed += horizontalAcceleration;
    }
    if (keyCode === LEFT_ARROW) {
      horizontalSpeed += -horizontalAcceleration;
    }
  } else {
    if (horizontalSpeed !== 0) {
      horizontalSpeed += horizontalAcceleration * -sign(horizontalSpeed);
    }
    if (horizontalSpeed < 0.5 && horizontalSpeed > -0.5) {
      horizontalSpeed = 0;
    }
  }

  if (Math.abs(horizontalSpeed) > horizontalSpeedMax) {
    horizontalSpeed = horizontalSpeedMax * sign(horizontalSpeed);
  }
  playerX += horizontalSpeed;
  if (playerX <= 0) {
    playerX = 0;
  }
  if (playerX + playerWidth >= windowWidth) {
    playerX = windowWidth - playerWidth;
  }
  ///End Horizontal Calculations

  // Gravity
  if (keyIsPressed && keyCode === UP_ARROW) {
    gravity = 0;
    verticalSpeed += -verticalAcceleration;
  } else {
    gravity = 0.5;
  }
  
  verticalSpeed += gravity;

  if (playerY <= 0) {
    playerY = 0;
  }
  if (playerY + playerHeight >= windowHeight - playerHeight && keyCode !== UP_ARROW) {
    verticalSpeed = 0;
  }
  playerY += verticalSpeed;
  if (Math.abs(verticalSpeed) > verticalSpeedMax) {
    verticalSpeed = verticalSpeedMax * sign(verticalSpeed);
  }
  //End Gravity
}

function keyReleased() {
  if (keyCode !== RIGHT_ARROW || keyCode !== LEFT_ARROW) { //|| keyCode !== UP_ARROW || keyCode !== DOWN_ARROW) {
    keyCode = "";
  }
}

function sign(num) {
  if (num > 0) {
    return 1;
  }
  if (num < 0) {
    return -1;
  } else {
    return 0;
  }
}