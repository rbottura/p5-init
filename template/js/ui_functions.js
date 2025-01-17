let myControls;
if (P5Capture) {
    P5Capture.setDefaultOptions({
        format: "png",
        framerate: 12,
        quality: 1,
        width: 320,
    });
}

function loadInputs() {
    // Window settings position and draggable
    let settingsWindow = select('#parameters-container');
    let handle = select('.handle');
    handle.draggable(settingsWindow);
    settingsWindow.position(250, WiH * 0.02);

    myControls = new CanvasControls(cnv);
    initSizesBtns();
}

function demoSetup() {

    blendMode(LIGHTEST);
    randomSeed(cstSEED);
    imageMode(CENTER);
    
    if (cnv.drawingContext.constructor.name === 'WebGL2RenderingContext') {
        cam = createCamera();
        cam.perspective(2.5 * atan(height / 2 / 800));
        initCamSettings = { isOrtho: true };
        setCamera(cam);
    }

    loadInputs();
}

function demoDrawing() {
    clear();
    frameRate(cstFPS);
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

function resizeRender(format, name) {

    let w = parseInt(format.width);
    let h = parseInt(format.height);
    cnvW = w;
    cnvH = h;

    let sameFormat = (JSON.stringify(format) === JSON.stringify(currentFormat));

    if (!sameFormat) {
        currentFormat = format;
        currentFormatName = name;
        resizeCanvas(w, h);
        
        resetCamera(cam, initCamSettings);
    }
}

function initSizesBtns() {
    let btns = selectAll('.page-size-btn');
    btns.forEach(btn => {
        btn.elt.addEventListener('click', (e) => {
            if (fullscreen() && e.target.innerHTML !== 'full') {
                toggleFullScreen();
            }
            resizeRender(formats[e.target.innerHTML], e.target.innerHTML);
            if (e.target.innerHTML === "full") {
                toggleFullScreen();
            }
        });
    });
}

function resetCamera(cam, mode) {
    cam = undefined;
    cam = createCamera();

    if (mode === 'toggle') {
        if (initCamSettings.isOrtho) {
            setPerspective(2.5, cam);
        } else {
            setOrtho(cam);
        }
        initCamSettings.isOrtho = !initCamSettings.isOrtho;
    } else {
        initCamSettings.isOrtho ? setOrtho(cam) : setPerspective(2.5, cam);
    }
    setCamera(cam);
}

function setOrtho(cam) {
    cam.ortho(-width / 2, width / 2, -height / 2, height / 2, 0, 8000);
}

function setPerspective(fov, cam) {
    console.log(cam);
    cam.perspective(fov * atan(height / 2 / 800));
}