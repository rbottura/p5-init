const WiW = window.innerWidth, WiH = window.innerHeight

function asyncLoadImages(idx, path, lgt, arr, id) {
    let pathCopy = path;
    if (idx <= lgt ) {
        loadImage(pathCopy + idx + ").png", (e) => {
            arr.push(e)
            asyncLoadImages(idx + 1, path, lgt, arr)
        })
    } 
}

function easeIn(from, to, speed){
    return from + (to - from) * speed
}