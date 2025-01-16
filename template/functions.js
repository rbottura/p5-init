function asyncLoadImages(idx, path, lgt, arr, id) {
    let pathCopy = path;
    if (idx <= lgt ) {
        loadImage(pathCopy + idx + ").png", (e) => {
            arr.push(e);
            asyncLoadImages(idx + 1, path, lgt, arr);
        });
    } 
}

function easeIn(from, to, speed){
    return from + (to - from) * speed;
}

function isHidden(el) {
    var style = window.getComputedStyle(el);
    return (style.display === 'none');
}

function toZero(x) {
    return Math.abs(x) < 1 ? 0 : 1;
}

function toggleFullScreen() {
    let fs = fullscreen();
    fullscreen(!fs);
}

function getArrayOfRandomUniqueInt(n, min, max) {
    let arr = [];

    while (arr.length !== n) {
        let randomNumber = int(random(min, max));
        if (!arr.includes(randomNumber)) {
            arr.push(randomNumber);
        }
    }
    return sort(arr);
}

const fileTypes = [
    'image/apng',
    'image/bmp',
    'image/gif',
    'image/jpeg',
    'image/pjpeg',
    'image/png',
    'image/svg+xml',
    'image/tiff',
    'image/webp',
    `image/x-icon`
];

function validFileType(file) {
    return fileTypes.includes(file.type);
}

function isValidUrl(input) {
    // Regex to check for a relative or absolute file path
    const urlPattern = /^(\/|\.\/|\.\.\/|https?:\/\/|ftp:\/\/|file:\/\/)[^#]+$/;
    return urlPattern.test(input) && input !== "#";
}

function handleImageFile(files) {
    for (const file of files) {
        if (validFileType(file)) {
            const newUrl = URL.createObjectURL(file);
            // let myNewP5Iamge = loadImage(newUrl);
            
            const image = document.createElement('img');
            image.src = newUrl;
        }
    }
}

