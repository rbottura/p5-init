const WiW = window.innerWidth, WiH = window.innerHeight;
let formats,
  objFormat,
  cnvW,
  cnvH,
  cnv,
  seed = 1,
  cstFPS = 12;
  
let currentFormatName = "poster", currentFormat;
let IBMfont;

if (P5Capture){
  P5Capture.setDefaultOptions({
    format: "png",
    framerate: 12,
    quality: 1,
    width: 320,
  });
}

function preload(){
  // loadImage()
  IBM = loadFont('./assets/fonts/IBMPlexMono-Regular.ttf');

  formats = loadJSON("./assets/formats.json", (e) => {
    currentFormat = formats[currentFormatName];
    // updateLayersOptions(currentFormatName, currentFormat.index, currentFormat.hasLayers)
    cnvW = currentFormat.width;
    cnvH = currentFormat.height;
  });
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