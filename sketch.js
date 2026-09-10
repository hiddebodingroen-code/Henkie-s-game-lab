let game = "menu";

// Algemene variabelen
let score = 0;

// Snake
let snakeX = 200;
let snakeY = 200;
let snakeDX = 20;
let snakeDY = 0;
let foodX = 300;
let foodY = 200;

// Dodge
let playerX = 200;
let enemyX = 100;
let enemyY = 0;
let enemySpeed = 5;

// Catch
let basketX = 200;
let ballX = 200;
let ballY = 0;

function setup() {
  createCanvas(500, 400);
  textAlign(CENTER, CENTER);
}

function draw() {
  background(25);

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


// =======================
// MENU
// =======================

function drawMenu() {
  fill(255);
  textSize(32);
  text("Welke game wil je?", width / 2, 60);

  drawButton(100, 130, 300, 60, "🐍 Snake");
  drawButton(100, 210, 300, 60, "🚗 Dodge");
  drawButton(100, 290, 300, 60, "🍎 Catch");
}

function drawButton(x, y, w, h, tekst) {
  if (
    mouseX > x &&
    mouseX < x + w &&
    mouseY > y &&
    mouseY < y + h
  ) {
    fill(80, 150, 255);
  } else {
    fill(50);
  }

  rect(x, y, w, h, 15);

  fill(255);
  textSize(24);
  text(tekst, x + w / 2, y + h / 2);
}


// =======================
// SNAKE
// =======================

function snakeGame() {
  background(30, 100, 50);

  fill(255);
  textSize(18);
  text("Snake | Score: " + score, width / 2, 20);

  // snake
  fill(0, 255, 100);
  rect(snakeX, snakeY, 20, 20);

  // eten
  fill(255, 50, 50);
  ellipse(foodX + 10, foodY + 10, 20);

  if (frameCount % 8 === 0) {
    snakeX += snakeDX;
    snakeY += snakeDY;

    // scherm wrap
    if (snakeX >= width) snakeX = 0;
    if (snakeX < 0) snakeX = width - 20;
    if (snakeY >= height) snakeY = 0;
    if (snakeY < 40) snakeY = height - 20;

    // eten geraakt
    if (dist(snakeX, snakeY, foodX, foodY) < 20) {
      score++;

      foodX = floor(random(0, width / 20)) * 20;
      foodY = floor(random(2, height / 20)) * 20;
    }
  }

  menuTekst();
}


// =======================
// DODGE
// =======================

function dodgeGame() {
  background(40, 40, 80);

  fill(255);
  textSize(18);
  text("Dodge | Score: " + score, width / 2, 20);

  // speler
  playerX = mouseX;

  fill(0, 200, 255);
  rect(playerX - 25, height - 50, 50, 25, 5);

  // vijand
  fill(255, 70, 70);
  rect(enemyX, enemyY, 40, 40);

  enemyY += enemySpeed;

  if (enemyY > height) {
    enemyY = -40;
    enemyX = random(0, width - 40);

    score++;

    enemySpeed += 0.2;
  }

  // botsing
  if (
    enemyY + 40 > height - 50 &&
    enemyX < playerX + 25 &&
    enemyX + 40 > playerX - 25
  ) {
    score = 0;
    enemySpeed = 5;
    enemyY = 0;
  }

  menuTekst();
}


// =======================
// CATCH
// =======================

function catchGame() {
  background(90, 50, 100);

  fill(255);
  textSize(18);
  text("Catch | Score: " + score, width / 2, 20);

  basketX = mouseX;

  // mand
  fill(255, 200, 50);
  rect(basketX - 40, height - 40, 80, 20, 5);

  // vallend balletje
  fill(100, 255, 100);
  ellipse(ballX, ballY, 25);

  ballY += 5;

  // gevangen
  if (
    ballY > height - 60 &&
    ballX > basketX - 50 &&
    ballX < basketX + 50
  ) {
    score++;

    ballX = random(20, width - 20);
    ballY = 40;
  }

  // gemist
  if (ballY > height) {
    score = 0;

    ballX = random(20, width - 20);
    ballY = 40;
  }

  menuTekst();
}


// =======================
// BESTURING
// =======================

function keyPressed() {

  if (game === "snake") {
    if (keyCode === LEFT_ARROW) {
      snakeDX = -20;
      snakeDY = 0;
    }

    if (keyCode === RIGHT_ARROW) {
      snakeDX = 20;
      snakeDY = 0;
    }

    if (keyCode === UP_ARROW) {
      snakeDX = 0;
      snakeDY = -20;
    }

    if (keyCode === DOWN_ARROW) {
      snakeDX = 0;
      snakeDY = 20;
    }
  }

  // M = terug naar menu
  if (key === "m" || key === "M") {
    game = "menu";
    score = 0;
  }
}


// =======================
// MUIS MENU
// =======================

function mousePressed() {
  if (game !== "menu") return;

  // Snake
  if (
    mouseX > 100 &&
    mouseX < 400 &&
    mouseY > 130 &&
    mouseY < 190
  ) {
    resetGame();
    game = "snake";
  }

  // Dodge
  if (
    mouseX > 100 &&
    mouseX < 400 &&
    mouseY > 210 &&
    mouseY < 270
  ) {
    resetGame();
    game = "dodge";
  }

  // Catch
  if (
    mouseX > 100 &&
    mouseX < 400 &&
    mouseY > 290 &&
    mouseY < 350
  ) {
    resetGame();
    game = "catch";
  }
}


// =======================
// EXTRA
// =======================

function menuTekst() {
  fill(255);
  textSize(14);
  text("Druk op M om terug te gaan", width / 2, height - 15);
}

function resetGame() {
  score = 0;

  snakeX = 200;
  snakeY = 200;

  enemyY = 0;
  enemySpeed = 5;

  ballY = 40;
}
