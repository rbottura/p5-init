const cnvW = WiW, cnvH = WiH

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

  pixelDensity(1)
  imageMode(CENTER)
  angleMode(DEGREES)

  // rectMode(CORNER)

  // noLoop()
}

function draw() {
  background(50);

  fill('white')
  noStroke()
  text('Hello comrads ! 🧙‍♂️', cnvW/2, cnvW/2)
}
