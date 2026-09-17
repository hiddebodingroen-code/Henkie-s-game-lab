let dokter;

function preload() {
  dokter = loadImage("dokter.png");
}

function setup() {
  createCanvas(500, 500);
}

function draw() {
  background(220);

  image(dokter, 100, 100, 150, 150);
}
