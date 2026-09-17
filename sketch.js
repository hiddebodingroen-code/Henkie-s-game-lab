let dokter;

function preload() {
  dokter = loadImage(
    "./dokter.png",
    () => console.log("DOKTER GELADEN!"),
    (fout) => console.error("DOKTER KON NIET LADEN:", fout)
  );
}

function setup() {
  createCanvas(500, 500);
}

function draw() {
  background(220);

  if (dokter) {
    image(dokter, 50, 50, 300, 300);
  }
}
