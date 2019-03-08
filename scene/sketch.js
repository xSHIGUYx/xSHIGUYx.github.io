// Mulifunction Four-Sided Polygon
// Shiloh Berscheid
// 3/8/2019
//
// Description
// 


let playerX, playerY;
let playerWidth, playerHeight;
let gravity, verticalSpeed;
let verticalAcceleration, verticalSpeedMax, quickDown;
let horizontalSpeed, horizontalSpeedMax, horizontalAcceleration;
let isMovingRight, isMovingLeft, isMovingUp;
let widthIncrease, widthDecrease;
let heightIncrease, heightDecrease;
let color, color2, color3, colorChange, colorBuffer;
let trailOff, Change, bgMode;

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
  heightIncrease = false;
  heightDecrease = false;
  quickDown = false;
  color = 255;
  color2 = 255;
  color3 = 255;
  colorChange = false;
  colorBuffer = true;
  trailOff = true;
  Change = false;
  bgMode = false;
}

function draw() {
  if (Change === false) {
    background(255);
  }

  //Trail
  if (trailOff) {
    if (bgMode === false) {
      background(0);
      fill(255);
    }
    else {
      background(color2, color, color3);
      fill(color3, color2, color);
    }
  } 
  ///DRAWS GROUND
  rect(0, windowHeight - 50, windowWidth, windowHeight / 10);
  ///DRAWS PLAYER
  if (colorChange && colorBuffer && !Change) {
    colorBuffer = false;
    color = random(255);
    color2 = random(255);
    color3 = random(255);
  }
  if (colorChange && !colorBuffer && Change) {
    color = random(255);
    color2 = random(255);
    color3 = random(255);
  }
  fill(color, color2, color3);
  rect(playerX, playerY, playerWidth, playerHeight);

  ///WIDTH AND HEIGHT CHANGING FOR PLAYER
  if (widthIncrease && playerWidth < 250 && playerX + playerWidth <= windowWidth) {
    playerWidth += 1;
  }
  if (widthDecrease && playerWidth > 20) {
    playerWidth += -1;
  }
  if (heightIncrease && playerHeight < 250 && playerY >= 0) {
    playerHeight += 1;
  }
  if (heightDecrease && playerHeight > 20) {
    playerHeight += -1;
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
  //Left side of screen collision
  if (playerX < 0) {
    playerX = 0;
  }
  //Right side of screen collision
  if (playerX + playerWidth > windowWidth) {
    playerX = windowWidth - playerWidth;
  }
  ///End Horizontal Calculations

  ///Vertical Calculations
  if (isMovingUp) {
    gravity = 0;
    verticalSpeed += -verticalAcceleration;
  }
  else {
    if (quickDown) {
      gravity = 3;
      verticalSpeedMax = 75;
      horizontalSpeedMax = 1.0;
    } 
    else {
      gravity = 0.5;
      verticalSpeedMax = 25;
      horizontalSpeedMax = 6.0;
    }
  }
  verticalSpeed += gravity;
  if (playerY + playerHeight >= windowHeight - 50 && verticalSpeed >= 0 || playerY <= 0 && verticalSpeed < 0) {
    verticalSpeed = 0;
  }
  if (Math.abs(verticalSpeed) > verticalSpeedMax) {
    verticalSpeed = verticalSpeedMax * sign(verticalSpeed);
  }
  playerY += verticalSpeed;
  ///Ground collision
  if (playerY + playerHeight >= windowHeight - 50) {
    playerY = windowHeight - 50 - playerHeight;
  }
  ///Roof collision
  if (playerY <= 0) {
    playerY = 0;
  }
  //End Vertical Calculations
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
  if (key === "e") { ///Key code for "E"
    widthIncrease = true;
  }
  if (key === "d") { ///Key code for "D"
    widthDecrease = true;
  }
  if (key === "w") { ///Key code for "W"
    heightIncrease = true;
  }
  if (key === "s") { ///Key code for "S"
    heightDecrease = true;
  }
  if (key === "r") { ///Key code for "R"
    colorChange = true;
  }
  if (key === "q") { ///Key code for "Q"
    trailOff = false;
  }
  if (key === "a") { ///Key code for "A"
    trailOff = true;
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
  if (key === "e") { ///Key code for "E"
    widthIncrease = false;
  }
  if (key === "d") { ///Key code for "D"
    widthDecrease = false;
  }
  if (key === "w") { ///Key code for "W"
    heightIncrease = false;
  }
  if (key === "s") { ///Key code for "S"
    heightDecrease = false;
  }
  if (key === "r") { ///Key code for "R"
    if (!Change) {
      colorChange = false;
      colorBuffer = true;
    } 
    else {
      if (colorBuffer) {
        colorBuffer = false;
      } 
      else {
        if (colorBuffer === false) {
          colorBuffer = true;
        }
      }
    }
  }
  if (key === "q") { ///Key code for "Q"
    keyCode = "";
  }
  if (key === "a") { ///Key code for "A"
    keyCode = "";
  }
  if (key === " ") { ///Key code for "SPACE"
    if (Change === true) {
      Change = false;
      colorBuffer = true;
      colorChange = false;
    } 
    else {
      if (Change === false) {
        Change = true;
      }
    }
  }
}

function mouseClicked() {
  if (bgMode === true) {
    bgMode = false;
  }
  else {
    if (bgMode === false) {
      bgMode = true;
    }
  }
}

function sign(num) {
  if (num > 0) {
    return 1;
  }
  if (num < 0) {
    return -1;
  } 
  else {
    return 0;
  }
}