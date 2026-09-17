let dokter;

function preload() {
  dokter = loadImage("dokter.png");
}

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);

  image(dokter, 100, 100, 200, 200);
}
