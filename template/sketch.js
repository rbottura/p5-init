const WiW = window.innerWidth, WiH = window.innerHeight;
let formats,
  objFormat,
  cnvW,
  cnvH,
  cnv,
  cam;

const seed = 1,
  cstFPS = 12;

let currentFormatName = "landscape", currentFormat;
let IBMfont, fireGif;

if (P5Capture) {
  P5Capture.setDefaultOptions({
    format: "png",
    framerate: 12,
    quality: 1,
    width: 320,
  });
}

function preload() {
  // loadImage()
  IBMfont = loadFont('./assets/fonts/IBMPlexMono-Regular.ttf');
  fireGif = loadImage('./img/fire.gif');
  formats = loadJSON("./assets/formats.json", (e) => {
    currentFormat = formats[currentFormatName];
    // updateLayersOptions(currentFormatName, currentFormat.index, currentFormat.hasLayers)
    cnvW = currentFormat.width;
    cnvH = currentFormat.height;
  });
}

function setup() {
  cnv = createCanvas(cnvW, cnvH);

  pixelDensity(1);
  imageMode(CENTER);
  angleMode(DEGREES);
  // rectMode(CORNER)

  blendMode(LIGHTEST);
  loadInputs();

  if (cnv.drawingContext.constructor.name === 'WebGL2RenderingContext') {
    cam = createCamera();
    cam.perspective(2.5 * atan(height / 2 / 800));
    initCamSettings = { isOrtho: true };
    setCamera(cam);
  }
}

function draw() {
  clear();
  background(50);

  fill('white');
  noStroke();
  textAlign(CENTER);
  textSize(30);
  if (cnv.drawingContext.constructor.name === 'WebGL2RenderingContext') {
    textFont(IBMfont);
  }
  text('Hello comrads ! 🧙‍♂️', cnvW / 2, cnvH / 2);

  image(fireGif, cnvW / 2, cnvH / 1.5);
}