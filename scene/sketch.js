// Mulifunction Four-Sided Polygon
// Shiloh Berscheid
// 3/8/2019
////DESCRIPTION
// -Full player control with the arrow keys
// -Gravity implementation with a "quick down" mapped to the down key
// -All code works even if you resize your browser. With the exception of ridiculously small browser sizes

///During Mode 1 (the "SPACE" key changes modes)
// -The "w" and "s" keys affect the height of the player
// -The "e" and "d" keys affect the width of the player
// -The "q" and "a" keys affect whether the background is white or black
// -The "r" key changes the player's color each time it is pressed
// -Note that while the background is white the ground will copy the color of the player

///During Mode 2
// -The "w", "s", "e", "d" retain their previous functions
// -The "q" and "a" keys will turn a "Trail Mode" on and off
// -The "r" key will turn on and off a "Rainbow Mode"
// -Note that while the "Trail Mode" is active the ground will copy the color of the player

///Mouse Clicked
// -Clicking the mouse turns on and off "bgMode"
// -I am aware this variable name is odd for a project that only has two modes for the bg, but I will add more in the future
// -"""While "bgMode" is active, pressing the "a" and "q" keys 
//causes the Background to turn on and off a color change effect directly linked to the player's color.
//This effect also changes the color of the ground. This effect has synergy with "Rainbow Mode".

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
  playerBgAndFloorDraw();
  playerWidthAndHeightChange();
  playerHorizontalCollision();
  playerVerticalCollisionsAndGravity();
}

  

function keyPressed() {
  ///All keys are effectively variable switches. Most keys do more once released
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
      //Mode 1 color change
      colorChange = false;
      colorBuffer = true;
    } 
    else {
      //Mode 2 "Rainbow Mode" toggle
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
  ///Changes Mode to either 1 or 2 depending on current mode
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
  ///Activates or deactivates bgMode
  if (bgMode === true) {
    bgMode = false;
  }
  else {
    if (bgMode === false) {
      bgMode = true;
    }
  }
}

function sign(num) { ///Simple Function returning the a -1 if a number is negative or a 1 if a number is positive. Finds the sign
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

function playerBgAndFloorDraw() {
  if (Change === false) { ///Draws background white when "q" pressed
    background(255);
  }

  //Player Trail
  if (trailOff) {
    if (bgMode === false) {
      background(0); ///Draws background black when "a" pressed
      fill(255);
    }
    else {
      background(color2, color, color3); ///bgMode activated with mouse click. Draws bg different color to player color
      fill(color3, color2, color);
    }
  } 
  ///DRAWS GROUND
  rect(0, windowHeight - 50, windowWidth, windowHeight / 10);
  ///DRAWS PLAYER
  if (colorChange && colorBuffer && !Change) { ///Mode 1 "r" key
    colorBuffer = false;
    color = random(255);
    color2 = random(255);
    color3 = random(255);
  }
  if (colorChange && !colorBuffer && Change) { ///Mode 2 "r" key
    color = random(255);
    color2 = random(255);
    color3 = random(255);
  }
  fill(color, color2, color3);
  rect(playerX, playerY, playerWidth, playerHeight);
}

function playerWidthAndHeightChange() {
    ///WIDTH AND HEIGHT CHANGING FOR PLAYER
    //Width increase and decrease
    if (widthIncrease && playerWidth < 250 && playerX + playerWidth <= windowWidth) {
      playerWidth += 1;
    }
    if (widthDecrease && playerWidth > 20) {
      playerWidth += -1;
    }
    //Height increase and decrease
    if (heightIncrease && playerHeight < 250 && playerY >= 0) {
      playerHeight += 1;
    }
    if (heightDecrease && playerHeight > 20) {
      playerHeight += -1;
    }
}

function playerHorizontalCollision() {
    ///HORIZONTAL CALCULATIONS
    if (isMovingRight) {
      horizontalSpeed += horizontalAcceleration;
    }
    if (isMovingLeft) {
      horizontalSpeed += -horizontalAcceleration;
    }
    ///Add slide effect to player when not pressing anything
    if (horizontalSpeed !== 0 && !isMovingRight && !isMovingLeft) {
      horizontalSpeed += horizontalAcceleration * -sign(horizontalSpeed); //Adds acceleration in the opposite direction of player
      if (horizontalSpeed < 0.5 && horizontalSpeed > -0.5) { //Stops player when decently close to zero move speed
        horizontalSpeed = 0;
      }
    }
    ///Prevent player from going above Max horizontal speed
    if (Math.abs(horizontalSpeed) > horizontalSpeedMax) {
      horizontalSpeed = horizontalSpeedMax * sign(horizontalSpeed);
    }
    ///Update player's X position
    playerX += horizontalSpeed;
    //Left side of screen collision
    if (playerX < 0) {
      playerX = 0;
    }
    //Right side of screen collision
    if (playerX + playerWidth > windowWidth) {
      playerX = windowWidth - playerWidth;
    }
    ///END HORIZONTAL CALCULATIONS
}

function playerVerticalCollisionsAndGravity() {
  ///VERTICAL CALCULATIONS
  if (isMovingUp) {
    //No gravity when moving up
    gravity = 0;
    verticalSpeed += -verticalAcceleration;
  }
  else {
    if (quickDown) {
      //Enhanced gravity and drop rate for "quick down"
      gravity = 3;
      verticalSpeedMax = 75;
      horizontalSpeedMax = 1.0;
    } 
    else {
      //Regular gravity and drop rate
      gravity = 0.5;
      verticalSpeedMax = 25;
      horizontalSpeedMax = 6.0;
    }
  }
  ///Update vertical speeed
  verticalSpeed += gravity;
  ///Ground collision for removing speed
  if (playerY + playerHeight >= windowHeight - 50 && verticalSpeed >= 0 || playerY <= 0 && verticalSpeed < 0) {
    verticalSpeed = 0;
  }
  ///Prevent player from going above Max vertical speed
  if (Math.abs(verticalSpeed) > verticalSpeedMax) {
    verticalSpeed = verticalSpeedMax * sign(verticalSpeed);
  }
  ///Update player's Y position
  playerY += verticalSpeed;
  ///Ground collision for updating y position (removes any possibility of player being "slightly" in the ground)
  if (playerY + playerHeight >= windowHeight - 50) {
    playerY = windowHeight - 50 - playerHeight;
  }
  ///Roof collision
  if (playerY <= 0) {
    playerY = 0;
  }
  //END VERTICAL CALCULATIONS
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}