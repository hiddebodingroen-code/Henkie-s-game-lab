let cookie = 0
let oma = 0
let timer = 0

function setup() {
    createCanvas(windowWidth, windowHeight);
}

function draw() {
    if (millis() - timer >= 1000) {
        timer = millis();
        if (oma >= 0) {
            cookie = cookie + oma;
        }
    }

    background(128);
    fill('brown');
    circle(200, 200, 100);

    textSize(50);
    fill(255);
    text(cookie, 200, 300);

    square(400, 200, 100);
}

function mousePressed() {
    if (dist(mouseX, mouseY, 200, 200) < 50) {
        cookie = cookie + 1;
    }

    if (mouseX >= 400 && mouseX <= 500 && mouseY >= 200 && mouseY <= 300) {
        if (cookie >= 100) {
            oma = oma + 1;
            cookie = cookie - 100;
        }
    }
}
