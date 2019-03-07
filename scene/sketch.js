// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


let playerX, playerY;
let playerWidth, playerHeight;
let gravity, verticalSpeed;
let verticalAcceleration, verticalSpeedMax, quickDown;
let horizontalSpeed, horizontalSpeedMax, horizontalAcceleration;
let isMovingRight, isMovingLeft, isMovingUp;
let widthIncrease, widthDecrease;

function setup() {
  createCanvas(windowWidth, windowHeight);
  playerX = windowWidth / 2;
  playerY = 0;
  playerWidth = 35;
  playerHeight = 50;
  gravity = 0.5;
  verticalSpeed = 0;
  verticalAcceleration = 0.35;
  verticalSpeedMax = 25;
  horizontalSpeed = 0;
  horizontalSpeedMax = 6.0;
  horizontalAcceleration = 0.4;
  isMovingLeft = false;
  isMovingRight = false;
  isMovingUp = false;
  widthIncrease = false;
  widthDecrease = false;
  quickDown = false;
}

function draw() {
  createCanvas(windowWidth, windowHeight);
  background(0);
  
  rect(playerX, playerY, playerWidth, playerHeight);
  console.log(playerY);

  if (widthIncrease && playerWidth < 250 && playerX + playerWidth <= windowWidth) {
    playerWidth += 1;
  }
  if (widthDecrease && playerWidth > 20) {
    playerWidth += -1;
  }
  
  ///Horizontal Calculations
  if (isMovingRight) {
    horizontalSpeed += horizontalAcceleration;
  }
  if (isMovingLeft) {
    horizontalSpeed += -horizontalAcceleration;
  }
  if (horizontalSpeed !== 0 && !isMovingRight && !isMovingLeft) {
    horizontalSpeed += horizontalAcceleration * -sign(horizontalSpeed);
    if (horizontalSpeed < 0.5 && horizontalSpeed > -0.5) {
      horizontalSpeed = 0;
    }
  }

  if (Math.abs(horizontalSpeed) > horizontalSpeedMax) {
    horizontalSpeed = horizontalSpeedMax * sign(horizontalSpeed);
  }
  playerX += horizontalSpeed;
  if (playerX <= 0) {
    horizontalSpeed = 0;
    isMovingLeft = false;
  }
  if (playerX + playerWidth >= windowWidth) {
    horizontalSpeed = 0;
    isMovingRight = false;
  }
  ///End Horizontal Calculations

  // Gravity
  if (playerY < 0) {
    playerY = 0;
  }

  if (isMovingUp) {
    gravity = 0;
    verticalSpeed += -verticalAcceleration;
  } else {
    if (quickDown) {
      gravity = 0.9;
      verticalSpeedMax = 75;
      horizontalSpeedMax = 1.0;
      if (sign(verticalSpeed) === -1) {
        verticalSpeed *= -1;
      }
    } else {
      gravity = 0.5;
      verticalSpeedMax = 25;
      horizontalSpeedMax = 6.0;
    }
  }
  
  verticalSpeed += gravity;

  if (playerY + playerHeight >= windowHeight - playerHeight && verticalSpeed >= 0 || playerY <= 0 && verticalSpeed < 0) {
    verticalSpeed = 0;
  }
  playerY += verticalSpeed;
  if (Math.abs(verticalSpeed) > verticalSpeedMax) {
    verticalSpeed = verticalSpeedMax * sign(verticalSpeed);
  }
  //End Gravity
}

function keyPressed() {
  if (keyCode === RIGHT_ARROW) {
    isMovingRight = true;
  }
  if (keyCode === LEFT_ARROW) {
    isMovingLeft = true;
  }
  if (keyCode === UP_ARROW) {
    isMovingUp = true;
  }
  if (keyCode === DOWN_ARROW) {
    quickDown = true;
  }
  if (keyCode === 119 || keyCode === 87) {
    widthIncrease = true;
  }
  if (keyCode === 101 || keyCode === 69) {
    widthDecrease = true;
  }
}

function keyReleased() {
  if (keyCode === RIGHT_ARROW) {
    isMovingRight = false;
  }
  if (keyCode === LEFT_ARROW) {
    isMovingLeft = false;
  }
  if (keyCode === UP_ARROW) {
    isMovingUp = false;
  }
  if (keyCode === DOWN_ARROW) {
    quickDown = false;
  }
  if (keyCode === 119 || keyCode === 87) {
    widthIncrease = false;
  }
  if (keyCode === 101 || keyCode === 69) {
    widthDecrease = false;
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