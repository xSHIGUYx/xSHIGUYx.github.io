// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let time;
let rectWidth;
let myRectangle;
let numberOfRects;
let rects = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  time = 0;
  numberOfRects = width;
  rectWidth = width / numberOfRects;
  generateInitialTerrain();
}

function draw() {
  background(220);

  fill(0);
  for (let i = 0; i < numberOfRects; i++) {
    rect(rects[i].x, rects[i].y, rects[i].width, rects[i].height);
  }
}

function generateInitialTerrain() {
  for(let i = 0; i < numberOfRects; i++) {
    let rectHeight = noise(time) * height;
    let myRectangle = {
      height: rectHeight,
      width: rectWidth,
      x: i * rectWidth,
      y: height - rectHeight,
    };
    rects.push(myRectangle);

    ///move along perlin noise x-axis
    time += 0.01;
  }
}