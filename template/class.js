
class CanvasControls {
    constructor(canvas) {
        this.c = canvas;

        this.sceneRotationSpeed = 1;
        this.prevSceneRotationSpeed = 1;
        this.paramContainer = select('#parameters-container');

        this.btns = selectAll('.player-btn');
        this.gearBtn = this.btns[0];
        this.playBtn = this.btns[1];
        this.scrnBtn = this.btns[2];
        this.saveBtn = this.btns[3];
        this.camBtn = this.btns[4];

        this.gearBtn.mouseClicked(() => this.showParameters(isHidden(this.paramContainer.elt)));
        this.playBtn.mouseClicked(() => this.playPause(isLooping()));
        this.saveBtn.mouseClicked(() => this.saveFrame());
        this.camBtn.mouseClicked(() => this.changeCamera());

        this.titleIndex = undefined;
        this.infosIndex = undefined;
    }
    showParameters(showing) {
        console.log(showing);
        if (showing) {
            // this.paramContainer.show()
            this.paramContainer.elt.style.display = 'flex';
        } else {
            this.paramContainer.hide();
        }
    }
    playPause(play) {
        if (!play) {
            this.playBtn.html('⏸️');
            loop();
        } else {
            this.playBtn.html('▶️'); 
            noLoop();
        }
    }
    saveFrame() {
        saveCanvas(currentFormatName, 'png');
    }
    resetOribitControl() {
        resetMatrix();
    }
    changeCamera(){
        resetCamera(cam, 'toggle');
    }
}
