// Walker OOP Demo

class Walker {
  constructor(color) {
    this.x = width/2;
    this.y = height/2;
    this.color = color;
    this.speed = random(2, 8);
  }

  display() {
    fill(this.color);
    stroke(this.color);
    ellipse(this.x, this.y, random([2, 3, 4, 5]), random([2, 3, 4, 5]));
  }

  move() {
    let choice = random(100);
    if (choice < 25) {
      //up
      this.y -= this.speed;
    }
    else if (choice < 50) {
      //down
      this.y += this.speed;
    }
    else if (choice < 75) {
      //left
      this.x -= this.speed;
    }
    else {
      //right
      this.x += this.speed;
    }
  }
}

let andrew;
let kenny;

function setup() {
  createCanvas(windowWidth, windowHeight);
  andrew = new Walker("red");
  kenny = new Walker("blue");
  window.setInterval(colorChange, 500);
}

function draw() {
  //background(220);
  andrew.move();
  andrew.display();
  kenny.move();
  kenny.display();
}

function colorChange() {
  let rando1 = random(["green", "purple", "red", "blue"]);
  let rando2 = random(["yellow", "brown", "indigo", "pink"]);
  andrew.color = rando1;
  kenny.color = rando2;
}