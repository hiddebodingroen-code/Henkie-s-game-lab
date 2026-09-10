let game = "menu";
let score = 0;

const gridSize = 25;

// ========================
// SNAKE
// ========================

let snakeX;
let snakeY;
let snakeDX = gridSize;
let snakeDY = 0;

let foodX;
let foodY;

// ========================
// DODGE
// ========================

let playerX;
let enemyX;
let enemyY = 0;
let enemySpeed = 6;

// ========================
// CATCH
// ========================

let basketX;
let ballX;
let ballY = 0;


// ========================
// SETUP
// ========================

function setup() {
  createCanvas(windowWidth, windowHeight);

  textAlign(CENTER, CENTER);

  snakeX = floor(width / 2 / gridSize) * gridSize;
  snakeY = floor(height / 2 / gridSize) * gridSize;

  makeFood();

  enemyX = random(50, width - 50);
  ballX = random(30, width - 30);
}


// ========================
// DRAW
// ========================

function draw() {
  background(20);

  if (game === "menu") {
    drawMenu();
  }

  if (game === "snake") {
    snakeGame();
  }

  if (game === "dodge") {
    dodgeGame();
  }

  if (game === "catch") {
    catchGame();
  }
}


// ========================
// FULLSCREEN MENU
// ========================

function drawMenu() {
  background(15, 20, 35);

  fill(255);
  textSize(50);
  text("🎮 Welke game wil je?", width / 2, height * 0.18);

  let buttonWidth = min(400, width * 0.7);
  let buttonHeight = 70;

  let x = width / 2 - buttonWidth / 2;

  drawButton(
    x,
    height * 0.35,
    buttonWidth,
    buttonHeight,
    "🐍 SNAKE"
  );

  drawButton(
    x,
    height * 0.50,
    buttonWidth,
    buttonHeight,
    "🚗 DODGE"
  );

  drawButton(
    x,
    height * 0.65,
    buttonWidth,
    buttonHeight,
    "🍎 CATCH"
  );

  fill(150);
  textSize(16);
  text(
    "Kies een game om te beginnen",
    width / 2,
    height * 0.82
  );
}


function drawButton(x, y, w, h, tekst) {

  let hover =
    mouseX > x &&
    mouseX < x + w &&
    mouseY > y &&
    mouseY < y + h;

  if (hover) {
    fill(70, 140, 255);
  } else {
    fill(40, 50, 75);
  }

  noStroke();
  rect(x, y, w, h, 15);

  fill(255);
  textSize(25);
  text(tekst, x + w / 2, y + h / 2);
}


// ========================
// 🐍 SNAKE
// ========================

function snakeGame() {

  background(15, 80, 45);

  // Titel
  fill(255);
  textSize(22);
  text(
    "🐍 Snake   |   Score: " + score,
    width / 2,
    30
  );

  // Besturing
  textSize(14);
  text(
    "WASD / pijltjestoetsen • M = menu",
    width / 2,
    58
  );


  // ETEN
  fill(255, 70, 70);
  ellipse(
    foodX + gridSize / 2,
    foodY + gridSize / 2,
    gridSize * 0.8
  );


  // SNAKE
  fill(70, 255, 120);

  rect(
    snakeX,
    snakeY,
    gridSize,
    gridSize,
    5
  );


  // BEWEGEN
  if (frameCount % 6 === 0) {

    snakeX += snakeDX;
    snakeY += snakeDY;


    // Door de randen heen
    if (snakeX >= width) {
      snakeX = 0;
    }

    if (snakeX < 0) {
      snakeX =
        floor(width / gridSize) *
        gridSize;
    }

    if (snakeY >= height) {
      snakeY = 75;
    }

    if (snakeY < 75) {
      snakeY =
        floor(height / gridSize) *
        gridSize;
    }


    // ETEN GEVONDEN
    if (
      abs(snakeX - foodX) < gridSize &&
      abs(snakeY - foodY) < gridSize
    ) {

      score++;

      makeFood();
    }
  }
}


function makeFood() {

  foodX =
    floor(
      random(0, width / gridSize)
    ) * gridSize;

  foodY =
    floor(
      random(4, height / gridSize)
    ) * gridSize;
}


// ========================
// 🚗 DODGE
// ========================

function dodgeGame() {

  background(35, 35, 80);

  fill(255);
  textSize(22);

  text(
    "🚗 Dodge | Score: " + score,
    width / 2,
    30
  );


  playerX = mouseX;


  // SPELER
  fill(50, 200, 255);

  rect(
    playerX - 30,
    height - 70,
    60,
    30,
    7
  );


  // VIJAND
  fill(255, 70, 70);

  rect(
    enemyX,
    enemyY,
    50,
    50,
    7
  );


  enemyY += enemySpeed;


  // Vijand voorbij
  if (enemyY > height) {

    enemyY = -50;

    enemyX =
      random(0, width - 50);

    score++;

    enemySpeed += 0.3;
  }


  // BOTSING
  if (
    enemyY + 50 > height - 70 &&
    enemyX < playerX + 30 &&
    enemyX + 50 > playerX - 30
  ) {

    score = 0;

    enemySpeed = 6;

    enemyY = -50;
  }


  menuText();
}


// ========================
// 🍎 CATCH
// ========================

function catchGame() {

  background(80, 40, 100);

  fill(255);
  textSize(22);

  text(
    "🍎 Catch | Score: " + score,
    width / 2,
    30
  );


  basketX = mouseX;


  // MANDJE
  fill(255, 200, 50);

  rect(
    basketX - 50,
    height - 60,
    100,
    25,
    7
  );


  // BAL
  fill(100, 255, 120);

  ellipse(
    ballX,
    ballY,
    30
  );


  ballY += 6;


  // GEVANGEN
  if (
    ballY > height - 80 &&
    ballX > basketX - 60 &&
    ballX < basketX + 60
  ) {

    score++;

    resetBall();
  }


  // GEMIST
  if (ballY > height) {

    score = 0;

    resetBall();
  }


  menuText();
}


function resetBall() {

  ballX =
    random(30, width - 30);

  ballY = 50;
}


// ========================
// ⌨️ BESTURING
// ========================

function keyPressed() {

  if (game === "snake") {

    // W / PIJL OMHOOG
    if (
      key === "w" ||
      key === "W" ||
      keyCode === UP_ARROW
    ) {
      snakeDX = 0;
      snakeDY = -gridSize;
    }


    // S / PIJL OMLAAG
    if (
      key === "s" ||
      key === "S" ||
      keyCode === DOWN_ARROW
    ) {
      snakeDX = 0;
      snakeDY = gridSize;
    }


    // A / PIJL LINKS
    if (
      key === "a" ||
      key === "A" ||
      keyCode === LEFT_ARROW
    ) {
      snakeDX = -gridSize;
      snakeDY = 0;
    }


    // D / PIJL RECHTS
    if (
      key === "d" ||
      key === "D" ||
      keyCode === RIGHT_ARROW
    ) {
      snakeDX = gridSize;
      snakeDY = 0;
    }
  }


  // M = MENU
  if (key === "m" || key === "M") {

    game = "menu";

    score = 0;
  }


  // Voorkomt scrollen met pijltjes
  return false;
}


// ========================
// 🖱️ MENU KLIKKEN
// ========================

function mousePressed() {

  if (game !== "menu") {
    return;
  }


  let buttonWidth =
    min(400, width * 0.7);

  let x =
    width / 2 -
    buttonWidth / 2;


  // SNAKE
  if (
    mouseX > x &&
    mouseX < x + buttonWidth &&
    mouseY > height * 0.35 &&
    mouseY < height * 0.35 + 70
  ) {

    resetGame();

    game = "snake";
  }


  // DODGE
  if (
    mouseX > x &&
    mouseX < x + buttonWidth &&
    mouseY > height * 0.50 &&
    mouseY < height * 0.50 + 70
  ) {

    resetGame();

    game = "dodge";
  }


  // CATCH
  if (
    mouseX > x &&
    mouseX < x + buttonWidth &&
    mouseY > height * 0.65 &&
    mouseY < height * 0.65 + 70
  ) {

    resetGame();

    game = "catch";
  }
}


// ========================
// RESET
// ========================

function resetGame() {

  score = 0;

  snakeX =
    floor(width / 2 / gridSize) *
    gridSize;

  snakeY =
    floor(height / 2 / gridSize) *
    gridSize;

  snakeDX = gridSize;
  snakeDY = 0;

  makeFood();


  enemyY = -50;
  enemySpeed = 6;

  enemyX =
    random(50, width - 50);


  resetBall();
}


// ========================
// MENU TEKST
// ========================

function menuText() {

  fill(255);

  textSize(15);

  text(
    "Druk op M om terug te gaan",
    width / 2,
    height - 20
  );
}


// ========================
// SCHERM VERANDERT
// ========================

function windowResized() {

  resizeCanvas(
    windowWidth,
    windowHeight
  );
}
