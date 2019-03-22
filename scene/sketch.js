// Mulifunction Four-Sided Polygon
// Shiloh Berscheid
// 3/8/2019
////DESCRIPTION
// -Full player control with the arrow keys
// -Gravity implementation with a "quick down" mapped to the down key
// -All code works even if you resize your browser. With the exception of ridiculously small browser sizes

let player;
let obstacleArray = [];

class Obstacle {
  constructor() {
    this.width = random(50, 200);
    this.height = random(50, 200);
    this.x = windowWidth - this.width;
    this.y = windowHeight - this.height - 50;
  }
  showObstacle() {
    rect(this.x, this.y, this.width, this.height);
  }
  move() {
    this.x -= 1;
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  player = {
    x: windowWidth / 2,
    y: 0,
    width: 20,
    height: 20,
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
    widthOrHeightMax: 250,
    widthOrHeightMin: 20,
    leftBlocked: false,
    rightBlocked: false,
    upBlocked: false,
    downBlocked: false,
    leftCurrentlyBlocked: false,
    downCurrentlyBlocked: false,
  };

  window.setInterval(randomColorChoose, 500);
  // window.setInterval(createObstacle, 2500);
  createObstacle();
}

function draw() {
  playerBgAndFloorDraw();
  obstacleDraw();
  //playerWidthAndHeightChange();
  widthHeightIncreaseDecrease();
  playerHorizontalCollision();
  playerVerticalCollisionsAndGravity();
}

function createObstacle() {
  obstacleArray.push(new Obstacle());
}

function widthHeightIncreaseDecrease() {
  if (player.width === player.widthOrHeightMin) {
    player.widthDecrease = false;
    player.widthIncrease = true;
  }
  if (player.width === player.widthOrHeightMax) {
    player.widthDecrease = true;
    player.widthIncrease = false;
  }
  if (player.height === player.widthOrHeightMin) {
    player.heightDecrease = false;
    player.heightIncrease = true;
  }
  if (player.height === player.widthOrHeightMax) {
    player.heightDecrease = true;
    player.heightIncrease = false;
  }
}

function randomColorChoose() {
  player.color = random(255);
  player.color2 = random(255);
  player.color3 = random(255);
}

function keyPressed() {
  ///All keys are effectively variable switches.
  if (keyCode === RIGHT_ARROW && !player.rightBlocked) {
    player.isMovingRight = true;
  }
  if (keyCode === LEFT_ARROW && !player.leftBlocked) {
    player.isMovingLeft = true;
  }
  if (keyCode === UP_ARROW && !player.upBlocked) {
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

function sign(num) { ///Simple Function returning a -1 if the input is negative or a 1 if the input is positive. Finds the sign
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
  background(player.color2, player.color3, player.color);

  ///DRAWS GROUND
  fill(player.color3, player.color2, player.color);
  rect(0, windowHeight - 50, windowWidth, windowHeight / 10);
  ///DRAWS PLAYER
  fill(player.color, player.color2, player.color3);
  rect(player.x, player.y, player.width, player.height);
}

function playerWidthAndHeightChange() {
  ///WIDTH AND HEIGHT CHANGING FOR PLAYER
  //Width increase and decrease
  if (player.widthIncrease && player.width < player.widthOrHeightMax && player.x + player.width <= windowWidth) {
    player.width += 1;
  }
  if (player.widthDecrease && player.width > player.widthOrHeightMin) {
    player.width += -1;
  }
  //Height increase and decrease
  if (player.heightIncrease && player.height < player.widthOrHeightMax && player.y >= 0) {
    player.height += 1;
  }
  if (player.heightDecrease && player.height > player.widthOrHeightMin) {
    player.height += -1;
  }
}

function playerHorizontalCollision() {
  ///HORIZONTAL CALCULATIONS
  //Left side of screen collision
  if (player.x <= 0) {
    player.leftBlocked = true;
  }
  else {
    if (player.leftCurrentlyBlocked === false) {
      player.leftBlocked = false;
    }
  }
  //Right side of screen collision
  if (player.x + player.width >= windowWidth) {
    player.rightBlocked = true;
  }
  else {
    player.rightBlocked = false;
  }
  if (player.isMovingRight && !player.rightBlocked) {
    player.horizontalSpeed += player.horizontalAcceleration;
  }
  if (player.isMovingLeft && !player.leftBlocked) {
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
  player.horizontalSpeed = constrain(player.horizontalSpeed, -player.horizontalSpeedMax, player.horizontalSpeedMax);
  if (player.rightBlocked) {
    player.horizontalSpeed = constrain(player.horizontalSpeed, -player.horizontalSpeedMax, 0);
  }
  if (player.leftBlocked) {
    player.horizontalSpeed = constrain(player.horizontalSpeed, 0, player.horizontalSpeedMax);
  }
  ///Update player's X position
  player.x += player.horizontalSpeed;
  player.x = constrain(player.x, 0, width);
  ///END HORIZONTAL CALCULATIONS
}

function playerVerticalCollisionsAndGravity() {
///VERTICAL CALCULATIONS
///Ground collision for updating y position (removes any possibility of player being "slightly" in the ground)
  if (player.y + player.height >= windowHeight - 50) {
    player.downBlocked = true;
  }
  else {
    if (player.downCurrentlyBlocked === false) {
      player.downBlocked = false;
    }
  }
  ///Roof collision
  if (player.y <= 0) {
    player.upBlocked = true;
  }
  else {
    player.upBlocked = false;
  }
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
  ///Prevent player from going above Max vertical speed
  player.verticalSpeed = constrain(player.verticalSpeed, -player.verticalSpeedMax, player.verticalSpeedMax);
  if (player.downBlocked) {
    player.verticalSpeed = constrain(player.verticalSpeed, -player.verticalSpeedMax, 0);
  }
  if (player.upBlocked) {
    player.verticalSpeed = constrain(player.verticalSpeed, 0, player.verticalSpeedMax);
  }
  ///Update player's Y position
  player.y += player.verticalSpeed;
  player.y = constrain(player.y, 0, height - 50 - player.height);
  //END VERTICAL CALCULATIONS
}

function obstacleDraw() {
  for (let i = 0; i < obstacleArray.length; i++) {
    obstacleArray[i].move();
    if (obstacleArray[i].x + obstacleArray[i].width >= 0) {
      obstacleArray[i].showObstacle();
    }
    player.leftCurrentlyBlocked = false;
    if (player.x <= obstacleArray[i].x + obstacleArray[i].width 
      && player.y + player.height <= obstacleArray[i].y + obstacleArray[i].height
      && player.y >= obstacleArray[i].y
      && !player.downCurrentlyBlocked) {
      player.leftBlocked = true;
      player.leftCurrentlyBlocked = true;
      player.x = constrain(player.x, obstacleArray[i].x + obstacleArray[i].width, width);
    }
    player.downCurrentlyBlocked = false;
    if (player.x + player.width >= obstacleArray[i].x 
      && player.x <= obstacleArray[i].x + obstacleArray[i].width
      && player.y + player.height >= obstacleArray[i].y
      && !player.leftCurrentlyBlocked) {
      player.downBlocked = true;
      player.downCurrentlyBlocked = true;
      player.y = constrain(player.y, obstacleArray[i].y - player.height, 0);
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}