// Bubble Sort

let theNumbers = [5, 15, 3, 8, 9, 1, 20, 7];

function setup() {
  createCanvas(windowWidth, windowHeight);
  console.log(bubbleSort(theNumbers));
}

function draw() {
  background(220);
}

function bubbleSort(someArray) {
  let swaps = 1;
  while (swaps !== 0) {
    let tempSwap = swaps;
    for (let i = 0; i < someArray.length - 1; i++) {
      if (someArray[i] > someArray[i + 1]) {
        let tempVarStore = someArray[i + 1];
        someArray[i + 1] = someArray[i];
        someArray[i] = tempVarStore;
        swaps += 1;
      }
    }
    if (tempSwap === swaps) {
      swaps = 0;
    }
  }
  return someArray;
}