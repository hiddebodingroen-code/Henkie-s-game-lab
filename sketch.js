let cookie = 0

function setup() {
    createCanvas(windowWidth, windowHeight);
}

function draw() {
background(255, 0, 0);
     fill('brown'); 
    circle(200, 200, 100);
    fill(255);
    text(cookie, 300, 200);
}
function mousePressed() {
    if (dist(mouseX, mouseY, 200, 200) < 50) {cookie = cookie+1}
        }
