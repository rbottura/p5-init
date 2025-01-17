const WiW = window.innerWidth, WiH = window.innerHeight;
let formats,
    cnvW,
    cnvH,
    cnv,
    cam;

const cstSEED = 1, cstFPS = 12;

let currentFormatName = "landscape", currentFormat;
let IBMfont, fireGif;

function preload() {
  IBMfont = loadFont('./assets/fonts/IBMPlexMono-Regular.ttf');
  fireGif = loadImage('./img/fire.gif');
  formats = loadJSON("./assets/formats.json", (e) => {
    currentFormat = formats[currentFormatName];
    cnvW = currentFormat.width;
    cnvH = currentFormat.height;
  });
}

function setup() {
  cnv = createCanvas(cnvW, cnvH);
  pixelDensity(1);

  // comment or erase line below to start from scratch
  demoSetup();
}

function draw() {

  // comment or erase line below to start from scratch
  demoDrawing();
}