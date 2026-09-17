let dokter;

function preload() {
  dokter = loadImage("dokter.png");
}

function draw() {
  background(220);

  image(dokter, 100, 100, 150, 150);
}
