// FUNCTIONS

// Draw Start Screen
function drawStart() {
  // Background
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, cnv.width, cnv.height);

  // Green Bars
  ctx.fillStyle = "green";
  ctx.fillRect(0, 0, cnv.width, 50);
  ctx.fillRect(0, cnv.height - 50, cnv.width, 50);

  // Green Bar Text
  ctx.font = "30px Consolas";
  ctx.fillStyle = "black";
  ctx.fillText("HELICOPTER GAME", 25, 35);
  ctx.fillText(`DISTANCE: ${distance}`, 25, cnv.height - 15);
  ctx.fillText(`BEST: ${bestScore}`, cnv.width - 250, cnv.height - 15);

  // Helicopter
  ctx.drawImage(heliImg, heli.x, heli.y);

  // Start Text
  ctx.font = "40px Consolas";
  ctx.fillStyle = "lightblue";
  ctx.fillText("CLICK TO START", 350, 285)

  ctx.font = "25px Consolas";
  ctx.fillText("CLICK AND HOLD LEFT MOUSE BUTTON TO GO UP", 100, 450);
  ctx.fillText("RELEASE TO GO DOWN", 415, 480);
}

// Run The Game
function runGame() {
  // LOGIC
  // Move The Helicopter Vertically 
  moveHeli();
  // Move the Walls Closer To The Helicopter
  moveWalls();
  // Check if the helicopter collided with any of the walls
  checkCollisions();

  // DRAW
  drawGame();
}

function moveHeli() {
  // Accelerate upward if mouse is pressed
  if (mouseIsPressed) {
    heli.speed += -1;
  }

  // Apply Gravity (Accel)
  heli.speed += heli.accel;

  // Constrain Speed (max/min)
  if (heli.speed > 5) {
    heli.speed = 5;
  } else if (heli.speed < -5) {
    heli.speed = -5;
  }

  // Move Helicopter by Its Speed
  heli.y += heli.speed;
}

function moveWalls() {
  // Make the walls speed up / the game more difficult
  wallSpeed += wallAccel;

  // Constrain Speed (max/min)
  if (wallSpeed < -7) {
    wallSpeed = -7;
  }

  // Make the walls move
  for (let i = 0; i < walls.length; i++) {
    walls[i].x += wallSpeed;
    if (walls[i].x + walls[i].w < 0) {
      walls[i].x = walls[i].x + walls[i].w + 500 * (i + 1);
      walls[i].y = Math.random() * 300 + 100;
    }
  }
}

function checkCollisions() {
  // Collision with Top and Bottom Green Bars
  checkTopBottomCollisions();

  // Collision with the Walls
  checkWallCollisions();
}

function gameOver() {
  explosion.play();
  state = "gameover";
  updateScore();

  setTimeout(reset, 2000)
}

// Draw Game Elements
function drawGame() {
  drawMainComponents();
  drawWalls();
}

// Draw Game Over Screen
function drawGameOver() {
  drawMainComponents();
  drawWalls();

  // Circle around Helicopter
  ctx.strokeStyle = "red";
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.arc(heli.x + heli.w / 2, heli.y + heli.h / 2, 60, 0, 2 * Math.PI);
  ctx.stroke();

  // Game Over Text
  ctx.font = "40px Consolas";
  ctx.fillStyle = "lightblue";
  ctx.fillText("GAME OVER", 350, 285);
}

// Helper Functions
function updateScore() {
  if (distance > bestScore) {
    bestScore = distance;
  }
}

function reset() {
  state = "start";
  distance = 0;
  heli = {
    x: 200,
    y: 250,
    w: 80,
    h: 40,
    speed: 0,
    accel: 0.7
  };
  createWalls();
  wallSpeed = -3;
  wallAccel = -0.01;
}

function createWalls() {
  walls = [];
  for (let i = 0; i < 3; i++) {
    wall = {
      x: cnv.width + x * 500,
      y: Math.random() * 300 + 100,
      w: 50,
      h: 100
    }
    walls.push(wall);
  }
  return walls;
}

function drawWalls() {
  ctx.fillStyle = "green";
  for (let i = 0; i < walls.length; i++) {
    ctx.fillRect(walls[i].x, walls[i].y, walls[i].w, walls[i].h);
  }
}


function drawMainComponents() {
  // Background
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, cnv.width, cnv.height);

  // Green Bars
  ctx.fillStyle = "green";
  ctx.fillRect(0, 0, cnv.width, 50);
  ctx.fillRect(0, cnv.height - 50, cnv.width, 50);

  // Green Bar Text
  ctx.font = "30px Consolas";
  ctx.fillStyle = "black";
  ctx.fillText("HELICOPTER GAME", 25, 35);
  ctx.fillText(`DISTANCE: ${distance}`, 25, cnv.height - 15);
  ctx.fillText(`BEST: ${bestScore}`, cnv.width - 250, cnv.height - 15);

  // Helicopter
  ctx.drawImage(heliImg, heli.x, heli.y);
}

function checkWallCollisions() {
  for (let i = 0; i < walls.length; i++) {
    if (heli.x + heli.w > walls[i].x && heli.x < walls[i].x + walls[i].w && heli.y + heli.h > walls[i].y && heli.y < walls[i].y + walls[i].h) {
      gameOver();
    }
  }
}

function checkTopBottomCollisions() {
  if (heli.y < 50) {
    gameOver();
  } else if (heli.y + heli.h > cnv.height - 50) {
    gameOver();
  }
}



