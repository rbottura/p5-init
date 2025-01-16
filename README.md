# p5-init README

You can download this repo or fork it to add your ideas. Dont hesite to ask for more additions if you think of some, I should find some time to answer in 48h max.

## Usage

use `>p5 init` vscode command hitting `ctrl + shift + P` and select an empty folder to create your p5 basic work folder. Works just as p5.vscode from Sam Lavigne, although it comes with some "addons" explained below.

## Features

### IBM fonts

Schematic :

```plainText
┣ 📂assets
┃ ┣ 📂fonts
┃ ┃ ┣ 📜IBMPlexMono-Bold.ttf
┃ ┃ ┣ 📜IBMPlexMono-BoldItalic.ttf
┃ ┃ ┣ 📜IBMPlexMono-Italic.ttf
┃ ┃ ┣ 📜IBMPlexMono-Medium.ttf
┃ ┃ ┣ 📜IBMPlexMono-Regular.ttf
┃ ┃ ┗ 📜IBMPlexMono-Thin.ttf
┃ ┗ 📜formats.json
┣ 📂libraries
┃ ┣ 📜p5.capture.umd.min.js
┃ ┣ 📜p5.min.js
┃ ┗ 📜p5.sound.min.js
┣ 📜functions.js
┣ 📜index.html
┣ 📜sketch.js
┣ 📜style.css
┗ 📜ui_fonctions.js
```

## Tips and Tricks

If you want to record your sketch as an Animation, I suggest you record it using p5.capture already in the librairies folder. Record as "png sequence" with the PNG format option (default).
Then unzip the folder downloaded folder, you'll have access to your frames with a usefull nomerological naming system.
At the point you have some options to convert a png-sequence into a video format of your choice, but if you goal is to have light mp4, the "movie maker" tool from the processing software is a fine and secure way to do it.
Download processing software [here](https://processing.org/download).
With you even have the option to add audio over it.

For more parameters, such as codecs, bit rates, etc. I go with [Handbrake](https://handbrake.fr/).
