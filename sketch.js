let cookie = 0
let oma = 0
let timer = 0
let klik = 1

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
    
    textSize(30);
    fill(255);
    text(oma, 400, 300);

    textSize(30);
    fill(255);
    text(klik, 400, 500);
    
    fill(255);
    square(400, 300, 100);

    fill(255);
    square(400, 500, 100);
}

function mousePressed() {
    if (dist(mouseX, mouseY, 200, 200) < 50) {
        cookie = cookie + klik;
    }

    if (mouseX >= 400 && mouseX <= 500 && mouseY >= 500 && mouseY <= 600) {
        if (cookie >= (500 * (1.15 ** klik))) {
            cookie = cookie - (500 * (1.15 ** klik));
            klik = klik + 1;
        }
    }

    if (mouseX >= 400 && mouseX <= 500 && mouseY >= 300 && mouseY <= 400) {
        if (cookie >= (100 * (1.15 ** oma))) {
            cookie = cookie - (100 * (1.15 ** oma));
            oma = oma + 1;
        }
    }
}
