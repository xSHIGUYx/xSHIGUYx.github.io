///Array of Bouncing Balls Demo

let ballArray = [];
let alpha = 255;

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);

  for (let i = 0; i < ballArray.length; i++) {
    //move ball
    ballArray[i].x += ballArray[i].dx;
    ballArray[i].y += ballArray[i].dy;

    //display ball
    fill(ballArray[i].color);
    noStroke();
    ellipse(ballArray[i].x, ballArray[i].y, ballArray[i].radius*2, ballArray[i].radius*2);
  }
}

function mouseClicked() {
  alpha = 255;
  ballArray = [];
  for (let i = 0; i < 450; i++) {
    let newBall = {
      x: mouseX,
      y: mouseY,
      dx: random(-5, 5),
      dy: random(-5, 5),
      radius: random(10, 10),
      color: color(255, 0, 0, alpha),
    };
    ballArray.push(newBall);
  }
}