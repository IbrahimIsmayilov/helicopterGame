// Helicopter Game Start

// Set up canvas and graphics context
let cnv = document.getElementById("myCanvas");
let ctx = cnv.getContext("2d");
cnv.width = 800;
cnv.height = 600;

// Global Variables (once)
let heliImg = document.createElement("img");
heliImg.src = "img/heliBlueTransparent.png";

let explosion = document.createElement("audio");
explosion.src = "sounds/explosion.wav";
let propeller = document.createElement("audio");
propeller.src = "sounds/propeller.wav";

let mouseIsPressed = false;

let bestScore = 0;


// Global Variables (Reset)
let state;
let heli;
let distance;
let walls = [];
reset();

// Draw Function
window.addEventListener("load", draw);

function draw() {
  if (state === "start") {
    drawStart();
  } else if (state === "gameon") {
    distance++;
    runGame();
  } else if (state === "gameover") {
    drawGameOver();
  }

  // Request Animation Frame
  requestAnimationFrame(draw);
}

// EVENT STUFF
cnv.addEventListener("mousedown", mousedownHandler);
cnv.addEventListener("mouseup", mouseupHandler);

function mousedownHandler() {
  mouseIsPressed = true;

  // Play Propeller Sound  
  if (state === "gameon") {
    propeller.currentTime = 0;
    propeller.play();
  }

  // Start game on mousedown
  if (state === "start") {
    state = "gameon";
  }
}

function mouseupHandler() {
  mouseIsPressed = false;
  propeller.pause();
}

