const WiW = window.innerWidth, WiH = window.innerHeight;
const cnvW = 400, cnvH = 400;

P5Capture.setDefaultOptions({
  format: "png",
  framerate: 12,
  quality: 1,
  width: 320,
});

function preload(){
  // loadImage()
  // loadFont()
  // loadJSON()
}

function setup() {
  createCanvas(cnvW, cnvH);

  pixelDensity(1);
  imageMode(CENTER);
  angleMode(DEGREES);

  // rectMode(CORNER)

  // noLoop()
}

function draw() {
  background(50);

  fill('white');
  noStroke();
  textAlign(CENTER);
  text('Hello comrads ! 🧙‍♂️', cnvW/2, cnvW/2);
}


function generateStarterOverlay(){

}