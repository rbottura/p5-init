
function resizeRender(format, name) {

    let w = parseInt(format.width)
    let h = parseInt(format.height)
    cnvW = w
    cnvH = h

    let sameFormat = (JSON.stringify(format) === JSON.stringify(currentFormat))
    // console.log(sameFormat)
    if (!sameFormat) {

        currentFormat = format
        currentFormatName = name
        let renderContainerElt = select('#render-window-wrapper')

        resizeCanvas(w, h)
        changeCamera(cam, initCamSettings)

        renderContainerElt.size(w, h)
    }
    updateLayersOptions(currentFormatName)
}

function generateStarterOverlay(){

}