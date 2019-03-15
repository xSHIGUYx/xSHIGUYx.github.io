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
let player;

function setup() {
  createCanvas(windowWidth, windowHeight);
  player = {
    x: windowWidth / 2,
    y: 0,
    width: 35,
    height: 50,
    gravity: 0.5,
    verticalSpeed: 0,
    verticalAcceleration: 0.35,
    verticalSpeedMax: 25,
    horizontalSpeed: 0,
    horizontalSpeedMax: 6.0,
    horizontalAcceleration: 0.4,
    isMovingLeft: false,
    isMovingRight: false,
    isMovingUp: false,
    widthIncrease: false,
    widthDecrease: false,
    heightIncrease: false,
    heightDecrease: false,
    quickDown: false,
    color: 255,
    color2: 255,
    color3: 255,
    colorChange: false,
    colorBuffer: true,
    trailOff: true,
    change: false,
    bgMode: false,
  };
  window.setInterval(widthHeightIncrease, 200);
  window.setInterval(widthHeightDecrease, 1000);
  window.setInterval(randomColorChoose, 1000);
}

function draw() {
  playerBgAndFloorDraw();
  playerWidthAndHeightChange();
  playerHorizontalCollision();
  playerVerticalCollisionsAndGravity();
}

function widthHeightIncrease() {
  if (player.widthIncrease === true && player.heightIncrease === true) {
    player.widthIncrease = false;
    player.heightIncrease = false;
  }
  else {
    player.widthIncrease = true;
    player.heightIncrease = true;
  }
}

function widthHeightDecrease() {
  if (player.widthDecrease === true && player.heightDecrease === true) {
    player.widthDecrease = false;
    player.heightDecrease = false;
  }
  else {
    player.widthDecrease = true;
    player.heightDecrease = true;
  }
}

function randomColorChoose() {
  player.colorChange = random([true, false]);
  player.trailOff = random([true, false]);
  player.Change = random([true, false]);
  player.bgMode = random([true, false]);
}

function keyPressed() {
  ///All keys are effectively variable switches.
  if (keyCode === RIGHT_ARROW) {
    player.isMovingRight = true;
  }
  if (keyCode === LEFT_ARROW) {
    player.isMovingLeft = true;
  }
  if (keyCode === UP_ARROW) {
    player.isMovingUp = true;
  }
  if (keyCode === DOWN_ARROW) { 
    player.quickDown = true;
  }
}

function keyReleased() {
  if (keyCode === RIGHT_ARROW) {
    player.isMovingRight = false;
  }
  if (keyCode === LEFT_ARROW) {
    player.isMovingLeft = false;
  }
  if (keyCode === UP_ARROW) {
    player.isMovingUp = false;
  }
  if (keyCode === DOWN_ARROW) {
    player.quickDown = false;
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
  if (player.change === false) { ///Draws background white when "q" pressed
    background(255);
  }

  //Player Trail
  if (player.trailOff) {
    if (player.bgMode === false) {
      background(0); ///Draws background black
      fill(255);
    }
    else {
      background(player.color2, player.color, player.color3); //Draws bg different color to player color
      fill(player.color3, player.color2, player.color);
    }
  } 
  ///DRAWS GROUND
  rect(0, windowHeight - 50, windowWidth, windowHeight / 10);
  ///DRAWS PLAYER
  if (player.colorChange && player.colorChange && !player.change) { ///Mode 1
    player.colorChange = false;
    player.color = random(255);
    player.color2 = random(255);
    player.color3 = random(255);
  }
  if (player.colorChange && !player.colorBuffer && player.change) { ///Mode 2
    player.color = random(255);
    player.color2 = random(255);
    player.color3 = random(255);
  }
  fill(player.color, player.color2, player.color3);
  rect(player.x, player.y, player.width, player.height);
}

function playerWidthAndHeightChange() {
  ///WIDTH AND HEIGHT CHANGING FOR PLAYER
  //Width increase and decrease
  if (player.widthIncrease && player.playerWidth < 250 && player.x + player.width <= windowWidth) {
    player.width += 1;
  }
  if (player.widthDecrease && player.width > 20) {
    player.width += -1;
  }
  //Height increase and decrease
  if (player.heightIncrease && player.height < 250 && player.y >= 0) {
    player.height += 1;
  }
  if (player.heightDecrease && player.height > 20) {
    player.height += -1;
  }
}

function playerHorizontalCollision() {
  ///HORIZONTAL CALCULATIONS
  if (player.isMovingRight) {
    player.horizontalSpeed += player.horizontalAcceleration;
  }
  if (player.isMovingLeft) {
    player.horizontalSpeed += -player.horizontalAcceleration;
  }
  ///Add slide effect to player when not pressing anything
  if (player.horizontalSpeed !== 0 && !player.isMovingRight && !player.isMovingLeft) {
    player.horizontalSpeed += player.horizontalAcceleration * -sign(player.horizontalSpeed) * 0.5; //Adds acceleration in the opposite direction of player
    if (player.horizontalSpeed < 0.25 && player.horizontalSpeed > -0.25) { //Stops player when decently close to zero move speed
      player.horizontalSpeed = 0;
    }
  }
  ///Prevent player from going above Max horizontal speed
  if (Math.abs(player.horizontalSpeed) > player.horizontalSpeedMax) {
    player.horizontalSpeed = player.horizontalSpeedMax * sign(player.horizontalSpeed);
  }
  ///Update player's X position
  player.x += player.horizontalSpeed;
  //Left side of screen collision
  if (player.x < 0) {
    player.x = 0;
  }
  //Right side of screen collision
  if (player.x + player.width > windowWidth) {
    player.x = windowWidth - player.width;
  }
  ///END HORIZONTAL CALCULATIONS
}

function playerVerticalCollisionsAndGravity() {
  ///VERTICAL CALCULATIONS
  if (player.isMovingUp) {
    //No gravity when moving up
    player.gravity = 0;
    player.verticalSpeed += -player.verticalAcceleration;
  }
  else {
    if (player.quickDown) {
      //Enhanced gravity and drop rate for "quick down"
      player.gravity = 3;
      player.verticalSpeedMax = 75;
      player.horizontalSpeedMax = 1.0;
    } 
    else {
      //Regular gravity and drop rate
      player.gravity = 0.5;
      player.verticalSpeedMax = 25;
      player.horizontalSpeedMax = 6.0;
    }
  }
  ///Update vertical speeed
  player.verticalSpeed += player.gravity;
  ///Ground collision for removing speed
  if (player.y + player.height >= windowHeight - 50 && player.verticalSpeed >= 0 || player.y <= 0 && player.verticalSpeed < 0) {
    player.verticalSpeed = 0;
  }
  ///Prevent player from going above Max vertical speed
  if (Math.abs(player.verticalSpeed) > player.verticalSpeedMax) {
    player.verticalSpeed = player.verticalSpeedMax * sign(player.verticalSpeed);
  }
  ///Update player's Y position
  player.y += player.verticalSpeed;
  ///Ground collision for updating y position (removes any possibility of player being "slightly" in the ground)
  if (player.y + player.height >= windowHeight - 50) {
    player.y = windowHeight - 50 - player.height;
  }
  ///Roof collision
  if (player.y <= 0) {
    player.y = 0;
  }
  //END VERTICAL CALCULATIONS
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}